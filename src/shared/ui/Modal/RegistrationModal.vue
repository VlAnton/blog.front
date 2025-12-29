<script setup lang="ts">
import { reactive, ref } from 'vue'
import { QForm } from 'quasar'
import BaseModal from '@/shared/ui/Modal/BaseModal.vue'
import CustomInput from '@/shared/ui/CustomControllers/CustomInput.vue'
import CustomButton from '@/shared/ui/CustomControllers/CustomButton.vue'

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
    refistrationForm.username,
    refistrationForm.password,
  )
  refistrationForm.email = ''
  refistrationForm.username = ''
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
  <div>
    <BaseModal v-if="!isLoginForm" title="Регистрация" @close="emit('close')">
      <template #content>
        <QForm @submit.prevent="submitRegistrationForm">
          <CustomInput
            v-model="refistrationForm.username"
            label="Имя пользователя"
            placeholder="Введите имя пользователя"
            required
          />
          <CustomInput
            v-model="refistrationForm.email"
            label="Почта"
            type="email"
            placeholder="Введите вашу почту"
            required
          />
          <CustomInput
            v-model="refistrationForm.password"
            label="Пароль"
            type="password"
            placeholder="Введите ваш пароль"
            required
          />
          <CustomButton class="registration-button" type="submit">
            Зарегистрироваться
          </CustomButton>
          <p class="p3-regular" style="text-align: center">
            У вас уже есть аккаунт?
            <span
              class="p3-regular"
              style="color: var(--color-lavender-accent); cursor: pointer"
              @click="isLoginForm = true"
            >
              Войти
            </span>
          </p>
        </QForm>
      </template>
    </BaseModal>

    <BaseModal v-else title="Вход" @close="emit('close')">
      <template #content>
        <QForm @submit.prevent="submitLoginForm">
          <CustomInput
            v-model="loginForm.email"
            label="Почта"
            type="email"
            placeholder="Введите вашу почту"
            required
          />
          <CustomInput
            v-model="loginForm.password"
            label="Пароль"
            type="password"
            placeholder="Введите ваш пароль"
            required
          />
          <CustomButton class="registration-button" type="submit"> Войти </CustomButton>
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
        </QForm>
      </template>
    </BaseModal>
  </div>
</template>

<style scoped>
.registration-button {
  margin-top: 16px;
  width: 100%;
}

:deep(.q-form) {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
