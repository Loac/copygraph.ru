<template>
  <TheWorkbook
    :line-count="count"
    :style="style"
    :fence="fence"
  />

  <v-navigation-drawer location="right">
    <v-list>
      <v-list-item title="Navigation drawer"></v-list-item>

      <NumberSlider
        v-model="count"
        label="Count"
        :min="0"
        :max="5"
        :step="1"
        @input="fenceUpdate"
      ></NumberSlider>

      <NumberSlider
        v-model="fence.fenceHeight"
        label="Fence height"
        :min="10"
        :max="50"
        :step="1"
        @input="fenceUpdate"
      ></NumberSlider>

<!--      <v-text-field-->
<!--        v-model="fence.fenceHeight"-->
<!--        label="Fence height"-->
<!--        type="number"-->
<!--        @input="fence.update()"-->
<!--      ></v-text-field>-->
      <v-text-field
        v-model="fence.fenceMargin"
        label="Fence space"
        type="number"
        :rules="rules"
        @input="fenceUpdate"
      ></v-text-field>

      <v-form @submit.prevent>
        <v-expansion-panels
          variant="accordion"
          :multiple="true">
          <v-expansion-panel elevation="1">
            <v-expansion-panel-title>Fence</v-expansion-panel-title>
            <v-expansion-panel-text>


            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel elevation="1">
            <v-expansion-panel-title>Fractions</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-text-field
                v-model="fence.fractions"
                label="Fractions"
                type="number"
                @input="fence.update()"
              ></v-text-field>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel elevation="1">
            <v-expansion-panel-title>Base</v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="d-flex align-end">
                <v-menu :close-on-content-click="false" :location="'center'">
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      label="Width"
                      variant="underlined"
                      hide-details
                      v-bind="props"
                      v-model="fence.baseBorderWidth"
                      :readonly="true"
                      @input="fence.update()"
                      style="cursor: pointer"
                    ></v-text-field>
                  </template>

                  <v-card>
                    <v-card-text class="pa-5">
                      <v-slider
                        v-model="fence.baseBorderWidth"
                        direction="vertical"
                        :min="0"
                        :max="5"
                        :step="1"
                      ></v-slider>
                    </v-card-text>
                  </v-card>
                </v-menu>

                <v-select
                  label="Style"
                  variant="underlined"
                  hide-details
                  v-model="fence.baseBorderStyle"
                  :items="[{
                      title: 'Dotted',
                      value: 'dotted'
                    }, {
                      title: 'Dashed',
                      value: 'dashed'
                    }, {
                      title: 'Solid',
                      value: 'solid'
                    }]"
                  ></v-select>

                <v-menu :close-on-content-click="false">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" :style="swatchStyle(fence.baseBorderColor)" elevation="0"></v-btn>
                  </template>
                  <v-card>
                    <v-card-text class="pa-0">
                      <v-color-picker v-model="fence.baseBorderColor"
                                      :hide-inputs="true"
                                      :modes="['rgb']"
                                      flat />
                    </v-card-text>
                  </v-card>
                </v-menu>
              </div>

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
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>


        <v-btn type="submit" block class="mt-2" @click="someMethod2">Submit</v-btn>
      </v-form>
    </v-list>
  </v-navigation-drawer>

</template>

<script lang="ts">
  import {defineComponent, ref} from 'vue'
  import TheWorkbook from "@/components/workbook/TheWorkbook.vue";
  import {Fence} from "@/components/workbook/Fence";
  import NumberSlider from "@/components/NumberSlider.vue";

  export default defineComponent({
    components: {
      NumberSlider,
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
      fenceUpdate() {
        this.fence.update();
        console.log("fenceUpdate")
      },
      someMethod2() {
        // if (this.lineHeight > 50)
        //   this.lineHeight = 50;
      },
      swatchStyle(color: string) {
        // const { color } = this
        return {
          backgroundColor: color,
          cursor: 'pointer',
          minWidth: 'var(--v-btn-height)',
        }
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
        root: document.documentElement,
        color: '#1976D2FF',
        menu: false,
        sliderValue: 10
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
