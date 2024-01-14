<template>
    <Workbook :workbook="copygraph.workbook" />

    <v-navigation-drawer
        location="right"
        class="workbook-advanced-drawer"
        :permanent="true"
        :width="300"
    >
        <v-toolbar>
            <v-btn @click="printToPdf" text="PDF" />
        </v-toolbar>

        <v-expansion-panels
            v-model="panel"
            variant="accordion"
            class="no-padding"
            :multiple="true"
        >
            <v-expansion-panel elevation="0" :aria-expanded="true">
                <v-expansion-panel-title>Preset</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <WorkbookPreset v-model="copygraph" />
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel elevation="0">
                <v-expansion-panel-title>Page</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <WorkbookPage v-model="copygraph" />
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel elevation="0">
                <v-expansion-panel-title>Lines</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <WorkbookLayers v-model="copygraph" />
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel  elevation="0">
                <v-expansion-panel-title>Letters</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-card variant="flat">
                        <v-card-text>
                            <v-select
                                v-model="font"
                                label="Font"
                                variant="underlined"
                                hide-details
                                :items="fontList"
                            />
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { printToPdf } from "@/components/copygraph/Utils";
    import { Copygraph } from "@/components/copygraph/Copygraph";
    import Workbook from "@/components/workbook/Workbook.vue";
    import WorkbookPreset from "@/components/workbook/form/WorkbookPreset.vue";
    import WorkbookPage from "@/components/workbook/form/WorkbookPage.vue";
    import WorkbookLayers from "@/components/workbook/form/WorkbookLayers.vue";

    const copygraph = ref(new Copygraph());
    // Раскрыть первую панель.
    const panel = ref([0]);
</script>
