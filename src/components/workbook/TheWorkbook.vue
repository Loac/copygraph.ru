<template>
  <div class="area">
    <div class="workbook">
      <div class="page">
        <div class="worksheet">
          <div class="lines">
            <div v-for="index in lineCount"
                 class="line"
                 :key="index"
                 :style="style"></div>
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
