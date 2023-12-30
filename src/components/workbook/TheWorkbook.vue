<template>
  <div class="area">
    <div class="workbook">
      <div class="page">
        <div class="worksheet">
          <div class="lines">

            <div v-for="index in lineCount"
                 class="fence"
                 :key="index"
                 :style="style">
              <div class="fractions">
                <div v-for="index in (fence.fractions * 1)" class="fraction" :key="index"></div>
              </div>
              <div class="main"></div>
              <div class="base"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { Fence } from "@/components/workbook/Fence";

  export default defineComponent({
    props: {
      lineCount: {
        default: 5,
        type: Number
      },
      style: {
        type: Object
      },
      fence: {
        default: new Fence(),
        type: Fence
      }
    },
    computed: {
      cssFenceHeight: function (): string {
        return this.fence.fenceHeight + "mm"
      },
      ddd: function (): Fence {
        return this.fence;
      }
    }
  });
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

    .fence {
      max-height: v-bind('fence.fenceHeightMm()');
      margin: v-bind('fence.fenceMarginMm()') 0;
      position: relative;
      overflow: hidden;

      &:first-child {
        margin-top: 0;
      }

      .main {
        border-bottom: 1px solid red;
        border-top: 1px solid red;
        background: rgba(0, 0, 0, .03);
        align-items: center;
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 100;
      }

      .base {
        border-top: v-bind('fence.baseBorderWidthPx()') v-bind('fence.baseBorderStyle') v-bind('fence.baseBorderColor');
        border-bottom: v-bind('fence.baseBorderWidthPx()') v-bind('fence.baseBorderStyle') v-bind('fence.baseBorderColor');
        height: calc(v-bind('fence.baseHeightMm()') + 1px);
        top: v-bind('fence.baseTopMm()');

        width: 100%;
        background: rgba(0, 0, 0, 0.1);
        z-index: 90;
        position: absolute;
      }

      .fractions {
        position: absolute;
        z-index: 80;
        height: 100%;
        width: 100%;
      }

      .fraction {
        border-top: 1px solid blue;
        height: v-bind('fence.fractionHeightMm()');
      }
    }
  }
</style>
