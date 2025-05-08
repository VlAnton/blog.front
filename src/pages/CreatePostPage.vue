<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { QForm } from 'quasar'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import CustomInput from '@/components/CustomControllers/CustomInput.vue'
import CustomButton from '@/components/CustomControllers/CustomButton.vue'
import DragAndDrop from '@/components/CustomControllers/DragAndDrop.vue'
import { PostsController } from '@/controllers/posts-controller'
import type { PostBlockCandidate } from '@/types/post-block'

const controller = reactive(PostsController.create())

onMounted(() => {
  controller.mount(nextTick)
})

const postTitle = ref('')
const postContent = ref('')
const postFile = ref(null)
const postBlocks = reactive<PostBlockCandidate[]>([])

const getCompiledMarkdown = (text: string) => {
  return DOMPurify.sanitize(marked.parse(text) as string)
}

const onSubmitPost = () => {
  controller.createPost(
    {
      title: postTitle.value,
      content: getCompiledMarkdown(postContent.value),
      photo: postFile.value,
    },
    postBlocks.map((block: PostBlockCandidate) => ({
      title: block.title,
      content: getCompiledMarkdown(block.content as string),
      photo: block.photo,
    })),
  )
}

const onAddNewBlock = () => {
  postBlocks.push({
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
          <custom-button
            :disable="!postTitle || !postContent"
            type="submit"
            align="left"
            icon="add"
          >
            Создать пост
          </custom-button>
          <custom-button
            v-if="postBlocks.length === 0"
            :disable="!postTitle || !postContent"
            align="left"
            icon="add"
            color="var(--color-lavender)"
            @click="onAddNewBlock"
          >
            Добавить новый блок
          </custom-button>
        </q-form>
        <q-form
          v-for="(postBlock, index) in postBlocks"
          :key="index"
          type="submit"
          :class="$style['creation-form']"
        >
          <drag-and-drop v-model="postBlock.photo" />
          <custom-input
            v-model="postBlock.title"
            custom-label="Название поста"
            clearable
            on-white-background
          />
          <custom-input
            v-model="postBlock.content as string"
            custom-label="Текст поста"
            clearable
            type="textarea"
            on-white-background
          />
          <custom-button
            v-if="!postBlocks[index + 1]"
            :disable="!postBlock.title || !postBlock.content"
            align="left"
            icon="add"
            color="var(--color-lavender)"
            @click="onAddNewBlock"
          >
            Добавить новый блок
          </custom-button>
        </q-form>
      </div>

      <div :class="$style.preview">
        <div :class="$style['preview-block']">
          <img v-if="postFile" :class="$style['post-photo']" :src="getFilePreviewUrl(postFile)" />
          <h1 class="h1-wide">
            {{ postTitle }}
          </h1>
          <div class="p1-regular" v-html="getCompiledMarkdown(postContent)"></div>
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
          <p class="p1-regular" v-html="getCompiledMarkdown(postBlock.content as string)"></p>
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
