<template>
  <v-app-bar>
    <v-app-bar-title>copygraph.ru</v-app-bar-title>

    <router-link to="/">
      <v-btn prepend-icon="mdi-home-roof">Home</v-btn>
    </router-link>
    <router-link to="/copybook">
      <v-btn prepend-icon="mdi-ab-testing" title="">Copybook</v-btn>
    </router-link>
    <router-link to="/worksheet">
      <v-btn prepend-icon="mdi-align-vertical-distribute">Worksheet</v-btn>
    </router-link>
  </v-app-bar>
</template>

<script lang="ts" setup>
  //
</script>
