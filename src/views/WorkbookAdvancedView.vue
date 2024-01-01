<template>
  <WorkbookAdvanced :workbook="workbook"/>

  <v-navigation-drawer location="right">
    <v-list>
      <v-list-item title="Navigation drawer"></v-list-item>
    </v-list>

    <v-btn @click="addLayer">Add</v-btn>
    <v-btn @click="printLayers">Print</v-btn>

    <div class="layers">
      <div class="layer" v-for="(layer, index) in workbook.layers" :key="index">
        <WorkbookOffset v-model="layer.offset" label="Offset" />
        <WorkbookRhythm v-model.rhythm="layer.rhythm" label="Rhythm" />
      </div>
    </div>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import WorkbookAdvanced, { Workbook, Layer } from "@/components/workbookAdvanced/WorkbookAdvanced.vue";
  import WorkbookOffset from "@/components/workbookAdvanced/WorkbookOffset.vue";
  import { ref } from "vue";
  import WorkbookRhythm from "@/components/workbookAdvanced/WorkbookRhythm.vue";


  const workbook = ref(new Workbook());

  const addLayer = () => {
    let layer = new Layer();
    layer.offset = 6;
    layer.rhythm = [8,2,2,2,2];
    layer.lineStyle.width = 1;
    layer.lineStyle.style = 'dashed';
    layer.lineStyle.color = '#AAAAAA';

    workbook.value.layers.push(layer);

    // let layer2 = new Layer();
    // layer2.offset = 4;
    // layer2.rhythm = [4, 12];
    // layer2.lineStyle = {
    //   style: 'solid',
    //   width: 1,
    //   color: '#555555'
    // }
    //
    // workbook.value.layers.push(layer2);
  }

  const printLayers = () => {
    for (let index in workbook.value.layers) {
      console.log(workbook.value.layers[index].rhythm.values());
    }
  }
</script>

<style scoped>

</style>
