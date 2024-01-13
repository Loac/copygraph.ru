<template>
    <div v-html="markdown.render(source)" class="typography" />
</template>

<script setup lang="ts">
    import MarkdownIt from "markdown-it";
    // import MarkdownItAbbr from "markdown-it-abbr";
    // import MarkdownItAnchor from "markdown-it-anchor";
    // import MarkdownItFootnote from "markdown-it-footnote";
    // import MarkdownItHighlightjs from "markdown-it-highlightjs";
    // import MarkdownItSub from "markdown-it-sub";
    // import MarkdownItSup from "markdown-it-sup";
    // import MarkdownItTasklists from "markdown-it-task-lnpm install markdown-it --saveists";
    // import MarkdownItTOC from "markdown-it-toc-done-right";

    const markdown = new MarkdownIt();
        // .use(MarkdownItAbbr)
        // .use(MarkdownItAnchor)
        // .use(MarkdownItFootnote)
        // .use(MarkdownItHighlightjs)
        // .use(MarkdownItSub)
        // .use(MarkdownItSup)
        // .use(MarkdownItTasklists)
        // .use(MarkdownItTOC);

    defineProps({
        source: {
            type: String,
            default: ""
        }
    });

    // Use: v-markdown
    // const vMarkdown = {
    //     mounted: (el) => {
    //         const map: Map<string, string> = new Map();
    //         map.set('h1', 'text-h1');
    //         map.set('h2', 'text-h2');
    //         map.set('h3', 'text-h3');
    //         map.set('h4', 'text-h4');
    //
    //         map.forEach((value, key) => {
    //             const els = el.querySelectorAll(key);
    //             els.forEach((el) => el.classList.add(value));
    //         })
    //     }
    // }
</script>
