<template>

  <TheWorkbook
    :line-count="count"
    :style="style"
    :fence="fence"
  />

  <v-navigation-drawer location="right">
    <v-list>
      <v-list-item title="Navigation drawer"></v-list-item>

      <v-form @submit.prevent>
        <v-text-field
          v-model.number="count"
          label="Count"
          type="number"
        ></v-text-field>
        <v-text-field
          v-model="fence.fenceHeight"
          label="Fence height"
          type="number"
          @input="fence.update()"
        ></v-text-field>
        <v-text-field
          v-model="fence.fenceMargin"
          label="Fence space"
          type="number"
          :rules="rules"
          @input="fence.update()"
        ></v-text-field>
        <v-text-field
          v-model="fence.fractions"
          label="Fractions"
          type="number"
          @input="fence.update()"
        ></v-text-field>
<!--        <v-color-picker></v-color-picker>-->



        <v-text-field
          v-model="fence.basePosition"
          label="Base position"
          type="number"
          @input="fence.update()"
        ></v-text-field>
        <v-text-field
          v-model="fence.baseCoverage"
          label="Base coverage"
          type="number"
          @input="fence.update()"
        ></v-text-field>

        <v-btn type="submit" block class="mt-2" @click="someMethod">Submit</v-btn>
      </v-form>
    </v-list>
  </v-navigation-drawer>

</template>

<script lang="ts">
  import {defineComponent, ref} from 'vue'
  import TheWorkbook from "@/components/workbook/TheWorkbook.vue";
  import {Fence} from "@/components/workbook/Fence";

  export default defineComponent({
    components: {
      TheWorkbook
    },
    props: {
      blah: {
        default: "Blah",
        type: String
      },
    },
    mounted: function() {
      this.root = document.documentElement;
    },
    methods: {
      someMethod() {
        // this.count++;
        // this.lineHeight = 50;
      },
      someMethod2() {
        // if (this.lineHeight > 50)
        //   this.lineHeight = 50;
      }
    },
    computed: {
      style: function (): object {
        return {
          height: this.lineHeight + "mm"
        }
      },
      cssFenceHeight: function (): string {
        return this.fenceHeight + "mm"
      },
      // height: {
      //   get(): string {
      //     return this.blah2 + "mm";
      //   },
      //   set(value: string): void {
      //     this.blah2 = value;
      //   }
      // }
    },
    data() {
      return {
        rules: [
          // (value: number) => {
          //   if (value > 1 && value < 50) {
          //     return true;
          //   }
          //   return "Wrong value";
          // },
          (value: number) => (value > 1 && value <= 50) || "Wrong value"

        ],
        blah2: "blah2",
        root: document.documentElement
      }
    },
    setup(props, ctx) {

      let count = ref(5);
      let lineHeight = ref(50);
      let lineCount = count.value;
      let fenceHeight = ref(10);

      let fence = ref(new Fence());
      fence.value.update();

      return { fenceHeight, count, lineCount, lineHeight, fence }
    },
  })
</script>

<style>
  .bbb {
    background: red;
    height: v-bind(cssFenceHeight);
  }
</style>
