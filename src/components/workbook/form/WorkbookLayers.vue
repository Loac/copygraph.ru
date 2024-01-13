<template>
    <v-card variant="flat">
        <v-card-actions>
            <v-btn
                rounded="xs"
                size="small"
                prepend-icon="mdi-plus"
                color="green-darken-1"
                variant="text"
                text="Add"
                @click="copygraph.workbook.addNewLayer()"
            />
        </v-card-actions>
    </v-card>
    <v-card
        v-for="(layer, index) in copygraph.workbook.layers"
        variant="flat"
        :key="index"
    >
        <v-divider></v-divider>
        <v-card-text>
            <div class="d-flex">
                <NumberPicker
                    v-model.number="layer.barHeight"
                    label="Height"
                    :min="1"
                    :max="36"
                />
                <NumberPicker
                    v-model.number="layer.barMargin"
                    label="Margin"
                    :min="0"
                    :max="36"
                />
                <NumberPicker
                    v-model.number="layer.barPadding"
                    label="Padding"
                    :min="0"
                    :max="36"
                />
            </div>
            <div class="d-flex mt-4">
                <NumberPicker
                    v-model.number="layer.lineAngle"
                    label="Angle"
                    :min="0"
                    :max="180"
                />
                <WorkbookRhythm
                    v-model.rhythm="layer.rhythm"
                    label="Rhythm"
                />
            </div>
            <div class="mt-4">
                <LineStyleField v-model="layer.lineStyle" />
            </div>
        </v-card-text>
        <v-card-actions>
            <v-btn
                rounded="xs"
                size="small"
                variant="text"
                text="Visible"
                :prepend-icon="layer.visible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                :color="layer.visible ? 'blue' : 'grey'"
                @click="copygraph.workbook.showLayer(layer)"
            />
            <v-btn
                rounded="xs"
                size="small"
                prepend-icon="mdi-close-thick"
                color="red-darken-1"
                variant="text"
                text="Remove"
                @click="copygraph.workbook.removeLayer(layer)"
            />
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
    import { ModelRef } from "vue";
    import { Copygraph } from "@/components/copygraph/Copygraph";
    import NumberPicker from "@/components/fields/NumberPickerField.vue";
    import WorkbookRhythm from "@/components/fields/WorkbookRhythmField.vue";
    import LineStyleField from "@/components/fields/LineStyleField.vue";

    const copygraph:ModelRef<Copygraph> = defineModel({ required: true });
</script>
