<template>
  <v-menu :close-on-content-click="false" :location="'center'">
    <template v-slot:activator="{ props }">
      <v-text-field
        label="Width"
        variant="underlined"
        hide-details
        v-bind="props"
        v-model="model"
        :readonly="true"

        style="cursor: pointer"
      ></v-text-field>
    </template>

    <v-card>
      <v-card-text class="pa-5">
        <v-slider
          v-model="model"
          direction="vertical"
          :min="0"
          :max="5"
          :step="1"
        ></v-slider>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
  import { defineModel } from "vue";
  const model = defineModel();
  console.log(model);
</script>

<!--<script lang="ts">-->
<!--  import { defineComponent } from "vue";-->


<!--  // let vModel = defineModel('value', {-->
<!--  //   required: true,-->
<!--  //   type: Number-->
<!--  // });-->

<!--  export default defineComponent({-->
<!--    props: {-->
<!--      model: {}-->
<!--    },-->
<!--    data () {-->
<!--      console.log(this.model);-->
<!--      return {-->
<!--        content: this.model-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      handleInput (e) {-->
<!--        this.$emit('input', this.content)-->
<!--      }-->
<!--    },-->
<!--    // props: {-->
<!--    //   // value: {-->
<!--    //   //   type: Number,-->
<!--    //   //   required: true,-->
<!--    //   // },-->
<!--    //   //       myMod: {-->
<!--    //   //-->
<!--    //   //   type: Number-->
<!--    //   // },-->
<!--    //   input: {-->
<!--    //     type: Function-->
<!--    //   },-->
<!--    // },-->
<!--  });-->
<!--</script>-->

<style scoped>

</style>
