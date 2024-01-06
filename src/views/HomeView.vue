<template>
  <v-container>
    <MarkdownIt :source="readme" />
  </v-container>

    <v-navigation-drawer
        location="right"
        class="workbook-advanced-drawer"
        :permanent="true"
        :width="300"
    >

    </v-navigation-drawer>
</template>

<script lang="ts" setup>
  import MarkdownIt from "@/components/MarkdownIt.vue";
  import readme from '@/text/Home.md';
</script>
