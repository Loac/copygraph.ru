<template>
  <div class="d-flex align-end">
    <NumberPicker
      v-model="model.width"
      label="Width"
      :min="0"
      :max="5"
    ></NumberPicker>

    <StylePicker
      label="Style"
      v-model="model.style"
    ></StylePicker>

    <ColorPicker
      variant="underlined"
      hide-details
      v-model="model.color"
    />
  </div>
</template>

<script setup lang="ts">
  import StylePicker from "@/components/StylePicker.vue";
  import NumberPicker from "@/components/NumberPicker.vue";
  import ColorPicker from "@/components/ColorPicker.vue";
  import { defineModel } from "vue";
  import {LineStyle} from "@/components/copygraph/Copygraph";

  const model = defineModel<LineStyle>({
    required: true
  });
</script>

<style scoped>

</style>
