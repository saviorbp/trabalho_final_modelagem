import { defineStore } from "pinia";
import vuetify from '@/plugins/vuetify'

interface Snack {
  message: string;
  color: string;
  timer: number;
  icon: string;
}

interface SnackObject {
  [key: string]: Snack;
}

interface State {
  drawer: null | boolean;
  theme: string;
}

export const useGlobalStore = defineStore({
  id: "global",
  persist: true,
  state: (): State => ({
    drawer: null,
    theme: vuetify.theme.global.name.value,
  }),
  getters: {
    IS_MOBILE(): boolean {
      return vuetify.display.mobile._object.mobile;
    },
    IS_DARK(): boolean {
      return vuetify.theme.global.current.value.dark;
    },
  },
  actions: {
    TOGGLE_THEME(): void {
      vuetify.theme.global.name.value = vuetify.theme.global.current.value.dark
        ? "light"
        : "dark";
      this.theme = vuetify.theme.global.name.value;
    },
    GET_SNACK_OBJECT(code: string): Snack {
      const obj: SnackObject = {
        "401": {
          message: 'Não autorizado!',
          color: "red",
          timer: 3000,
          icon: "mdi-alert"
        },
        "404": {
          message: 'Nenhuma informação encontrada!',
          color: "blue",
          timer: 3000,
          icon: "mdi mdi-cloud-search"
        },
      }

      const defaultSnack: Snack = {
        message: 'Erro!',
        color: "red",
        timer: 3000,
        icon: "mdi-alert"
      }

      return obj[code] ? obj[code] : defaultSnack;
    },
  }
});