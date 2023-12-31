<template>

  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        v-model="model"
        :style="swatchStyle(model)"
        elevation="0"
      ></v-btn>
    </template>
    <v-card>
      <v-card-text class="pa-0">
        <v-color-picker
          v-model="model"
          :hide-inputs="true"
          :modes="['rgb']"
          flat
        />
      </v-card-text>
    </v-card>
  </v-menu>
  
</template>

<script setup lang="ts">
  import { defineModel } from "vue";

  const model = defineModel();

  const swatchStyle = function(model: any) {
      return {
        backgroundColor: model,
        cursor: 'pointer',
        // minWidth: 'var(--v-btn-height)',
      }
  }
</script>

<style scoped>

</style>
