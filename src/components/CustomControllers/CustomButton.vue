<script setup lang="ts">
import { QBtn, QIcon, type QBtnProps } from 'quasar'
import { computed } from 'vue'
import { DEFALUT_COLORS, BRIGHT_COLORS } from '@/constants/colors'

const props = defineProps<QBtnProps>()
const bgColor = computed(() => {
  if (props.color && (props.color.startsWith('var(') || DEFALUT_COLORS.includes(props.color))) {
    return props.color
  }
  return props.color ? `var(${props.color})` : 'var(--color-lavender-accent)'
})
const textColor = computed(() => {
  if (props.color && BRIGHT_COLORS.includes(props.color)) {
    return 'var(--color-lavender-accent)'
  }
  return 'var(--color-text-tertiary)'
})
const iconWrapperColor = computed(() => {
  if (props.color && BRIGHT_COLORS.includes(props.color)) {
    return 'var(--color-lavender-accent)'
  }
  return 'var(--color-lavender-shallow)'
})
const iconColor = computed(() => {
  if (props.color && BRIGHT_COLORS.includes(props.color)) {
    return 'var(--color-lavender-shallow)'
  }
  return 'var(--color-lavender-accent)'
})
</script>

<template>
  <q-btn v-bind="{ ...props, icon: undefined }" flat :ripple="false">
    <template #default>
      <div v-if="props.icon" :class="$style['icon-wrapper']">
        <q-icon :name="props.icon" />
      </div>
      <slot />
    </template>
  </q-btn>
</template>

<style module>
.icon-wrapper {
  border-radius: 100%;
  background-color: v-bind(iconWrapperColor);
}

.icon-wrapper * {
  color: v-bind(iconColor);
}
</style>

<style scoped>
.q-btn {
  border-radius: 16px;
  background-color: v-bind(bgColor);
  padding: 8px 12px;
}
.q-btn * {
  margin: 0;
  text-transform: none;
}

:deep(.q-btn__content) {
  display: flex;
  gap: 12px;
  color: v-bind(textColor);
}
</style>
