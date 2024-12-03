<script setup lang="ts">
import { ref } from 'vue'
import { QForm } from 'quasar'
import CustomInput from '@/components/CustomControllers/CustomInput.vue'
const postTitle = ref('')
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1 class="h1-wide">Создание поста</h1>
    </div>

    <div :class="$style['page-body']">
      <q-form type="submit" :class="$style['left-part']">
        <custom-input v-model="postTitle" custom-label="Название поста" clearable></custom-input>
      </q-form>
    </div>
  </div>
</template>

<style module>
.left-part {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 451px;
}

.page-body {
  padding: 0 48px;
}
</style>
