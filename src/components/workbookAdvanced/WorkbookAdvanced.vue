<template>
  <div class="area">
    <div class="workbook">
      <div class="page">
        <div class="worksheet">
          <div
            v-for="(layer, index) in workbook?.layers"
            class="layer"
            :style="layerStyle(layer.offset)"
            :key="index"
          >
            <div class="bar" v-for="index in 10" :key="index">
              <div
                v-for="(offset, index) in layer.rhythm"
                class="line"
                :style="lineStyle(offset, layer.lineStyle)"
                :key="index"
              ></div>
            </div>
          </div>
<!--          <div class="layer" :style="layerStyle(rhythm2Delay)">-->
<!--            <div class="bar" v-for="index in 10" :key="index">-->
<!--              <div class="line2" v-for="(beat, index) in rhythm2" :style="lineStyle(beat)" :key="index"></div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Workbook } from "@/components/copygraph/WorkbookAdvanced";

  let fractionHeight: number = 2;

  defineProps({
    workbook: Workbook
  });
  
  // Равный интервал.
  // let rhythmDelay: number = 4;
  // let rhythm: Array<number> = [6,2,2,2,2];
  // let rhythm2Delay: number = 2;
  // let rhythm2: Array<number> = [2, 12];

  // С уменьшенный интервал.
  // let rhythmDelay: number = 3;
  // let rhythm: Array<number> = [5,2,2,2,2];
  // let rhythm2Delay: number = 1;
  // let rhythm2: Array<number> = [1, 12];

  // С увеличенный интервал.
  // let rhythmDelay: number = 6;
  // let rhythm: Array<number> = [8,2,2,2,2];
  // let rhythm2Delay: number = 4;
  // let rhythm2: Array<number> = [4, 12];

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
  import {LineStyle} from "@/components/copygraph/Copygraph";



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
