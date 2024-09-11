<template>
  <v-card>
    <v-row v-if="btn || nome" no-gutters class="pa-2">
      <v-col cols="2">
        <p class="text-h5 text-center">{{ nome }}</p>
      </v-col>
      <v-col cols="10" class="d-flex justify-end">
        <div v-for="item in btn" :key="item.name">
          <v-tooltip :text="item.tooltip" visible-on="hover">
            <template v-slot:activator="{ props }">
              <v-icon
                v-if="item.variant === 'icon'"
                @click="funcBtn(item.name)"
                v-bind="props"
                :icon="item.icon"
                :color="item.color"
                :class="item.class"
              >
              </v-icon>
              <v-btn
                v-else-if="item.variant"
                v-bind="props"
                @click="funcBtn(item.name)"
                :variant="item.variant"
                :prepend-icon="item.icon"
                :color="item.color"
                :text="item.name"
                :class="item.class"
              >
              </v-btn>
              <v-btn
                v-else
                v-bind="props"
                @click="funcBtn(item.name)"
                :prepend-icon="item.icon"
                :color="item.color"
                :text="item.name"
                :class="item.class"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-data-table-server
      v-model="selects"
      v-model:items-per-page="itemsPerPage"
      :no-data-text="message"
      :items-per-page-options="itemsPerPageOptions"
      :headers="headers"
      :items="items"
      :items-length="totalItems"
      :loading="loading"
      :show-select="selected"
      :sort-by="sortBy"
      @update:options="loadItems"
      :key="tableKey"
    >
      <template
        v-for="(header, index) in headers"
        v-slot:[`item.${header.key}`]="{ item }"
        :key="index"
      >
        <template v-if="$slots[header.key]">
          <slot :name="header.key" v-bind="{ item }"></slot>
        </template>
        <template v-else>
          <v-tooltip
            v-if="header.tooltip"
            :text="item[header.key] ?? '-' "
            visible-on="hover"
          >
            <template v-slot:activator="{ props }">
              <p
                v-bind="props"
                style="
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  max-width: 150px;
                "
              >
                {{ item[header.key] ?? "-" }}
              </p>
            </template>
          </v-tooltip>
          <span v-else>
            {{ item[header.key] ?? "-" }}
          </span>
        </template>
      </template>
    </v-data-table-server></v-card
  >
</template>

<script>
export default {
  name: "tableComponent",
  props: {
    headers: Array,
    items: Array,
    totalItems: Number,
    message: String,
    nome: String,
    btn: Array,
    loading: Boolean,
    tableKey: Number,
    selected: Boolean,
    sortBy: Array,
  },
  data() {
    return {
      itemsPerPageOptions: [
        {
          title: "5",
          value: 5,
        },
        {
          title: "10",
          value: 10,
        },
        {
          title: "15",
          value: 15,
        },
        {
          title: "Todos",
          value: 0,
        },
      ],
      itemsPerPage: 5,
      selects: [],
    };
  },
  watch: {
    selects() {
      this.emitSelects();
    },
  },
  methods: {
    funcBtn(name) {
      this.$emit("funcBtn", name);
    },
    loadItems({ page, itemsPerPage, sortBy }) {
      this.$emit("update:options", { page, itemsPerPage, sortBy }, this.nome);
    },
    emitSelects() {
      this.$emit("selects", this.selects);
    },
  },
};
</script>