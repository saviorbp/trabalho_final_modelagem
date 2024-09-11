declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '@/plugins/vuetify' {
  import { Vuetify } from 'vuetify'
  const vuetify: Vuetify
  export default vuetify
}

declare module '@/stores/globalStore' {
  export function useGlobalStore(): any
}
