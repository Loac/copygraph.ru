<template>
    <v-card variant="flat">
        <v-card-text>
            <v-select
                v-model="copygraph.activePresetName"
                label="Preset"
                item-title="name"
                variant="underlined"
                hide-details
                :items="listPreset"
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
            <v-btn
                rounded="xs"
                size="small"
                variant="text"
                text="Download"
                color="blue"
                prepend-icon="mdi-download"
                @click="downloadPreset()"
            />
            <v-btn
                rounded="xs"
                size="small"
                variant="text"
                text="Load"
                color="blue"
                prepend-icon="mdi-upload"
                @click="uploadPresetDialog()"
            />
            <v-file-input
                v-model="selectFile"
                id="uploadPreset"
                accept=".json"
                class="d-none"
                @change="uploadPreset"
            />
        </v-card-actions>
    </v-card>

    <v-snackbar v-model="presetSaveSnackbar" :timeout="3000">
        Preset are saved in cookies and will be available only you.
    </v-snackbar>
    <v-snackbar v-model="presetParseError" color="red" :timeout="3000">
        <div class="text-center">Wrong preset format.</div>
    </v-snackbar>
</template>

<script setup lang="ts">
    import { ModelRef, onMounted, ref } from "vue";
    import { Copygraph } from "@/components/copygraph/Copygraph";
    import { download } from "@/components/copygraph/Utils";
    import { useCookies } from "vue3-cookies";

    const copygraph:ModelRef<Copygraph> = defineModel({ required: true });
    const { cookies } = useCookies();
    const presetSaveSnackbar = ref(false);
    const presetParseError = ref(false);
    const selectFile = ref(undefined);
    const listPreset = ref(['']);

    const savePreset = (): void => {
        try {
            copygraph.value.savePreset('[Custom]');
            cookies.set('preset', copygraph.value.exportPresetToJson('[Custom]'));
            presetSaveSnackbar.value = true;
            listPreset.value = copygraph.value.listPreset();
        } catch (e) {
            console.log(e);
        }
    }

    const downloadPreset = (): void => {
        download(copygraph.value.extractPreset('[Custom]'), 'preset.json');
    }

    const uploadPresetDialog = (): void => {
        let element: HTMLElement | null = document.getElementById("uploadPreset");
        if (null != element) {
            element.click()
        }
    }

    const uploadPreset = (): void => {
        if (null == selectFile.value) {
            return;
        }

        const reader = new FileReader();
        reader.readAsText(selectFile.value[0]);
        reader.onload = () => {
            if (typeof reader.result == 'string'
                && !copygraph.value.acceptPresetFromJson(reader.result)) {
                presetParseError.value = true;
            }
            selectFile.value = undefined;
        }
    }

    const loadPreset = (): void => {
        copygraph.value.addPresetFromData(cookies.get('preset'));
    }

    /**
     * Костыль `workbook.fractionHeight`. Не понимаю, как еще
     * заставить Vue перерисовать компонент.
     */
    const acceptPreset = (presetName: string): void => {
        copygraph.value.workbook.fractionHeight = 1;
        copygraph.value.acceptPresetByName(presetName);
    }

    onMounted(() => {
        new Promise(() => {
            copygraph.value.buildPresets().then((): void => {
                loadPreset();
                copygraph.value.workbook.fractionHeight = 1;
                copygraph.value.acceptFirstPreset();
                listPreset.value = copygraph.value.listPreset();
            });
        });
    });
</script>
