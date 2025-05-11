<script setup lang="ts">
import { reactive, defineEmits, ref } from 'vue'
import { QForm } from 'quasar'
import CustomInput from '@/components/CustomControllers/CustomInput.vue'
import CustomButton from '@/components/CustomControllers/CustomButton.vue'

const refistrationForm = reactive({
  username: '',
  email: '',
  password: '',
})
const loginForm = reactive({
  email: '',
  password: '',
})
const isLoginForm = ref(true)

const emit = defineEmits(['close', 'submit-registration', 'submit-login'])

const submitRegistrationForm = () => {
  emit(
    'submit-registration',
    refistrationForm.email,
    refistrationForm.password,
    refistrationForm.username,
  )
  refistrationForm.username = ''
  refistrationForm.email = ''
  refistrationForm.password = ''
  emit('close')
}
const submitLoginForm = () => {
  emit('submit-login', loginForm.email, loginForm.password)
  refistrationForm.username = ''
  refistrationForm.email = ''
  refistrationForm.password = ''
  emit('close')
}
</script>

<template>
  <div :class="$style.overlay" @click.self="emit('close')">
    <div v-if="!isLoginForm" :class="$style['registration-modal']">
      <div :class="$style['modal-header']">
        <h3 class="h3-wide">Регистрация</h3>
        <custom-button
          :class="$style['close-button']"
          icon="close"
          @click="emit('close')"
          size="sm"
        />
      </div>
      <q-form @submit.prevent="submitRegistrationForm">
        <custom-input
          v-model="refistrationForm.username"
          label="Имя пользователя"
          placeholder="Введите имя пользователя"
          required
        />
        <custom-input
          v-model="refistrationForm.email"
          label="Почта"
          type="email"
          placeholder="Введите вашу почту"
          required
        />
        <custom-input
          v-model="refistrationForm.password"
          label="Пароль"
          type="password"
          placeholder="Введите ваш пароль"
          required
        />
        <custom-button :class="$style['registration-button']" type="submit">
          Зарегистрироваться
        </custom-button>
        <p class="p3-regular" style="text-align: center">
          У вас уже есть аккаунт?
          <span
            class="p3-regular"
            style="color: var(--color-lavender-accent); cursor: pointer"
            @click="isLoginForm = true"
          >
            Войти
          </span>
        </p></q-form
      >
    </div>
    <div v-else :class="$style['registration-modal']">
      <div :class="$style['modal-header']">
        <h3 class="h3-wide">Вход</h3>
        <custom-button
          :class="$style['close-button']"
          icon="close"
          @click="emit('close')"
          size="sm"
        />
      </div>
      <q-form @submit.prevent="submitLoginForm">
        <custom-input
          v-model="loginForm.email"
          label="Почта"
          type="email"
          placeholder="Введите вашу почту"
          required
        />
        <custom-input
          v-model="loginForm.password"
          label="Пароль"
          type="password"
          placeholder="Введите ваш пароль"
          required
        />
        <custom-button :class="$style['registration-button']" type="submit"> Войти </custom-button>
        <p class="p3-regular" style="text-align: center">
          У меня нет аккаунта
          <span
            class="p3-regular"
            style="color: var(--color-lavender-accent); cursor: pointer"
            @click="isLoginForm = false"
          >
            Зарегистрироваться
          </span>
        </p>
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
