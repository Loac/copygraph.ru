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
    <v-card variant="flat">
        <v-card-text>
            <div v-for="(letter, index) in copygraph.workbook.lettering.letters" :key="index">
                <div v-if="index > 0" class="mt-4"></div>
                <div class="d-flex align-end">
                    <v-text-field
                        v-model="copygraph.workbook.lettering.letters[index]"
                        label="Letter"
                        variant="underlined"
                        hide-details
                    />
                    <v-btn
                        rounded="xs"
                        size="small"
                        prepend-icon="mdi-close-thick"
                        color="red-darken-1"
                        variant="text"
                        class="btn-remove"
                        @click="copygraph.workbook.removeLetter(index)"
                    />
                </div>
            </div>
        </v-card-text>
        <v-card-actions>
            <v-btn
                rounded="xs"
                size="small"
                variant="text"
                text="Visible"
                :prepend-icon="copygraph.workbook.lettering.visible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                :color="copygraph.workbook.lettering.visible ? 'blue' : 'grey'"
                @click="copygraph.workbook.showLettering()"
            />
            <v-btn
                rounded="xs"
                size="small"
                prepend-icon="mdi-plus"
                color="green-darken-1"
                variant="text"
                text="Add"
                @click="copygraph.workbook.addLetter()"
            />
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
    import { ModelRef, ref } from "vue";
    import { Copygraph } from "@/components/copygraph/Copygraph";
    import NumberPickerField from "@/components/fields/NumberPickerField.vue";
    import ColorPickerField from "@/components/fields/ColorPickerField.vue";

    const fontList = ref(['Gloria script', 'Esenin script One', 'Deutsch Gothic']);
    const copygraph:ModelRef<Copygraph> = defineModel({ required: true });
</script>

<style lang="scss">
    .btn-remove {
        min-width: auto;
        padding: 0 6px;

        .v-btn__prepend {
            margin: 0;
        }
    }
</style>
