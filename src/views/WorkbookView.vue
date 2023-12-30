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


        <v-menu v-model="menu"  :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" :style="swatchStyle" elevation="0"></v-btn>
          </template>
          <v-card>
            <v-card-text class="pa-0">
              <v-color-picker v-model="color"
                              :hide-inputs="true"
                              :modes="['rgb']"
                              flat />
            </v-card-text>
          </v-card>
        </v-menu>

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
      swatchStyle() {
        const { color } = this
        return {
          backgroundColor: color,
          cursor: 'pointer',
          minWidth: 'var(--v-btn-height)',
        }
      }
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
        root: document.documentElement,
        color: '#1976D2FF',
        mask: '!#XXXXXXXX',
        menu: false,
        picker: true,
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
    width: var(--v-btn-height);
    height: v-bind(cssFenceHeight);
  }
</style>
