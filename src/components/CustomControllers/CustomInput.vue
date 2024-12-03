<script setup lang="ts">
import { computed, defineEmits, defineProps, useAttrs } from 'vue'
import { QInput } from 'quasar'

type InputProps = {
  modelValue: string
  customLabel?: string
}

const props = defineProps<InputProps>()
const $attrs = useAttrs()

const emit = defineEmits({
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
</script>

<template>
  <div :class="$style['input-wrapper']">
    <p class="p3-regular">{{ props.customLabel }}</p>
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
<style scoped></style>
