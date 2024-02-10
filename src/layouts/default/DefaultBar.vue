<template>
    <v-app-bar>
        <v-app-bar-title>Copygraph – Прописи и линовки для каллиграфии</v-app-bar-title>

        <router-link to="/">
            <v-btn prepend-icon="mdi-align-vertical-distribute">Прописи</v-btn>
        </router-link>
        <router-link to="/about">
            <v-btn prepend-icon="mdi-information-outline">О сайте</v-btn>
        </router-link>
    </v-app-bar>
</template>
<script setup lang="ts">
</script>
