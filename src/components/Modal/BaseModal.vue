<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import CustomButton from '@/components/CustomControllers/CustomButton.vue'

const emit = defineEmits(['close'])
const props = defineProps<{ title: string }>()
</script>

<template>
  <div :class="$style.overlay" @click.stop.self="emit('close')">
    <div :class="$style['registration-modal']">
      <div :class="$style['modal-header']">
        <h3 class="h3-wide">{{ props.title }}</h3>
        <custom-button
          :class="$style['close-button']"
          icon="close"
          @click.stop="emit('close')"
          size="sm"
        />
      </div>
      <slot name="content" />
    </div>
  </div>
</template>

<style module>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.registration-modal {
  background-color: var(--color-lavender-shallow);
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  border-radius: 16px;
  box-shadow: var(--shadow-medium);
  width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
