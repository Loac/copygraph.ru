<template>
    <div class="d-flex align-end">
        <NumberPicker
            v-model="model.width"
            label="Width"
            :min="0"
            :max="5"
            :step="1"
        />
        <StylePicker
            label="Style"
            v-model="model.style"
        />
        <ColorPicker
            variant="underlined"
            hide-details
            v-model="model.color"
        />
    </div>
</template>

<script setup lang="ts">
    import StylePicker from "@/components/fields/StylePickerField.vue";
    import NumberPicker from "@/components/fields/NumberPickerField.vue";
    import ColorPicker from "@/components/fields/ColorPickerField.vue";
    import { defineModel } from "vue";
    import { LineStyle } from "@/components/copygraph/Copygraph";

    const model = defineModel<LineStyle>({
        required: true
    });
</script>
