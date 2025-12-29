<script setup lang="ts">
type HeaderProps = {
  title: string
  active: boolean
  link: string
}

const props = withDefaults(defineProps<HeaderProps>(), {
  title: '',
  active: false,
  link: '/',
})
</script>

<template>
  <RouterLink :to="link" class="header-tab h4-wide">
    {{ title }}
    <div
      class="header-tab__underline"
      :class="{
        'header-tab__underline--active': props.active,
      }"
    />
  </RouterLink>
</template>

<style scoped lang="scss">
.header-tab {
  $root: &;

  color: #9264ff;
  cursor: pointer;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color ease-out 0.3s;

  &__underline {
    height: 1px;
    width: 0;
    background-color: #9264ff;
    transition: all ease-out 0.2s;

    &--active,
    #{$root}:hover > & {
      width: 100%;
      transition: all ease-in 0.2s;
    }
  }
}

.header-tab:hover > .underline {
  width: 100%;
  transition: all ease-in 0.2s;
}
</style>
