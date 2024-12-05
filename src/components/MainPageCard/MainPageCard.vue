<script setup lang="ts">
import { BACKEND_URL } from '@/constants/env'
import type { Post } from '@/types/post'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

type MainPageCardProps = {
  post: Post
}

const $router = useRouter()
const props = defineProps<MainPageCardProps>()

const onClick = () => {
  const { id } = props.post
  $router.push({
    name: 'post',
    params: {
      id,
    },
  })
}
</script>

<template>
  <div class="card-wrapper" @click="onClick">
    <img
      v-if="props.post.photo"
      :class="$style['card-img']"
      :src="`${BACKEND_URL}/static/${props.post.photo}`"
      alt="card photo"
    />
    <div :class="$style['card-body']">
      <h3 class="h3-wide">{{ props.post.title }}</h3>
      <p class="p3-regular" :class="$style['card-body-text']">{{ props.post.content }}</p>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  height: 479px;
  border-radius: 24px;
  background-color: var(--color-lavender-shallow);
  cursor: pointer;
  transition: all ease-out 0.2s;
  overflow: hidden;
}

.card-wrapper:hover {
  box-shadow: var(--shadow-medium);
  transition: all ease-in 0.2s;
}
</style>

<style module>
.card-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  color: var(--color-text-primary);
  align-items: center;
}

.card-img {
  width: 100%;
  height: 231px;
  object-fit: cover;
}

.card-body-text {
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 8;
  line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
