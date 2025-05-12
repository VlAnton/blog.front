<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { BACKEND_URL } from '@/constants/env'
import type { Post } from '@/types'
import CustomButton from '@/components/CustomControllers/CustomButton.vue'
import BaseModal from '@/components/Modal/BaseModal.vue'

type MainPageCardProps = {
  post: Post
  isUserAdmin: boolean
}

const $router = useRouter()
const props = defineProps<MainPageCardProps>()
const emit = defineEmits(['delete'])

const isModalOpened = ref(false)

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
    <div :class="$style['close-button-wrapper']">
      <custom-button
        v-if="props.isUserAdmin"
        size="sm"
        icon="close"
        color="var(--color-lavender)"
        @click.stop="isModalOpened = true"
      />
      <base-modal v-if="isModalOpened" title="Удалить пост?" @close="isModalOpened = false">
        <template #content>
          <p class="p3-regular">Вы уверены, что хотите удалить пост "{{ props.post.title }}"?</p>
          <div :class="$style['modal-buttons']">
            <custom-button
              size="lg"
              color="var(--color-lavender)"
              style="width: 100%"
              @click="emit('delete', props.post.id)"
            >
              Удалить
            </custom-button>
            <custom-button size="lg" @click="isModalOpened = false" style="width: 100%">
              Отмена
            </custom-button>
          </div>
        </template>
      </base-modal>
    </div>
    <div :class="$style['card-body']">
      <h3 class="h3-wide">{{ props.post.title }}</h3>
      <p class="p3-regular" :class="$style['card-body-text']" v-html="props.post.content"></p>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  position: relative;
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

.close-button-wrapper {
  position: absolute;
  top: 24px;
  right: 24px;
}

.modal-buttons {
  display: flex;
  gap: 24px;
  justify-content: center;
}
</style>
