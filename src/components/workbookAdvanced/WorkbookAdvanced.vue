<template>
  <div class="area">
    <div class="workbook">
      <div class="page">
        <div class="worksheet">
          <div
            v-for="(layer, index) in workbook.layers"
            class="layer"
            :style="layerStyle(layer.offset)"
            :key="index"
          >
            <template v-if="layer.visible">
              <div class="bar" v-for="index in 10" :key="index">
                <div
                  v-for="(offset, index) in layer.rhythm"
                  class="line"
                  :style="lineStyle(offset, layer.lineStyle)"
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
  import { Workbook } from "@/components/copygraph/WorkbookAdvanced";

  let fractionHeight: number = 2;

  defineProps({
    workbook: {
      required: true,
      type: Workbook
    }
  });


  const layerStyle = (offset: number) => {
    return {
      marginTop: (fractionHeight * offset - fractionHeight) * -1 + 'mm'
    }
  }

  const lineStyle = (offset: number, lineStyle: LineStyle) => {
    return {
      height: fractionHeight + 'mm',
      marginTop: (fractionHeight * offset - fractionHeight) + 'mm',
      borderTop: lineStyle.width + 'px ' + lineStyle.style + ' ' + lineStyle.color
    }
  }
</script>

<script lang="ts">
  import { LineStyle } from "@/components/copygraph/Copygraph";
</script>

<style scoped>
  .workbook {
    .area * {
      box-sizing: border-box;
    }

    .page {
      position: relative;
      background: white;
      box-shadow: var(--cg-page-shadow);
      height: var(--cg-page-height);
      padding: var(--cg-page-indent);
      width: var(--cg-page-width);
    }

    .worksheet {
      position: relative;
      border: 1px solid #ddd;
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
