<template>
  <Workbook />

  <v-navigation-drawer location="right">
    <v-list>
      <v-list-item title="Navigation drawer"></v-list-item>
    </v-list>

    <v-btn @click="addLayer">Add</v-btn>
    <v-btn @click="printLayers">Print</v-btn>

    <div class="layers">
      <div class="layer" v-for="(layer, index) in layers" :key="index">
        <WorkbookLayer v-model="layers[index].value" />
      </div>
    </div>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import Workbook from "@/components/workbookAdvanced/WorkbookAdvanced.vue";
  import WorkbookLayer from "@/components/workbookAdvanced/WorkbookLayer.vue";
  import {ref} from "vue";

  class Layer {
    value: number = 0;
  }

  const arr: Array<Layer> = [];
  const layers = ref(arr);

  const addLayer = () => {
    layers.value.push(new Layer());
  }

  const printLayers = () => {
    for (let index in arr) {
      console.log(arr[index]);
    }
  }
</script>

<style scoped>

</style>
