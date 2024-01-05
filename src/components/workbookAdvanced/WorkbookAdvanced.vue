<template>
  <div class="area">
    <div class="workbook">
      <div class="page" :style="page.style">
        <div class="worksheet">
          <div v-for="(layer, index) in page.worksheet.layers" class="layer" :style="layer.style" :key="index">
            <div v-for="(bar, index) in layer.bars" class="bar" :key="index">
              <div v-for="(line, index) in bar.lines" class="line" :style="line.style" :key="index"></div>
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
    }
  });
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
