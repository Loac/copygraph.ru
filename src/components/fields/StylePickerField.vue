<template>
    <v-select
        :label="label"
        variant="underlined"
        hide-details
        v-model="model"
        :items="[{
            title: 'Dotted',
            value: 'dotted'
        }, {
            title: 'Dashed',
            value: 'dashed'
        }, {
            title: 'Solid',
            value: 'solid'
        }]"
    />
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
