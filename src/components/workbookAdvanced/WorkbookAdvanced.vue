<template>
  <div class="area">
    <div class="workbook">
      <div class="page">
        <div class="worksheet">
          <div
            v-for="(layer, index) in workbook.layers"
            class="layer"
            :style="workbook.layerStyle(layer.offset)"
            :key="index"
          >
            <template v-if="layer.visible">
              <div class="bar" v-for="index in workbook.lineCount()" :key="index">
                <div
                  v-for="(offset, index) in layer.rhythm"
                  class="line"
                  :style="workbook.lineStyle(offset, layer.lineStyle)"
                  :key="index"
                ></div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Workbook } from "@/components/copygraph/Copygraph";

  defineProps({
    workbook: {
      required: true,
      type: Workbook
    }
  });
</script>

<script lang="ts">
  export function px(value: number):string {
    return value + 'px';
  }

  export function mm(value: number):string {
    return value + 'mm';
  }
</script>

<style scoped>
  .workbook {
    .area * {
      box-sizing: border-box;
    }

    .page {
      background: white;
      position: relative;
      box-shadow: var(--cg-page-shadow);
      width: v-bind('mm(workbook.pageWidth)');
      height: v-bind('mm(workbook.pageHeight)');
      padding: v-bind('mm(workbook.pagePadding)');
    }

    .worksheet {
      position: relative;
      border: 0 solid #ddd;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }

    .layer {
      position: absolute;
      width: 100%;
    }

    .bar:nth-child(1n) {
      background: rgba(0, 200, 0, .0);
    }
    .bar:nth-child(2n) {
      background: rgba(200, 0, 0, .0);
    }
  }
</style>
