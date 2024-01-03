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
              <div class="bar" v-for="index in 10" :key="index">
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
  defineProps({
    workbook: {
      required: true,
      type: Workbook
    }
  });
</script>

<script lang="ts">
  import { LineStyle } from "@/components/copygraph/Copygraph";
  import { StyleValue } from "vue";

  export class Workbook {
    fractionHeight: number = 3;
    pageHeight: number = 297;
    pageWidth: number = 210;
    pagePadding: number = 10;
    pageOrientation: string = 'portrait';
    layers: Array<Layer> = [];

    removeLayer(layer: Layer): void {
      const index: number = this.layers.indexOf(layer);
      if (index !== -1) {
        this.layers.splice(index, 1);
      }
    }

    showLayer(layer: Layer): void {
      const index: number = this.layers.indexOf(layer);
      if (index !== -1) {
        this.layers[index].visible = !this.layers[index].visible;
      }
    }

    newLayer(): Layer {
      const layer: Layer = new Layer();
      layer.offset = 6;
      layer.rhythm = [8,2,2,2,2];
      layer.lineStyle.width = 1;
      layer.lineStyle.style = 'dashed';
      layer.lineStyle.color = '#AAAAAA';
      return layer;
    }

    addNewLayer(): void {
      this.layers.push(this.newLayer());
    }

    addLayer(layer: Layer): void {
      this.layers.push(layer);
    }

    layerStyle(offset: number): StyleValue {
      return {
        marginTop: (this.fractionHeight * offset - this.fractionHeight) * -1 + 'mm'
      }
    }
    lineStyle(offset: number, lineStyle: LineStyle): StyleValue {
      return {
        height: this.fractionHeight + 'mm',
        marginTop: (this.fractionHeight * offset - this.fractionHeight) + 'mm',
        borderTop: lineStyle.width + 'px ' + lineStyle.style + ' ' + lineStyle.color
      }
    }
  }

  /**
   * Слой со строками. Содержит параметры линии, размер отступа и ритм отображения.
   */
  export class Layer {
    visible: boolean = true;
    offset: number = 0;
    rhythm: Array<number> = [];
    lineStyle: LineStyle = new LineStyle();
  }
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
