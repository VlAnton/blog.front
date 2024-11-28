<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar/NavBar.vue'
</script>

<template>
  <main>
    <nav-bar />

    <RouterView />
  </main>
</template>

<style scoped></style>
