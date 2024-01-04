<template>
  <WorkbookAdvanced :workbook="workbook"/>

  <v-navigation-drawer
    location="right"
    class="workbook-advanced-drawer"
    :permanent="true"
    :width="300"
  >
    <v-toolbar>
      <v-btn @click="printToPdf()" text="Print" />
    </v-toolbar>

    <v-select
      label="Preset"
      :items="presetList"
    />

    <v-expansion-panels
      variant="accordion"
      class="no-padding"
      :multiple="true"
    >
      <v-expansion-panel elevation="0">
        <v-expansion-panel-title>Page</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-card variant="flat">
            <v-card-text>
              <div class="d-flex ga-4">
                <v-text-field
                  v-model="workbook.pageWidth"
                  label="Width"
                  variant="underlined"
                  suffix="mm"
                  hide-details
                  :readonly="true"
                  :disabled="true"
                />
                <v-text-field
                  v-model="workbook.pageHeight"
                  label="Height"
                  variant="underlined"
                  suffix="mm"
                  hide-details
                  :readonly="true"
                  :disabled="true"
                />
              </div>
              <div class="d-flex mt-4 ga-4">
                <NumberPicker
                  v-model="workbook.pagePadding"
                  label="Padding"
                  suffix="mm"
                  :min="0"
                  :max="20"
                  :step="1"
                />
                <NumberPicker
                  v-model="workbook.fractionHeight"
                  label="Fraction"
                  suffix="mm"
                  :min="0.5"
                  :max="10"
                  :step="0.01"
                  :readonly="false"
                />
              </div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel elevation="0">
        <v-expansion-panel-title>Layers</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-card variant="flat">
            <v-card-actions>
              <v-btn
                rounded="xs"
                size="small"
                prepend-icon="mdi-plus"
                color="green-darken-1"
                variant="text"
                text="Add"
                @click="workbook.addNewLayer()"
              />
            </v-card-actions>
          </v-card>

          <v-card
            v-for="(layer, index) in workbook.layers"
            variant="flat"
            :key="index"
          >
            <v-divider></v-divider>
            <v-card-text>
              <div class="d-flex">
                <NumberPicker
                  v-model="layer.offset"
                  label="Offset"
                  :max="16"
                />
                <WorkbookRhythm
                  v-model.rhythm="layer.rhythm"
                  label="Rhythm"
                />
              </div>
              <div class="div mt-4">
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
                @click="workbook.showLayer(layer)"
              />
              <v-btn
                rounded="xs"
                size="small"
                prepend-icon="mdi-close-thick"
                color="red-darken-1"
                variant="text"
                text="Remove"
                @click="workbook.removeLayer(layer)"
              />
            </v-card-actions>
          </v-card>

        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {Layer, Preset, Workbook} from "@/components/workbookAdvanced/WorkbookAdvanced.vue";
  import WorkbookAdvanced from "@/components/workbookAdvanced/WorkbookAdvanced.vue";
  import WorkbookRhythm from "@/components/workbookAdvanced/form/WorkbookRhythm.vue";
  import {onMounted, ref} from "vue";
  import LineStyleField from "@/components/LineStyleField.vue";
  import NumberPicker from "@/components/NumberPicker.vue";
  import {printToPdf} from "@/components/copygraph/Print";

  const workbook = ref(new Workbook());

  const readPresets = async (): Promise<unknown> => {
    const presets = import.meta.glob('@/assets/presets/*.json');

    let promises = [];
    for (let path in presets)
      promises.push(presets[path]());

    return Promise.all(promises);
  }

  // let presetList = readPresets();
  let presetList = ref<Array<string>>([]);
  // console.log(presetList);

  onMounted(() => {
    workbook.value.addNewLayer();

    let presets = readPresets();
    presets.then((data) => {
      if (data instanceof Array) {
        data.forEach((item) => {
          const preset: Preset = item;
          presetList.value.push(preset.name);
        });
      }
    });


    // presetList.value = readPresets();
    // console.log('after readPresets');
    // console.log(presetList);


    let layer = new Layer();
    layer.offset = 4;
    layer.rhythm = [4, 12];
    layer.lineStyle = {
      style: 'solid',
      width: 1,
      color: '#555555'
    }

    workbook.value.addLayer(layer);
  });
</script>

<style>
  .workbook-advanced-drawer .v-expansion-panel-text__wrapper {
    padding: 0 !important;
  }
</style>
