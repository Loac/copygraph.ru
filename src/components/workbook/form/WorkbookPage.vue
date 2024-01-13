<template>
    <v-card variant="flat">
        <v-card-text>
            <div class="d-flex ga-4">
                <v-text-field
                    v-model.number="copygraph.workbook.pageWidth"
                    label="Width"
                    variant="underlined"
                    suffix="mm"
                    hide-details
                    :readonly="true"
                    :disabled="true"
                />
                <v-text-field
                    v-model.number="copygraph.workbook.pageHeight"
                    label="Height"
                    variant="underlined"
                    suffix="mm"
                    hide-details
                    :readonly="true"
                    :disabled="true"
                />
            </div>
            <div class="d-flex mt-4 ga-4">
                <NumberPicker
                    v-model.number="copygraph.workbook.pagePadding"
                    label="Padding"
                    suffix="mm"
                    :min="0"
                    :max="20"
                    :step="0.1"
                />
                <NumberPicker
                    v-model.number="copygraph.workbook.fractionHeight"
                    label="Fraction"
                    suffix="mm"
                    :min="1"
                    :max="10"
                    :step="0.01"
                />
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import { ModelRef } from "vue";
    import { Copygraph } from "@/components/copygraph/Copygraph";
    import NumberPicker from "@/components/fields/NumberPickerField.vue";

    const copygraph:ModelRef<Copygraph> = defineModel({ required: true });
</script>
