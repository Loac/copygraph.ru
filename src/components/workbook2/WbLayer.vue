<template>
  <v-text-field
    label="Value"
    v-model.number="model"
  ></v-text-field>
</template>

<script setup lang="ts">
  import { defineModel } from "vue";
  const model = defineModel();
</script>

<style scoped>

</style>
