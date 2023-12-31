<template>
  <v-menu :close-on-content-click="false" :location="'center'">
    <template v-slot:activator="{ props }">
      <v-text-field
        :label="label"
        :readonly="true"
        variant="underlined"
        hide-details
        v-bind="props"
        v-model="model"
        style="cursor: pointer"
      ></v-text-field>
    </template>

    <v-card>
      <v-card-text class="pa-5">
        <v-slider
          v-model="model"
          direction="vertical"
          :min="min"
          :max="max"
          :step="step"
          @update:modelValue="updateModelValue"
        ></v-slider>
      </v-card-text>
    </v-card>
  </v-menu>

</template>

<script setup lang="ts">
  import { defineModel, defineProps, defineEmits } from "vue";

  const model = defineModel();

  const props = defineProps({
    label: {
      type: String,
      default: ''
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 5,
    },
    step: {
      type: Number,
      default: 1,
    },
    input1: {
      type: Function
    }
  });

  const emit = defineEmits(['input'])

  const updateModelValue = function() {
    emit('input');
  }

  // blah();

  // const emit = defineEmits<{
  //   input: []
  //   // change: [id: number]
  //   // update: [value: string]
  // }>()
</script>


<style scoped>

</style>
