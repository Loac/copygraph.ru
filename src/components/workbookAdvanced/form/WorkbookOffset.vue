<template>
  <v-text-field
    v-model.number="model"
    variant="underlined"
    hide-details
    :label="label"
  ></v-text-field>
</template>

<script setup lang="ts">
  import { defineModel, defineProps } from "vue";
  const model = defineModel();

  defineProps({
    label: {
      type: String,
      default: ''
    },
  });
</script>
