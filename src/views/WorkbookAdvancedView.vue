<template>
  <WorkbookAdvanced :workbook="copygraph.workbook" />

  <v-navigation-drawer
    location="right"
    class="workbook-advanced-drawer"
    :permanent="true"
    :width="300"
  >
    <v-toolbar>
      <v-btn @click="printToPdf" text="Print" />
    </v-toolbar>

    <v-expansion-panels variant="accordion" class="no-padding" :multiple="true">
      <v-expansion-panel elevation="0">
        <v-expansion-panel-title>Preset</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-card variant="flat">
            <v-card-text>
              <v-select
                v-model="copygraph.activePresetName"
                label="Preset"
                item-title="name"
                variant="underlined"
                hide-details
                :items="listPreset()"
                @update:modelValue="acceptPreset"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                rounded="xs"
                size="small"
                variant="text"
                text="Save"
                color="blue"
                prepend-icon="mdi-book-outline"
                @click="savePreset()"
              />
            </v-card-actions>
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
                  v-model="copygraph.workbook.pageWidth"
                  label="Width"
                  variant="underlined"
                  suffix="mm"
                  hide-details
                  :readonly="true"
                  :disabled="true"
                />
                <v-text-field
                  v-model="copygraph.workbook.pageHeight"
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
                  v-model="copygraph.workbook.pagePadding"
                  label="Padding"
                  suffix="mm"
                  :min="0"
                  :max="20"
                  :step="0.1"
                />
                <NumberPicker
                  v-model="copygraph.workbook.fractionHeight"
                  label="Fraction"
                  suffix="mm"
                  :min="1"
                  :max="10"
                  :step="0.01"
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
                @click="copygraph.workbook.addNewLayer()"
              />
            </v-card-actions>
          </v-card>

          <v-card
            v-for="(layer, index) in copygraph.workbook.layers"
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
                @click="copygraph.workbook.showLayer(layer)"
              />
              <v-btn
                rounded="xs"
                size="small"
                prepend-icon="mdi-close-thick"
                color="red-darken-1"
                variant="text"
                text="Remove"
                @click="copygraph.workbook.removeLayer(layer)"
              />
            </v-card-actions>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-navigation-drawer>

    <v-snackbar v-model="presetSaveSnackbar" :timeout="3000">
        Preset are saved in cookies and will be available only you.
    </v-snackbar>
</template>

<script setup lang="ts">
    import WorkbookAdvanced from "@/components/workbookAdvanced/WorkbookAdvanced.vue";
    import WorkbookRhythm from "@/components/workbookAdvanced/form/WorkbookRhythm.vue";
    import LineStyleField from "@/components/LineStyleField.vue";
    import NumberPicker from "@/components/NumberPicker.vue";
    import { onMounted, ref } from "vue";
    import { printToPdf } from "@/components/copygraph/Print";
    import { useCookies } from "vue3-cookies";
    import { Copygraph, Preset } from "@/components/copygraph/Copygraph";

    const { cookies } = useCookies();
    const copygraph = ref(new Copygraph());
    const presetSaveSnackbar = ref(false);

    const savePreset = (): void => {
        try {
            const preset: Preset = copygraph.value.savePreset('[Custom]');
            cookies.set('presets', JSON.stringify([preset]));
            presetSaveSnackbar.value = true;
        } catch (e) {
            console.log(e);
        }
    }

    const loadPreset = (): Array<Preset> => {
        try {
            const presets = JSON.parse(cookies.get("presets"));
            return presets == null ? [] : presets;
        } catch (e) {
            return [];
        }
    }

    const listPreset = (): Array<string> => {
        const list: Array<string> = [];
        copygraph.value.presets.forEach((value) => {
            list.push(value.name);
        });
        return list;
    }

    /**
     * Костыль `workbook.fractionHeight`. Не понимаю, как еще
     * заставить Vue перерисовать компонент.
     */
    const acceptPreset = (presetName: string): void => {
        copygraph.value.workbook.fractionHeight = 1;
        copygraph.value.acceptPreset(presetName);
    }

    onMounted(() => {
        new Promise(() => {
            copygraph.value.buildPresets().then((): void => {
                loadPreset().forEach((preset) => {
                   copygraph.value.addPreset(preset);
                });
                copygraph.value.workbook.fractionHeight = 1;
                copygraph.value.acceptPreset('A4 6x6');
                listPreset();
            });
        });
    });

</script>

<style>
  .workbook-advanced-drawer .v-expansion-panel-text__wrapper {
    padding: 0 !important;
  }
</style>
