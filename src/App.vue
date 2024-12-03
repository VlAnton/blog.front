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

<style>
.page-header {
  background-color: var(--color-lavender);
  padding: 8px 48px 48px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  color: var(--color-text-primary);
}
</style>
