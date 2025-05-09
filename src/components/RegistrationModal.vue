<script setup lang="ts">
import { reactive, defineEmits } from 'vue'
import { QForm } from 'quasar'
import CustomInput from '@/components/CustomControllers/CustomInput.vue'
import CustomButton from '@/components/CustomControllers/CustomButton.vue'

const form = reactive({
  username: '',
  email: '',
  password: '',
})

const emit = defineEmits(['close'])

const submitForm = () => {
  console.log('Form submitted:', form)
}
</script>

<template>
  <div :class="$style.overlay" @click.self="emit('close')">
    <div :class="$style['registration-modal']">
      <div :class="$style['modal-header']">
        <h3 class="h3-wide">Регистрация</h3>
        <custom-button
          :class="$style['close-button']"
          icon="close"
          @click="emit('close')"
          size="sm"
        />
      </div>
      <q-form @submit.prevent="submitForm">
        <custom-input
          v-model="form.username"
          label="Имя пользователя"
          placeholder="Введите имя пользователя"
          required
        />
        <custom-input
          v-model="form.email"
          label="Почта"
          type="email"
          placeholder="Введите вашу почту"
          required
        />
        <custom-input
          v-model="form.password"
          label="Пароль"
          type="password"
          placeholder="Введите ваш пароль"
          required
        />
        <custom-button :class="$style['registration-button']" type="submit">
          Зарегистрироваться
        </custom-button>
      </q-form>
    </div>
  </div>
</template>

<style scoped>
:deep(.q-form) {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

<style module>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
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

.registration-button {
  margin-top: 16px;
  width: 100%;
}
</style>
