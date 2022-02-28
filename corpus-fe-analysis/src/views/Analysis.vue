<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-divider></v-divider>
      <v-stepper-step :complete="step > 1" step="1">選擇分析條件</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="step > 2" step="2">查看分析結果</v-stepper-step>
      <v-divider></v-divider>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <FileFilter @next="step1" :data="data" :loading="loading" :fileMode="file"></FileFilter>
      </v-stepper-content>
      <v-stepper-content step="2">
        <AnalysisResult @restart="restart" @back="step = step - 1" :filename="filename">
          <v-data-table
            v-if="tableItems"
            :headers="headers"
            :items="tableItems"
            hide-default-footer
            disable-pagination
          ></v-data-table>
        </AnalysisResult>
      </v-stepper-content>
    </v-stepper-items>
    <v-snackbar v-model="snackbar" color="error">{{ snackbarText }}</v-snackbar>
  </v-stepper>
</template>

<script>
import FileFilter from '@/components/FileFilter';
import AnalysisResult from '@/components/AnalysisResult';
import chatArgs from '@/util/step1.json';

export default {
  name: 'Analysis',

  components: {
    FileFilter,
    AnalysisResult,
  },

  data() {
    return {
      step: 1,
      loading: false,
      items: null,
      filename: '',
      data: {
        ages: [],
        sex: [],
        speaker: [],
        context: [],
        indicator: [],
      },
      snackbar: false,
      snackbarText: '',
      headers: [
        {
          text: '語言指標',
          align: 'start',
          value: 'name',
          class: 'text--primary subtitle-1 font-weight-bold',
          width: '30%',
        },
        {
          text: '平均',
          value: 'avg',
          class: 'text--primary subtitle-1 font-weight-bold',
          width: '25%',
        },
        {
          text: '標準差',
          value: 'sd',
          class: 'text--primary subtitle-1 font-weight-bold',
          width: '25%',
        },
        {
          text: '有效筆數',
          value: 'size',
          class: 'text--primary subtitle-1 font-weight-bold',
          width: '20%',
        },
      ],
    };
  },

  computed: {
    file() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      const myParam = this.$route.params.file;
      if (myParam !== 'none') {
        this.data['file'] = [myParam];
        return true;
      }
      this.restart();
      return false;
    },
    tableItems() {
      // get analysis result
      if (this.items) {
        var temp = [];
        // calculate avg and std for each indicator
        for (const [key, value] of Object.entries(chatArgs.reindicator)) {
          if (key in this.items) {
            const size = this.items[key][2];
            temp.push({
              name: value,
              // If no data, then the avg and sd should be N/A
              avg: size ? Math.round((this.items[key][0] + Number.EPSILON) * 100) / 100 : 'N/A',
              sd: size ? Math.round((this.items[key][1] + Number.EPSILON) * 100) / 100 : 'N/A',
              size,
            });
          }
        }
        return temp;
      }
      return null;
    },
  },
  methods: {
    step1(data) {
      this.loading = true;
      this.$http
        .post(`/api/${this.file ? 'path' : 'option'}_kideval`, data)
        .then((res) => {
          this.items = res.data;
          this.filename = this.items['filename'][0];
          delete this.items['filename'];
          this.loading = false;
          this.step = 2;
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 404) {
            // no file filtered
            this.snackbarText = '語料庫無符合搜尋條件之語料';
          } else {
            // unhandled errors
            this.snackbarText = '分析失敗';
          }
          this.snackbar = true;
          this.loading = false;
        });
    },
    restart() {
      this.data = {
        ages: [],
        sex: [],
        speaker: [],
        context: [],
        indicator: [],
      };
      this.step = 1;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style lang="css" scoped></style>
