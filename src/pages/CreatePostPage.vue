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
    <div class="page-header">
      <h1 class="h1-wide">Создание поста</h1>
    </div>

    <div :class="$style['page-body']">
      <div :class="$style['creation-forms']">
        <QForm type="submit" :class="$style['creation-form']" @submit="onSubmitPost">
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
      </div>

      <div :class="$style.preview">
        <div :class="$style['preview-block']">
          <h1 class="h1-wide">
            {{ postTitle }}
          </h1>
          <div class="p1-regular" v-html="getCompiledMarkdown(postContent)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.creation-forms,
.creation-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 451px;
}

.creation-form:not(:last-child) {
  border-bottom: 1px solid var(--color-lavender-accent);
  padding-bottom: 24px;
}

.page-body {
  padding: 0 48px;
  margin-bottom: 48px;
  display: flex;
  gap: 32px;
}

.preview {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding: 24px;
  border-radius: 24px;
  background-color: var(--color-lavender-shallow);
}

.preview-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

.post-photo {
  width: 50%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
}
</style>
