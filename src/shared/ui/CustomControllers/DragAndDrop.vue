<script setup lang="ts">
import { QIcon } from 'quasar'
import { computed, defineEmits, defineProps, ref } from 'vue'

type DragAndDropProps = {
  modelValue: File | null
}

const props = defineProps<DragAndDropProps>()
const emit = defineEmits({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  'update:modelValue': (value: string) => true,
})
const file = computed({
  get() {
    return props.modelValue
  },
  set(newVal: File | null) {
    emit('update:modelValue', newVal as unknown as string)
  },
})

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

const handleClick = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = true
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = false
  if (e.dataTransfer) {
    const newFile = e.dataTransfer.files[0]
    compressAndSetFile(newFile, 0.5)
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    compressAndSetFile(files[0], 0.5)
  }
}

const compressAndSetFile = async (newFile: File, quality = 1) => {
  if (!newFile.type.startsWith('image/')) {
    return
  }
  const imageBitmap = await createImageBitmap(newFile)
  // Draw to canvas
  const canvas = document.createElement('canvas')
  canvas.width = imageBitmap.width
  canvas.height = imageBitmap.height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }
  ctx!.drawImage(imageBitmap, 0, 0)

  // Turn into Blob
  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, newFile.type, quality),
  )

  // Turn Blob into File
  if (!blob) {
    return
  }
  file.value = new File([blob], newFile.name, {
    type: blob.type,
  })
}
</script>

<template>
  <div
    :class="$style['drop-zone-wrapper']"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @dragleave="handleDragLeave"
  >
    <input ref="fileInput" type="file" style="display: none" @change="handleFileSelect" />
    <div v-if="!file" :class="$style['drop-zone-message']" @click="handleClick">
      <q-icon name="mdi-download-circle" size="32px" style="color: #9264ff" />
      <p class="p3-regular" :class="$style['drop-zone-message-text']">
        Перетащите файл или нажмите на поле, чтобы загрузить
      </p>
    </div>

    <div v-else :class="$style['drop-zone-file']" @click="handleClick">
      {{ (file as any).name }} ({{ (file as any).size }} bytes)
    </div>
  </div>
</template>

<style module>
.drop-zone-wrapper {
  padding: 10px 16px;
  border-radius: 12px;
  height: 83px;
  border: 1px solid var(--color-lavender);
  background-color: var(--color-lavender-shallow);
  transition: border-color ease-out 0.2s;
}

.drop-zone-wrapper:hover {
  border: 1px solid var(--color-lavender-accent);
  transition: border-color ease-in 0.2s;
}

.drop-zone-message {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.drop-zone-message-text {
  color: var(--color-text-primary);
  text-align: center;
}

.drop-zone-file {
  height: 100%;
}
</style>
