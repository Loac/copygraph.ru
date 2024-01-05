<template>
  <WorkbookAdvanced :workbook="workbook"/>

  <v-navigation-drawer
    location="right"
    class="workbook-advanced-drawer"
    :permanent="true"
    :width="300"
  >
    <v-toolbar>
      <v-btn @click="printToPdf" text="Print" />
      <v-btn @click="savePreset" text="Save" />
      <v-btn @click="loadPreset" text="Load" />
    </v-toolbar>

    <v-expansion-panels
      variant="accordion"
      class="no-padding"
      :multiple="true"
    >
      <v-expansion-panel elevation="0">
        <v-expansion-panel-title>Preset</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-card variant="flat">
            <v-card-text>
              <v-select
                v-model="activePreset"
                label="Preset"
                item-title="name"
                variant="underlined"
                :items="presets"
                @update:modelValue="acceptPreset"
              />
            </v-card-text>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>

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
  import {Preset, Workbook} from "@/components/workbookAdvanced/WorkbookAdvanced.vue";
  import WorkbookAdvanced from "@/components/workbookAdvanced/WorkbookAdvanced.vue";
  import WorkbookRhythm from "@/components/workbookAdvanced/form/WorkbookRhythm.vue";
  import {onMounted, ref} from "vue";
  import LineStyleField from "@/components/LineStyleField.vue";
  import NumberPicker from "@/components/NumberPicker.vue";
  import {printToPdf} from "@/components/copygraph/Print";
  import { useCookies } from "vue3-cookies";

  const workbook = ref(new Workbook());
  const presets = ref<Array<Preset>>([]);
  const activePreset = ref('');
  const { cookies } = useCookies();

  const savePreset = (): void => {
    cookies.set('preset', JSON.stringify(presets.value[0]));
  }

  const loadPreset = (): void => {
    let preset = cookies.get("preset");
    console.log(preset);
  }

  const readPresets = async (): Promise<unknown> => {
    const presets = import.meta.glob('@/assets/presets/*.json');
    const promises = [];
    for (let path in presets) {
      promises.push(presets[path]());
    }
    return Promise.all(promises);
  }

  const acceptPreset = (presetName: string): void => {
    const preset: Preset | undefined = presets.value.find((item) => item.name == presetName);
    if (preset != undefined)
      workbook.value.acceptPreset(preset);
  }

  onMounted(() => {
    let presetData = readPresets();
    presetData.then((data) => {
      if (data instanceof Array) {
        data.forEach((item) => {
          const preset: Preset = Preset.fromData(item);
          // console.log(preset.constructor.name);
          // console.log(data);
          // console.log(preset);

          const a: Array<number> = [1,2,3];
          const b: Array<number> = [...a];
          // a.forEach((item) => b.push(item));

          b.push(4);
          console.log(a);
          console.log(b);

          presets.value.push(preset);
        });

      }

      if (presets.value.length > 0) {
        activePreset.value = presets.value[0].name;
        acceptPreset(activePreset.value);
      }
    });
  });
</script>

<style>
  .workbook-advanced-drawer .v-expansion-panel-text__wrapper {
    padding: 0 !important;
  }
</style>
