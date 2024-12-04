<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { QForm, QBtn } from 'quasar'
import CustomInput from '@/components/CustomControllers/CustomInput.vue'
import DragAndDrop from '@/components/CustomControllers/DragAndDrop.vue'
import { PostsController } from '@/controllers/posts-controller'

const controller = reactive(PostsController.create())

onMounted(() => {
  controller.mount(nextTick)
})

const postTitle = ref('')
const postContent = ref('')
const postFile = ref(null)

const onSubmit = () => {
  controller.createPost({
    title: postTitle.value,
    content: postContent.value,
    photo: postFile.value,
  })
}

const getFilePreviewUrl = (file: File | null) => {
  if (!file) {
    return ''
  }
  return URL.createObjectURL(file)
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1 class="h1-wide">Создание поста</h1>
    </div>

    <div :class="$style['page-body']">
      <q-form type="submit" :class="$style['creation-form']" @submit="onSubmit">
        <drag-and-drop v-model="postFile" />
        <custom-input
          v-model="postTitle"
          custom-label="Название поста"
          clearable
          on-white-background
        />
        <custom-input
          v-model="postContent"
          custom-label="Текст поста"
          clearable
          type="textarea"
          on-white-background
        />
        <q-btn :disable="!postTitle || !postContent" type="submit">Создать пост</q-btn>
      </q-form>

      <div :class="$style.preview">
        <img v-if="postFile" :class="$style['post-photo']" :src="getFilePreviewUrl(postFile)" />
        <h1 class="h1-wide">
          {{ postTitle }}
        </h1>
        <p class="p1-regular">
          {{ postContent }}
        </p>
      </div>
    </div>
  </div>
</template>

<style module>
.creation-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 451px;
}

.page-body {
  padding: 0 48px;
  display: flex;
  gap: 32px;
}

.preview {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  border-radius: 24px;
  background-color: var(--color-lavender-shallow);
}

.post-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
}
</style>
