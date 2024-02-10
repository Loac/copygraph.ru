<template>
    <v-container>
        <MarkdownIt :source="About" />
    </v-container>
    <AboutSidebar />
</template>

<script lang="ts" setup>
    import MarkdownIt from "@/components/MarkdownIt.vue";
    import About from '@/text/About.md';
    import AboutSidebar from "@/layouts/AboutSidebar.vue";

    document.title = 'Copygraph – Контакты';
</script>
