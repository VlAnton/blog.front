<script setup lang="ts">
import { reactive, defineEmits, ref } from 'vue'
import { QForm } from 'quasar'
import BaseModal from '@/components/Modal/BaseModal.vue'
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
    <base-modal v-if="!isLoginForm" title="Регистрация" @close="emit('close')">
      <template #content>
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
          </p>
        </q-form>
      </template>
    </base-modal>
    <!-- </div> -->
    <base-modal v-else title="Вход" @close="emit('close')">
      <template #content>
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
          <custom-button :class="$style['registration-button']" type="submit">
            Войти
          </custom-button>
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
      </template>
    </base-modal>
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
.registration-button {
  margin-top: 16px;
  width: 100%;
}
</style>
