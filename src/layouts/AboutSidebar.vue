<template>
    <v-navigation-drawer
        location="right"
        class="workbook-advanced-drawer"
        :permanent="true"
        :width="300"
    >
        <v-list>
            <v-list-item>
                <router-link to="/where-to-begin">
                    <v-btn
                        prepend-icon="mdi-draw-pen"
                        variant="text">С чего начать</v-btn>
                </router-link>
            </v-list-item>
            <v-divider />
            <v-list-item>
                <router-link to="/about">
                    <v-btn
                        prepend-icon="mdi-ab-testing"
                        variant="text">Контакты</v-btn>
                </router-link>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
