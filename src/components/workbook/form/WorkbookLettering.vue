<template>
    <v-card variant="flat">
        <v-card-text>
            <v-select
                v-model="copygraph.workbook.lettering.font"
                label="Font"
                variant="underlined"
                hide-details
                :items="fontList"
            />
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ModelRef, ref } from "vue";
    import { Copygraph } from "@/components/copygraph/Copygraph";

    const fontList = ref(['Gloria script', 'Arial']);
    const copygraph:ModelRef<Copygraph> = defineModel({ required: true });
</script>
