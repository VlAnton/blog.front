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
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1 class="h1-wide">Создание поста</h1>
    </div>

    <div :class="$style['page-body']">
      <q-form type="submit" :class="$style['left-part']" @submit="onSubmit">
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
        <drag-and-drop v-model="postFile" />
        <q-btn :disable="!postTitle || !postContent" type="submit">Создать пост</q-btn>
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
