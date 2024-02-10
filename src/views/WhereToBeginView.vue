<template>
    <v-container>
        <MarkdownIt :source="WhereToBegin" />
    </v-container>
    <AboutSidebar />
</template>

<script setup lang="ts">
    import WhereToBegin from "@/text/WhereToBegin.md";
    import AboutSidebar from "@/layouts/AboutSidebar.vue";
    import MarkdownIt from "@/components/MarkdownIt.vue";
</script>
