<template>
  <div class="area">
    <div class="copybook">
      <div class="pages">
        <div class="page" v-for="(page, index) in copybook.pages" :key="index">
          <div class="worksheet">
            <div class="lines">
              <div class="line" v-for="(line, index) in page.lines" :style="line.style" :key="index"></div>
            </div>
            <div class="slashes">
              <div class="slash" v-for="(slash, index) in page.slashes" :style="slash.style" :key="index"></div>
            </div>
            <div class="phrases">
              <div class="phrase" v-for="(phrase, index) in page.phrases" :style="phrase.style" :key="index">
                <div class="entries">
                  <div class="entry" v-for="(entry, index) in phrase.entries" :style="entry.style" :key="index">{{ entry.content }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CopybookJson from "@/assets/copybook.json";
  import type { CopybookData } from '@/components/copybook/CopybookData';
  import { Copybook, CopybookBuilder } from '@/components/copybook/Copybook';

  let data: CopybookData = CopybookJson;
  let builder: CopybookBuilder = new CopybookBuilder();
  let copybook: Copybook = builder.build(data);
</script>

<style>

</style>
