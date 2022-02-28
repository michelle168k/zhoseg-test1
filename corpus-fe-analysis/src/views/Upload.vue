<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-divider></v-divider>
      <v-stepper-step :complete="step > 1" step="1">選擇上傳方式</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="step > 2" step="2">輸入 cha 檔內容</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="step > 3" step="3">檔案預覽與下載</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="step > 4" step="4">選擇分析對象</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="step > 5" step="5">查看分析結果</v-stepper-step>
      <v-divider></v-divider>
    </v-stepper-header>
    <v-stepper-items style="padding: 0 15vw">
      <v-stepper-content step="1">
        <v-container fluid>
          <v-row justify="center">
            <h2 style="color: red">網站建置中，分析數據待確認</h2>
          </v-row>
          <v-row justify="center">
            <v-spacer />
            <v-col cols="2">
              <v-row justify="center">
                <v-btn
                  color="success"
                  @click="
                    uploadByFile = true;
                    step++;
                  "
                  >上傳單個檔案</v-btn
                >
              </v-row>
            </v-col>
            <v-col cols="1">
              <v-row justify="center">
                <div>或是</div>
              </v-row>
            </v-col>
            <v-col cols="2">
              <v-row justify="center">
                <v-btn
                  color="success"
                  @click="
                    uploadByFile = false;
                    step++;
                  "
                  >手動輸入文本</v-btn
                >
              </v-row>
            </v-col>
            <v-spacer />
          </v-row>
        </v-container>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-container>
          <v-btn color="primary" @click="step--">返回上一步</v-btn>
          <ChaFileInput v-if="uploadByFile" @upload-file-seg="parseFileSeg" @upload-file="parseFile">
          <p style="color: red">語料斷詞中，請稍候。</p>
          </ChaFileInput>
          <div v-else>
            <ChaHeaderInput ref="chaHeader"></ChaHeaderInput>
            <ChaContentInput ref="chaContent"></ChaContentInput>
            <v-row justify="end">
              <v-btn color="primary" @click="parseText">繼續</v-btn>
            </v-row>
          </div>
        </v-container>
      </v-stepper-content>
      <v-stepper-content style="height: 100vh" step="3">
        <v-btn color="primary" @click="step--">返回上一步</v-btn>
        <FilePreview :file="file"></FilePreview>
        <v-btn color="primary" @click="step++">繼續</v-btn>
      </v-stepper-content>
      <v-stepper-content step="4">
        <v-btn color="primary" @click="step--">返回上一步</v-btn>
        <v-select v-model="speaker" :items="speakerNames"></v-select>
        <v-btn color="primary" @click="upload">分析</v-btn>
      </v-stepper-content>
      <v-stepper-content step="5">
        <AnalysisResult @restart="restart" @back="step--" :filename="analysis.filename">
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
import { Speaker } from '@/util/speaker';
import ChaFileInput from '@/components/ChaFileInput';
import ChaContentInput from '@/components/ChaContentInput';
import ChaHeaderInput from '@/components/ChaHeaderInput';
import AnalysisResult from '@/components/AnalysisResult';
import FilePreview from '@/components/FilePreview';
import chatArgs from '@/util/step1.json';
import Spinner from '@/components/Spinner';

export default {
  name: 'Upload',
  components: {
    FilePreview,
    ChaFileInput,
    ChaContentInput,
    ChaHeaderInput,
    AnalysisResult,
    Spinner,
  },
  data: () => ({
    file: null,
    speaker: '',
    uploadByFile: false,
    spin: false,
    step: 1,
    snackbar: false,
    snackbarText: '',
    analysis: {
      results: [],
      filename: '',
    },
    headers: [
      {
        text: '語言指標',
        align: 'start',
        value: 'name',
        class: 'text--primary subtitle-1 font-weight-bold',
        width: '60%',
      },
      {
        text: '數值',
        value: 'value',
        class: 'text--primary subtitle-1 font-weight-bold',
        width: '40%',
      },
    ],
  }),
  computed: {
    tableItems() {
      if (!this.analysis.results) return null;
      let items = [];
      // get english and chinese name for each indicator
      for (const [en, ch] of Object.entries(chatArgs.reindicator)) {
        if (en in this.analysis.results) {
          items.push({
            name: ch,
            value: this.analysis.results[en],
          });
        }
      }
      return items;
    },
    speakerNames() {
      return this.$store.state.speakers.map(speaker => speaker.nameCode);
    },
  },
  methods: {
    /**
     * get file
     * @param {File} file
     */
    async parseFile(file) {
      // store file
      this.file = file;
      // get speakers
      let lines = (await file.text()).split(/\r?\n/g);
      let speakers = new Set();
      for (let line of lines) {
        if (line && line[0] === '*') {
          // extract name code
          speakers.add(
            line
              .split(':')[0]
              .concat('')
              .slice(1),
          );
        }
      }
      speakers = [...speakers].map(speaker => ({ nameCode: speaker }));
      this.$store.dispatch('setSpeakers', speakers);
      this.step++;
      //console.log(this.seg);
    },

    async parseFileSeg(file)
    {
        this.parseFile(file);
         try {
              this.segment();
         }
        catch (err){
        this.segError("斷詞失敗");
        this.step--;
        }
    },

    async segment(){
        //segment the file
        let segFormData = new FormData();
        segFormData.append('file', this.file);
        let result = (
            await this.$http.post('/api/segment', segFormData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
          ).data;
          this.file = new File([result], { type: 'text/plain;charset=utf-8' }) //replace the file to segment file
    },

    /*async parseFileSeg(file){
      this.parseFile(file);
      console.log("got it!");
      try {
        this.segment();
      }
      catch (err){
        this.segError("斷詞失敗");
        this.step--;
      }
    },*/

    segError(message){
      this.snackbar = true
      this.snackbar = message
    },


    
    /**
     * upload by text
     */
    async parseText() {
      // create file
      let content = `@UTF8\n@Begin\n${this.$refs.chaHeader.header}\n${this.$refs.chaContent.text}\n@End\n`;
      this.file = new Blob([content], { type: 'text/plain;charset=utf-8' });
      this.step++;

      if(this.seg)
      {
        try {
          this.segment();
        }
        catch (err){
          this.segError("斷詞失敗");
          this.step--;
        }
      }
    },

    /**
     * core upload function
     */
    async upload() {
      // prepare payload
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('Speaker', this.speaker);
      try {
        // get analysis result
        let resp = (
          await this.$http.post('/api/upload_detailed_kideval', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        ).data;
        this.analysis.results = resp;
        this.analysis.filename = resp.filename;
      } catch (err) {
        this.segError("分析失敗");
        this.step--;
        return;
      }
      // continue to next step
      this.step++;
      // scroll to top
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    restart() {
      this.file = null;
      this.analysis = {
        results: [],
        filename: '',
      };
    },
  },
};
</script>

<style lang="css" scoped></style>
