<template>
  <v-form v-model="valid" ref="form" @submit.prevent="submitForm">
    <v-row no-gutters v-for="(row, index) in rows" :key="index">
      <v-col
        v-for="(field, index) in row.fields"
        :key="index"
        :cols="field.cols || 12"
        :md="field.md || 12"
      >
        <v-text-field
          v-if="
            field.type === 'text' ||
            field.type === 'email' ||
            field.type === 'number'
          "
          v-model="values[field.name]"
          :label="field.label"
          :hint="field.hint"
          :rules="field.rules"
          :density="field.density || 'comfortable'"
          :type="field.type"
          :class="field.class"
          :disabled="field.disabled"
          :readonly="field.readonly"
          :loading="loading"
        >
          <template
            v-for="slot in field.slots"
            v-slot:[slot.position]="slotProps"
          >
            <slot :name="slot.name" v-bind="slotProps"></slot>
          </template>
        </v-text-field>
        <v-text-field
          v-if="field.type === 'password'"
          v-model="values[field.name]"
          :label="field.label"
          :hint="field.hint"
          :rules="field.rules"
          :class="field.class"
          :density="field.density || 'comfortable'"
          :disabled="field.disabled"
          :readonly="field.readonly"
          :loading="loading"
          :append-inner-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
          :type="mostrarSenha ? 'text' : 'password'"
          @click:append-inner="mostrarSenha = !mostrarSenha"
          @click:append="mostrarSenha = !mostrarSenha"
        >
          <template
            v-for="slot in field.slots"
            v-slot:[slot.position]="slotProps"
          >
            <slot :name="slot.name" v-bind="slotProps"></slot>
          </template>
        </v-text-field>
        <v-select
          v-if="field.type === 'select'"
          v-model="values[field.name]"
          :label="field.label"
          :hint="field.hint"
          :density="field.density || 'comfortable'"
          :rules="field.rules"
          :items="field.items"
          :item-props="itemProps"
          :class="field.class"
          :disabled="field.disabled"
          :readonly="field.readonly"
          :loading="loading"
        >
          <template
            v-for="slot in field.slots"
            v-slot:[slot.position]="slotProps"
          >
            <slot :name="slot.name" v-bind="slotProps"></slot>
          </template>
        </v-select>
        <v-autocomplete
          v-if="field.type === 'autocomplete'"
          v-model="values[field.name]"
          :label="field.label"
          :hint="field.hint"
          :density="field.density || 'comfortable'"
          :rules="field.rules"
          :items="field.items"
          :item-props="itemProps"
          :class="field.class"
          :disabled="field.disabled"
          :readonly="field.readonly"
          :loading="loading"
        >
          <template
            v-for="slot in field.slots"
            v-slot:[slot.position]="slotProps"
          >
            <slot :name="slot.name" v-bind="slotProps"></slot>
          </template>
        </v-autocomplete>
        <v-textarea
          v-if="field.type === 'textArea'"
          v-model="values[field.name]"
          :label="field.label"
          :hint="field.hint"
          :rules="field.rules"
          :class="field.class"
          :rows="field.rows"
          :density="field.density || 'comfortable'"
          :disabled="field.disabled"
          :readonly="field.readonly"
          :loading="loading"
        >
          <template
            v-for="slot in field.slots"
            v-slot:[slot.position]="slotProps"
          >
            <slot :name="slot.name" v-bind="slotProps"></slot>
          </template>
        </v-textarea>
        <v-checkbox
          v-if="field.type === 'boolean'"
          v-model="values[field.name]"
          :label="field.label"
          :rules="field.rules"
          :class="field.class"
          :disabled="field.disabled"
          :readonly="field.readonly"
          :loading="loading"
        >
          <template
            v-for="slot in field.slots"
            v-slot:[slot.position]="slotProps"
          >
            <slot :name="slot.name" v-bind="slotProps"></slot>
          </template>
        </v-checkbox>
        <div v-if="field.type || 'slot'">
          <slot :name="field.name" v-bind="slotProps"></slot>
        </div>
      </v-col>
    </v-row>
    <v-btn
      type="submit"
      :class="button.class"
      @click.prevent="submitForm"
      :height="button.height || '50px'"
      :width="button.width || '100%'"
      :append-icon="button.appendIcon"
      :color="button.color"
      :disabled="loading"
      >{{ button.text }}</v-btn
    >
  </v-form>
</template>

<script>
export default {
  props: {
    rows: {
      type: Array,
      required: true,
    },
    button: {
      type: Array,
      default: () => ({
        text: "salvar",
        class: "",
      }),
    },
    key: {
      type: Number,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: false,
      values: {},
      mostrarSenha: false,
    };
  },
  watch: {
    // $route() {
    //   this.loading
    // },
    key() {
      this.preencherCampos();
    },
  },
  created() {
    this.preencherCampos();
  },
  methods: {
    preencherCampos() {
      this.rows.forEach((field) => {
        field.fields.forEach((f) => {
          this.values[f.name] = f.value || null;
        });
      });
    },
    submitForm() {
      if (this.valid) {
        this.$emit("submit", this.values);
      } else {
        this.$refs.form.validate();
        this.$root.snackbar.show({
          message: `Preencha todos os campos obrigatórios`,
          color: "error",
          timer: 3000,
          icon: "mdi-alert-circle",
        });
      }
    },
    itemProps(item) {
      return {
        value: item,
        title: item.name,
      };
    },
  },
};
</script>