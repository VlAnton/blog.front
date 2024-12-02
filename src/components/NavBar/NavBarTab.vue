<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

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
  <router-link :to="link" :class="$style['header-tab']" class="h4-wide">
    {{ title }}
    <div
      :class="{
        [$style.underline]: true,
        [$style['underline--active']]: props.active,
      }"
    ></div>
  </router-link>
</template>

<style module>
.header-tab {
  color: #9264ff;
  cursor: pointer;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color ease-out 0.3s;
}

.underline {
  height: 1px;
  width: 0;
  background-color: #9264ff;
  transition: all ease-out 0.2s;
}

.underline--active,
.header-tab:hover > .underline {
  width: 100%;
  transition: all ease-in 0.2s;
}
</style>
