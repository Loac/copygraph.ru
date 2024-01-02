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

    <v-btn @click="workbook.addNewLayer()">Add</v-btn>
    <v-btn @click="printLayers">Print</v-btn>

    <v-expansion-panels
      variant="accordion"
      class="no-padding"
      :multiple="true"
    >
      <v-expansion-panel elevation="0">
        <v-expansion-panel-title>Layers</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-card
            v-for="(layer, index) in workbook.layers"
            variant="flat"
            :key="index"
          >
            <v-card-text>
              <v-form>
                <div class="d-flex">
                  <NumberPicker v-model="layer.offset" label="Offset" :max="16" />
                  <WorkbookRhythm v-model.rhythm="layer.rhythm" label="Rhythm" />
                </div>
                <div class="div mt-4">
                  <LineStyleField v-model="layer.lineStyle" />
                </div>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                rounded="xs"
                size="small"
                variant="text"
                :prepend-icon="layer.visible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                :color="layer.visible ? 'blue' : 'grey'"
                @click="workbook.showLayer(layer)"
              >Visible</v-btn>
              <v-btn
                rounded="xs"
                size="small"
                prepend-icon="mdi-close-thick"
                color="red-darken-1"
                variant="text"
                @click="workbook.removeLayer(layer)"
              >Remove</v-btn>
            </v-card-actions>
            <v-divider></v-divider>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { Layer, Workbook } from "@/components/copygraph/WorkbookAdvanced";
  import WorkbookAdvanced from "@/components/workbookAdvanced/WorkbookAdvanced.vue";
  import WorkbookRhythm from "@/components/workbookAdvanced/WorkbookRhythm.vue";
  import {onMounted, ref} from "vue";
  import LineStyleField from "@/components/LineStyleField.vue";
  import NumberPicker from "@/components/NumberPicker.vue";


  const workbook = ref(new Workbook());

  const printLayers = () => {
    for (let index in workbook.value.layers) {
      console.log(workbook.value.layers[index].rhythm.values());
    }
  }

  onMounted(() => {
    workbook.value.addNewLayer()

    let layer = new Layer();
    layer.offset = 4;
    layer.rhythm = [4, 12];
    layer.lineStyle = {
      style: 'solid',
      width: 1,
      color: '#555555'
    }

    workbook.value.addLayer(layer);
  })
</script>

<style>
  .workbook-advanced-drawer .v-expansion-panel-text__wrapper {
    padding: 0 !important;
  }
</style>
