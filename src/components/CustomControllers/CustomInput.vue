<script setup lang="ts">
import { computed, defineEmits, defineProps, useAttrs } from 'vue'
import { QInput } from 'quasar'

type InputProps = {
  modelValue: string
  customLabel?: string
  onWhiteBackground?: boolean
}

const props = defineProps<InputProps>()
const $attrs = useAttrs()

const emit = defineEmits({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  'update:modelValue': (value: string) => true,
})

const value = computed({
  get() {
    return props.modelValue
  },

  set(val: string) {
    emit('update:modelValue', val)
  },
})

const bgColor = computed(() => {
  if (props.onWhiteBackground) {
    return 'var(--color-lavender-shallow)'
  }
  return '#fff'
})
</script>

<template>
  <div :class="$style['input-wrapper']">
    <p v-if="props.customLabel" class="p3-regular" style="color: var(--color-text-primary)">
      {{ props.customLabel }}
    </p>
    <q-input
      v-bind="$attrs"
      v-model="value"
      dense
      outlined
      clear-icon="mdi-close"
      input-class="p3-regular"
    >
      <template v-for="(s, slot) of $slots" :key="slot" #[slot]="scope">
        <slot v-if="!!s" :name="slot" v-bind="scope" />
      </template>
    </q-input>
  </div>
</template>

<style module>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>

<style scoped>
:deep(.q-field--outlined .q-field__control) {
  border-radius: 12px;
}

:deep(.q-field--outlined .q-field__control:before) {
  background-color: v-bind(bgColor);
  border: 1px solid var(--color-lavender);
}

:deep(.q-field--outlined .q-field__control:hover:before) {
  background-color: v-bind(bgColor);
  border: 1px solid var(--color-lavender-accent);
}

:deep(.q-field--focused .q-field__control::after) {
  border: 1px solid var(--color-lavender-accent);
}

:deep(.q-field__control-container textarea) {
  resize: none;
}
</style>
