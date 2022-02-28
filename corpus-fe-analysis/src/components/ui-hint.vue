<template>
  <v-dialog v-model="dialog" width="50%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-on="on" v-bind="attrs">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar color="info" dark>
        <v-toolbar-title>{{ label }}</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="mt-4 text--primary text-body-1" v-html="hint" />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ui-hint',
  props: {
    label: String,
    hint: String,
  },
  data: () => ({
    dialog: false,
  }),
};
</script>
