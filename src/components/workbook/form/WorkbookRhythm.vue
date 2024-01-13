<template>
    <v-text-field
        v-model="model"
        variant="underlined"
        hide-details
        :label="label"
    ></v-text-field>
</template>

<script setup lang="ts">
import {defineModel, defineProps} from "vue";

const [model, modifiers] = defineModel({
    set(value: string) {
        if (modifiers.rhythm) {
            return value.split(',').map((item) => Number(item));
        }
        return value
    }
});

defineProps({
    label: {
        type: String,
        default: ''
    },
});
</script>
