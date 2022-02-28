<template>
  <v-container fluid style="min-height: 150%; padding: 0 15vw;">
    <v-form ref="form">
      <h2 v-if="fileMode">分析檔案或資料夾：</h2>
      <kbd v-if="fileMode" class="mb-8">{{ data.file.join('\n') }}</kbd>
      <!-- Age -->
      <h2 v-if="!fileMode">年齡層（可複選）：</h2>
      <v-select
        v-if="!fileMode"
        v-model="data.ages"
        :items="ages"
        item-text="label"
        item-value="value"
        label="選擇年齡層"
        chips
        multiple
      >
        <v-list-item slot="prepend-item" ripple @click="toggle('ages')">
          <v-list-item-action>
            <v-icon :color="data.ages.length > 0 ? 'indigo darken-4' : ''">{{
              icon('ages')
            }}</v-icon>
          </v-list-item-action>
          <v-list-item-title>全選</v-list-item-title>
        </v-list-item>
        <v-divider slot="prepend-item" class="mt-2" />
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 10">
            <span>{{ item.label }}</span>
          </v-chip>
          <span v-if="index === 10" class="grey--text caption"
            >(+{{ ages.length - 10 }} others)</span
          >
        </template>
      </v-select>

      <!-- Sex -->
      <h2 v-if="!fileMode">性別：</h2>
      <v-radio-group v-if="!fileMode" row v-model="data.sex">
        <v-radio
          v-for="sx in sex"
          :key="sx.label"
          class="mb-3"
          :label="sx.label"
          :value="sx.value"
        ></v-radio>
      </v-radio-group>

      <!-- Speaker -->
      <h2>分析對象：</h2>
      <v-radio-group row v-model="data.speaker">
        <v-radio
          v-for="speak in speaker"
          :key="speak.label"
          class="mb-3"
          :label="speak.label"
          :value="speak.value"
        ></v-radio>
      </v-radio-group>

      <!-- Context -->
      <h2 v-if="!fileMode">情境（可複選）：</h2>
      <v-select
        v-if="!fileMode"
        v-model="data.context"
        :items="context"
        item-text="label"
        item-value="value"
        label="選擇情境"
        chips
        multiple
      >
        <v-list-item slot="prepend-item" ripple @click="toggle('context')">
          <v-list-item-action>
            <v-icon :color="data.context.length > 0 ? 'indigo darken-4' : ''">{{
              icon('context')
            }}</v-icon>
          </v-list-item-action>
          <v-list-item-title>全選</v-list-item-title>
        </v-list-item>
        <v-divider slot="prepend-item" class="mt-2" />
      </v-select>

      <!-- Indicator -->
      <h2>語言指標（可複選）：</h2>
      <v-select
        v-model="data.indicator"
        :items="indicator"
        item-text="label"
        item-value="value"
        label="選擇語言指標"
        chips
        multiple
      >
        <v-list-item slot="prepend-item" ripple @click="toggle('indicator')">
          <v-list-item-action>
            <v-icon :color="data.indicator.length > 0 ? 'indigo darken-4' : ''">{{
              icon('indicator')
            }}</v-icon>
          </v-list-item-action>
          <v-list-item-title>全選</v-list-item-title>
        </v-list-item>
        <v-divider slot="prepend-item" class="mt-2" />
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 10">
            <span>{{ item.label }}</span>
          </v-chip>
          <span v-if="index === 10" class="grey--text caption"
            >(+{{ indicator.length - 10 }} others)</span
          >
        </template>
      </v-select>
    </v-form>
    <!-- DEBUG MSG -->
    <!-- {{ data }} -->
    <!-- {{ data.ages }} -->
    <!-- {{ data.sex }} -->
    <!-- {{ data.context }} -->
    <!-- {{ data.speaker }} -->
    <!-- {{ data.indicator }} -->

    <v-btn color="primary" :loading="loading" @click="$emit('next', res)" large>繼續</v-btn>
    <v-btn v-if="fileMode" class="ml-3" color="warning" @click="alert = true" large
      >捨棄選取檔案或資料夾，回到語料分析</v-btn
    >

    <UiAlert
      v-model="alert"
      title="確定要回到語料分析頁面嗎？"
      subtitle="您目前的分析資料將不會被保留。"
      @ok="$router.push('/analysis/none')"
    ></UiAlert>

    <br v-for="n in 15" />

    <v-overlay v-model="loading" width="50%">
      <v-btn text :loading="true"></v-btn>
    </v-overlay>
  </v-container>
</template>

<script>
import json from '@/util/step1.json';
import UiAlert from '@/components/ui-alert';

export default {
  name: 'FileFilter',

  components: {
    UiAlert,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    fileMode: {
      type: Boolean,
    },
  },

  data() {
    return {
      load: 1,
      ages: json.ages,
      sex: json.sexs,
      speaker: json.speakers,
      context: json.contexts,
      indicator: json.indicator,
      alert: false,
    };
  },

  computed: {
    res() {
      if (this.fileMode) {
        delete this.data.ages;
        delete this.data.sex;
        delete this.data.context;
      }
      return this.data;
    },
  },

  methods: {
    toggle(item) {
      this.$nextTick(() => {
        if (this.selectAll(item)) {
          this.data[item] = [];
        } else {
          this.data[item] = this[item].map(v => v.value);
        }
      });
    },
    selectAll(item) {
      return this.data[item].length === this[item].length;
    },
    selectSome(item) {
      return this.data[item].length > 0 && !this.selectAll(item);
    },
    icon(item) {
      if (this.selectAll(item)) return 'mdi-close-box';
      if (this.selectSome(item)) return 'mdi-minus-box';
      return 'mdi-checkbox-blank-outline';
    },
  },
};
</script>

<style lang="css" scoped></style>
