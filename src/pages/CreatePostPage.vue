<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { QForm, QBtn } from 'quasar'
import CustomInput from '@/components/CustomControllers/CustomInput.vue'
import CustomButton from '@/components/CustomControllers/CustomButton.vue'
import DragAndDrop from '@/components/CustomControllers/DragAndDrop.vue'
import { PostsController } from '@/controllers/posts-controller'
import type { PostBlock, PostBlockCandidate } from '@/types/post-block'

const controller = reactive(PostsController.create())

onMounted(() => {
  controller.mount(nextTick)
})

const postTitle = ref('')
const postContent = ref('')
const postFile = ref(null)
const postBlocks = ref<PostBlock[]>([])

const onSubmitPost = () => {
  controller.createPost({
    title: postTitle.value,
    content: postContent.value,
    photo: postFile.value,
  })
}

const onSubmitPostBlock = (postBlock: PostBlockCandidate) => {
  controller.addPostBlock(postBlock)
}

const onAddNewBlock = () => {
  postBlocks.value.push({
    title: '',
    content: '',
    photo: null,
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
      <div :class="$style['creation-forms']">
        <q-form type="submit" :class="$style['creation-form']" @submit="onSubmitPost">
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
          <custom-button :disable="!postTitle || !postContent" type="submit">
            Создать пост
          </custom-button>
          <q-btn
            v-if="!postBlocks.length"
            :disable="!postTitle || !postContent"
            @click="onAddNewBlock"
          >
            Добавить новый блок
          </q-btn>
        </q-form>
        <q-form
          v-for="(postBlock, index) in postBlocks"
          :key="index"
          type="submit"
          :class="$style['creation-form']"
          @submit="onSubmitPostBlock"
        >
          <drag-and-drop v-model="postBlock.photo" />
          <custom-input
            v-model="postBlock.title"
            custom-label="Название поста"
            clearable
            on-white-background
          />
          <custom-input
            v-model="postBlock.content"
            custom-label="Текст поста"
            clearable
            type="textarea"
            on-white-background
          />
          <q-btn
            :disable="!postBlock.title || !postBlock.content"
            @click="onSubmitPostBlock(postBlock)"
          >
            Создать блок
          </q-btn>
          <q-btn
            v-if="!postBlocks[index + 1]"
            :disable="!postBlock.title || !postBlock.content"
            @click="onAddNewBlock"
          >
            Добавить новый блок
          </q-btn>
        </q-form>
      </div>

      <div :class="$style.preview">
        <div :class="$style['preview-block']">
          <img v-if="postFile" :class="$style['post-photo']" :src="getFilePreviewUrl(postFile)" />
          <h1 class="h1-wide">
            {{ postTitle }}
          </h1>
          <p class="p1-regular">
            {{ postContent }}
          </p>
        </div>
        <div
          v-for="(postBlock, index) in postBlocks"
          :key="`${postBlock.title}-${index}`"
          :class="$style['preview-block']"
        >
          <img
            v-if="postBlock.photo"
            :class="$style['post-photo']"
            :src="getFilePreviewUrl(postBlock.photo)"
          />
          <h1 class="h1-wide">
            {{ postBlock.title }}
          </h1>
          <p class="p1-regular">
            {{ postBlock.content }}
          </p>
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
