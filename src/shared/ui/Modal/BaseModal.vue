<script setup lang="ts">
import CustomButton from '@/shared/ui/CustomControllers/CustomButton.vue'

const emit = defineEmits(['close'])
defineProps<{ title: string }>()
</script>

<template>
  <div class="overlay" @click.stop.self="emit('close')">
    <div class="registration-modal">
      <div class="registration-modal__header">
        <h3 class="h3-wide">{{ title }}</h3>
        <CustomButton
          icon="close"
          @click.stop="emit('close')"
          size="sm"
        />
      </div>
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped lang="scss">
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

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
