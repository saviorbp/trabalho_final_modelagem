<template>
  <v-snackbar
    :color="color"
    :timeout="timer"
    v-model="showSnackbar"
    location="right"
  >
    <div class="d-flex align-center ga-2">
      <v-icon size="30">{{ icon }}</v-icon>
      <p class="text-subtitle-1">
        {{ message }}
      </p>
    </div>
  </v-snackbar>
</template>

<script>
export default {
  name: "snackbar",
  data() {
    return {
      showSnackbar: false,
      message: "",
      color: "success",
      icon: "mdi-check",
      timer: 3000,
    };
  },
  watch: {
    $route() {
      if (this.$route.query.message)
        this.show({
          message: this.$route.query.message,
          color: this.$route.query.color,
          timer: this.$route.query.timer,
          icon: this.$route.query.icon,
        });
    },
  },
  methods: {
    show(data) {
      this.message = data.message || 'missing "message".';
      this.color = data.color || "success";
      this.timer = data.timer || 3000;
      this.icon = data.icon || "mdi-check";
      this.showSnackbar = true;
    },
  },
};
</script>
