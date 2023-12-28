<template>
  <div>
    <MarkdownIt :source="readme" />
  </div>
</template>

<script lang="ts" setup>
    import MarkdownIt from "@/components/MarkdownIt.vue";
    import readme from '@/text/Home.md';
</script>
