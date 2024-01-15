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
            <div class="d-flex mt-4 ga-2">
                <ColorPickerField
                    label="First color"
                    variant="underlined"
                    hide-details
                    v-model="copygraph.workbook.lettering.firstColor"
                />
                <ColorPickerField
                    variant="underlined"
                    hide-details
                    v-model="copygraph.workbook.lettering.color"
                />
            </div>
            <div class="d-flex mt-4 ga-2">
                <NumberPickerField
                    v-model.number="copygraph.workbook.lettering.barHeight"
                    label="Height"
                    :min="1"
                    :max="36"
                />
                <NumberPickerField
                    v-model.number="copygraph.workbook.lettering.barMargin"
                    label="Margin"
                    :min="0"
                    :max="36"
                />
                <NumberPickerField
                    v-model.number="copygraph.workbook.lettering.barPadding"
                    label="Margin"
                    :min="0"
                    :max="18"
                />
            </div>
            <div class="d-flex mt-4 ga-2">
                <NumberPickerField
                    v-model.number="copygraph.workbook.lettering.fontSize"
                    label="Size"
                    :min="2"
                    :max="10"
                    :step="0.1"
                />
                <NumberPickerField
                    v-model.number="copygraph.workbook.lettering.letterTopMargin"
                    label="Letter top"
                    :min="-10"
                    :max="10"
                    :step="0.1"
                />
                <NumberPickerField
                    v-model.number="copygraph.workbook.lettering.letterRightMargin"
                    label="Letter right"
                    :min="-10"
                    :max="10"
                    :step="0.1"
                />
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
    import { ModelRef, ref } from "vue";
    import { Copygraph } from "@/components/copygraph/Copygraph";
    import NumberPickerField from "@/components/fields/NumberPickerField.vue";
    import ColorPickerField from "@/components/fields/ColorPickerField.vue";

    const fontList = ref(['Gloria script', 'Arial']);
    const copygraph:ModelRef<Copygraph> = defineModel({ required: true });
</script>
