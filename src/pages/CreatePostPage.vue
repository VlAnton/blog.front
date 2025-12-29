<script setup lang="ts">
import { ref } from 'vue'
import { QForm } from 'quasar'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import CustomInput from '@/shared/ui/CustomControllers/CustomInput.vue'
import CustomButton from '@/shared/ui/CustomControllers/CustomButton.vue'
import { postApi } from '@/entities/post'
import { useRouter } from 'vue-router'

const postTitle = ref('')
const postContent = ref('')

const router = useRouter()

const getCompiledMarkdown = (text: string) => {
  return DOMPurify.sanitize(marked.parse(text) as string)
}

const onSubmitPost = async () => {
  await postApi.createPost({
    title: postTitle.value,
    contentText: postContent.value,
  })
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="page">
    <div class="page__header">
      <h1 class="h1-wide">Создание поста</h1>
    </div>

    <div class="page__body">
      <QForm type="submit" class="page__body__creation-form" @submit="onSubmitPost">
        <CustomInput
          v-model="postTitle"
          custom-label="Название поста"
          clearable
          on-white-background
        />
        <CustomInput
          v-model="postContent"
          custom-label="Текст поста"
          clearable
          type="textarea"
          on-white-background
        />
        <CustomButton :disable="!postTitle || !postContent" type="submit" align="left" icon="add">
          Создать пост
        </CustomButton>
      </QForm>

      <div class="page__body__preview">
        <div class="page__body__preview__block">
          <h1 class="h1-wide">
            {{ postTitle }}
          </h1>
          <div class="p1-regular" v-html="getCompiledMarkdown(postContent)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  &__body {
    padding: 0 48px;
    margin-bottom: 48px;
    display: flex;
    gap: 32px;

    &__creation-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
      min-width: 451px;
    }

    &__preview {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 64px;
      padding: 24px;
      border-radius: 24px;
      background-color: var(--color-lavender-shallow);

      &__block {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        align-items: center;
      }
    }
  }
}
</style>
