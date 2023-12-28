<template>
  <v-main class="d-flex" style="min-height: 300px;">
    <TheCopybook />
  </v-main>
  <v-navigation-drawer location="right">
    <v-list>
      <v-list-item title="Navigation drawer"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import TheCopybook from "@/components/copybook/TheCopybook.vue";
</script>
