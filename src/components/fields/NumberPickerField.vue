<template>
    <v-menu :close-on-content-click="false" :location="'center'">
        <template v-slot:activator="{ props }">
            <v-text-field
                v-model="model"
                v-bind="props"
                variant="underlined"
                hide-details
                style="cursor: pointer"
                :suffix="suffix"
                :label="label"
                :readonly="readonly"
            />
        </template>

        <v-card>
            <v-card-text class="pa-5">
                <v-slider
                    v-model="model"
                    direction="vertical"
                    hide-details
                    :min="min"
                    :max="max"
                    :step="step"
                    @update:modelValue="updateModelValue"
                />
            </v-card-text>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
    import { defineModel, defineProps, defineEmits, ModelRef } from "vue";

    const model:ModelRef<number> = defineModel({ required: true });

    defineProps({
        label: {
            type: String,
            default: ''
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 5
        },
        step: {
            type: Number,
            default: 1
        },
        suffix: {
            type: String,
            default: ''
        }
    });

    const emit = defineEmits<{
        input: []
    }>()

    const updateModelValue = function() {
        emit('input');
    }
</script>
