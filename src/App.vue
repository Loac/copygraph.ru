<template>
  <v-layout>
    <v-app-bar title="copygraph.ru">
      <template v-slot:append>
        <router-link to="/">
          <v-btn prepend-icon="mdi-home-roof">Home</v-btn>
        </router-link>
        <router-link to="/contacts">
          <v-btn prepend-icon="mdi-ab-testing" title="">Copybook</v-btn>
        </router-link>
        <v-btn prepend-icon="mdi-align-vertical-distribute">Worksheet</v-btn>
      </template>
    </v-app-bar>
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <router-view />
    </v-main>
    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script lang="ts" setup>
  //
</script>
