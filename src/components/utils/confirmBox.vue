<template>
    <v-dialog v-model="dialog" width="auto">
      <v-card class="pa-4 d-flex flex-column align-center ga-4" >
        <div class="d-flex align-center ga-2">
            <v-icon color="yellow">mdi mdi-alert</v-icon>
            <p class="text-h5">{{ message }}</p>
        </div>
        <div class="d-flex align-center ga-2">
            <v-btn @click="confirm(false)" color="red" width="50%" variant="tonal">Cancelar</v-btn>
            <v-btn @click="confirm(true)" color="white" width="50%" variant="tonal">Confirmar</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: '',
        resolve: null,
        dialog: false,
      };
    },
    methods: {
      show(message) {
        this.message = message;
        this.dialog = true;
        return new Promise((resolve) => {
          this.resolve = resolve;
        });
      },
      confirm(value) {
        this.dialog = false;
        if (this.resolve) {
          this.resolve(value);
        }
      },
    },
  };
  </script>
  
  <style>
 
  </style>
  