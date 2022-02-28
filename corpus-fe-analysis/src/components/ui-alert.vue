<template>
  <v-dialog v-model="value" :width="$vuetify.breakpoint.mdAndUp ? '40vw' : '90vw'">
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text class="text-center text--primary">
        <v-icon color="warning" size="5rem">mdi-alert-circle-outline</v-icon>
        <p class="headline mt-3">{{ title }}</p>
        <p class="subtitle-1">{{ subtitle }}</p>
      </v-card-text>
      <v-card-actions class="pb-12">
        <v-spacer></v-spacer>
        <v-btn
          class="mx-3 subtitle-1"
          color="info"
          @click="
            $emit('input', false);
            $emit('ok');
          "
          >是</v-btn
        >
        <v-btn class="mx-3 subtitle-1" color="error" @click="$emit('input', false)">否</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ui-alert',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '您是否確定執行此動作？',
    },
    subtitle: {
      type: String,
      default: '確認後將離開此畫面。',
    },
  },

  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>
