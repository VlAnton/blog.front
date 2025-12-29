<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Post } from '@/shared/types'
import CustomButton from '@/shared/ui/CustomControllers/CustomButton.vue'
import BaseModal from '@/shared/ui/Modal/BaseModal.vue'

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
    <div :class="$style['close-button-wrapper']">
      <CustomButton
        v-if="props.isUserAdmin"
        size="sm"
        icon="close"
        color="var(--color-lavender)"
        @click.stop="isModalOpened = true"
      />
      <BaseModal v-if="isModalOpened" title="Удалить пост?" @close="isModalOpened = false">
        <template #content>
          <p class="p3-regular">Вы уверены, что хотите удалить пост "{{ props.post.title }}"?</p>
          <div :class="$style['modal-buttons']">
            <CustomButton
              size="lg"
              color="var(--color-lavender)"
              style="width: 100%"
              @click="emit('delete', props.post.id)"
            >
              Удалить
            </CustomButton>
            <CustomButton size="lg" @click="isModalOpened = false" style="width: 100%">
              Отмена
            </CustomButton>
          </div>
        </template>
      </BaseModal>
    </div>
    <div :class="$style['card-body']">
      <h3 class="h3-wide">{{ props.post.title }}</h3>
      <div class="p3-regular" :class="$style['card-body-text']" v-html="props.post.contentHtml" />
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
