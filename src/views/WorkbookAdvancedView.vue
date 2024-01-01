<template>
  <WorkbookAdvanced :workbook="workbook"/>

  <v-navigation-drawer
    location="right"
    class="workbook-advanced-drawer"
    :permanent="true"
    :width="300"
  >
    <v-list>
      <v-list-item title="Navigation drawer"></v-list-item>
    </v-list>

    <v-btn @click="addLayer">Add</v-btn>
    <v-btn @click="printLayers">Print</v-btn>

    <v-expansion-panels
      variant="accordion"
      class="no-padding"
      :multiple="true">
      <v-expansion-panel elevation="0">
        <v-expansion-panel-title>Layers</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-card
            v-for="(layer, index) in workbook.layers"
            variant="flat"
            :key="index"
          >
            <template v-slot:append>

            </template>
            <v-card-text>
              <WorkbookOffset v-model="layer.offset" label="Offset" />
              <WorkbookRhythm v-model.rhythm="layer.rhythm" label="Rhythm" />
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>






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

<style>
  .workbook-advanced-drawer .v-expansion-panel-text__wrapper {
    padding: 0 !important;
  }
</style>
