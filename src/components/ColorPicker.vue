<template>

<!--  <v-menu :close-on-content-click="false">-->
<!--    <template v-slot:activator="{ props }">-->
<!--      <v-btn-->
<!--        v-bind="props"-->
<!--        v-model="model"-->
<!--        :style="swatchStyle(model)"-->
<!--        elevation="0"-->
<!--      ></v-btn>-->
<!--    </template>-->
<!--    <v-card>-->
<!--      <v-card-text class="pa-0">-->
<!--        <v-color-picker-->
<!--          v-model="model"-->
<!--          :hide-inputs="true"-->
<!--          :modes="['rgb']"-->
<!--          flat-->
<!--        />-->
<!--      </v-card-text>-->
<!--    </v-card>-->
<!--  </v-menu>-->

  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-text-field
        label="Color"
        variant="underlined"
        class="color-picker"
        v-bind="props"
        v-model="model"
        value=""
        hide-details
        :readonly="true"
      >
        <template v-slot:prepend-inner>
          <div :style="swatchStyle(model)" class="color-picker__label"></div>
        </template>
      </v-text-field>
    </template>
    <v-card>
      <v-card-text class="pa-0">
        <v-color-picker
          v-model="model"
          :hide-inputs="true"
          :modes="['rgb']"
          flat
        />
      </v-card-text>
    </v-card>
  </v-menu>

</template>

<script setup lang="ts">
  import { defineModel, ModelRef } from "vue";

  const model:ModelRef<string> = defineModel({ required: true });

  const swatchStyle = function(model: any) {
      return {
        cursor: 'pointer',
        backgroundColor: model,
      }
  }
</script>

<style>
  .color-picker .color-picker__label {
    border-radius: 2px;
    height: 18px;
    margin-top: 2px;
    position: absolute;
    width: 100%;
  }
</style>
