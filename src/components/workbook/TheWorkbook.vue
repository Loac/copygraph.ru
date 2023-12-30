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
                <div class="fraction"></div>
                <div class="fraction"></div>
                <div class="fraction"></div>
                <div class="fraction"></div>
                <div class="fraction"></div>
                <div class="fraction"></div>
                <div class="fraction"></div>
                <div class="fraction"></div>
                <div class="fraction"></div>
                <div class="fraction"></div>
                <div class="fraction"></div>
                <div class="fraction"></div>
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

<script setup lang="ts">
  interface Props {
    lineCount: number,
    style: any
  }

  const props = defineProps<Props>()
</script>

<style scoped>

</style>
