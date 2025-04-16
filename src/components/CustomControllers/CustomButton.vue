<script setup lang="ts">
import { QBtn } from 'quasar'
</script>
<template>
  <q-btn v-bind="$attrs" :ripple="false">
    <template v-for="(s, slot) of $slots" :key="slot" #[slot]="scope">
      <slot v-if="!!s" :name="slot" v-bind="scope" />
    </template>
  </q-btn>
</template>
