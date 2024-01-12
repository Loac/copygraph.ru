<template>
    <div class="area-wrapper">
        <div class="area">
            <div class="workbook">
                <div class="page" :style="page.style">
                    <div class="worksheet">
                        <div v-for="(layer, index) in page.worksheet.layers" class="layer" :class="layer.class" :style="layer.style" :key="index">
                            <div v-for="(bar, index) in layer.bars" class="bar" :style="bar.style" :key="index">
                                <div v-for="(line, index) in bar.lines" class="line" :style="line.style" :key="index"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Workbook } from "@/components/copygraph/Copygraph";
    import { computed } from "vue";

    const props = defineProps({
        workbook: {
            required: true,
            type: Workbook
        }
    });

    const page = computed({
        get() {
            return props.workbook.render();
        },
        set() {
        }
    });
</script>
