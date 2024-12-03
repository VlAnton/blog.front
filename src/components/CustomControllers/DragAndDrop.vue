<script setup lang="ts">
import { ref } from 'vue'
import { QIcon } from 'quasar'

const file = ref<File | null>(null)
const fileInput = ref(null)
const isDragging = ref(false)

const handleDragOver = (e) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = true
}

const handleDragLeave = (e) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = false
}

const handleDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = false

  const newFile = e.dataTransfer.files[0]
  handleFile(newFile)
}

const handleFileSelect = (e) => {
  handleFile(e.target.files[0])
}

const handleFile = (newFile: File) => {
  file.value = newFile.type.startsWith('image/') ? newFile : file.value
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
    <div v-if="!file" :class="$style['drop-zone-message']" @click="$refs.fileInput.click()">
      <q-icon name="mdi-download-circle" size="32px" style="color: #9264ff" />
      <p class="p3-regular" :class="$style['drop-zone-message-text']">
        Перетащите файл или нажмите на поле, чтобы загрузить
      </p>
    </div>

    <div v-else :class="$style['drop-zone-file']" @click="$refs.fileInput.click()">
      {{ (file as any).name }} ({{ (file as any).size }} bytes)
    </div>
  </div>
</template>

<style module>
.drop-zone-wrapper {
  padding: 10px 16px;
  border-radius: 12px;
  height: 100px;
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
