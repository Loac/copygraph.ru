<script setup lang="ts">

</script>

<template>
  <v-dialog v-model="saveDialog" width="auto">
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="saveDialogName"
          label="Name"
          variant="underlined"
          style="min-width: 200px"
          hint="Preset are saved in cookies and will be available only you."
          :persistent-hint="true"
        />
      </v-card-text>
      <v-card-actions class="justify-end pr-3">
        <v-btn color="blue" text="Save" @click="savePreset" />
        <v-btn color="red-darken-1" text="Cancel" @click="saveDialog = false" />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="errorDialog" width="auto">
    <v-card>
      <v-card-text>
        Preset already exists
      </v-card-text>
      <v-card-actions class="justify-end pr-3">
        <v-btn color="blue-darken-1" text="Ok" @click="errorDialog = false" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
