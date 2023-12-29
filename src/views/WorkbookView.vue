<template>

  <TheWorkbook
    :line-count="count"
    :style="style"
  />

  <v-navigation-drawer location="right">
    <v-list>
      <v-list-item title="Navigation drawer"></v-list-item>

      <v-form @submit.prevent>
        <v-text-field
          v-model="count"
          label="First name"
        ></v-text-field>
        <v-text-field
          v-model="lineHeight"
          :rules="rules"
          @input="someMethod2"
          label="Line height"
          suffix="mm"
        ></v-text-field>

        <v-btn type="submit" block class="mt-2" @click="someMethod">Submit</v-btn>
      </v-form>
    </v-list>
  </v-navigation-drawer>

</template>

<script lang="ts">
  import {defineComponent, ref} from 'vue'
  import TheWorkbook from "@/components/workbook/TheWorkbook.vue";

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
    methods: {
      someMethod() {
        this.count++;
        this.lineHeight = 50;
      },
      someMethod2() {
        if (this.lineHeight > 50)
          this.lineHeight = 50;
      }
    },
    computed: {
      style: function (): object {
        return {
          height: this.lineHeight + "mm"
        }
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
          (value: number) => (value > 1 && value < 50) || "Wrong value"

        ],
        blah2: "blah2",
      }
    },
    setup(props, ctx) {
      let count = ref(5);
      let lineHeight = ref(10);

      return { count, lineHeight }
    },
  })
</script>


<style scoped>

</style>
