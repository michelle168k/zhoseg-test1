<template>
  <v-container>
    <h1>直接上傳單個檔案</h1>
    <v-form ref="form">
      <v-file-input
        v-model="file"
        class="my-2"
        accept=".cha"
        label="請選擇你的 cha 檔"
        :rules="[v => !!v || '請上傳檔案']"
      ></v-file-input>
      <div>
        <h3>同意聲明</h3>
        <p>
          您所上傳之語料檔案僅進行語言樣本線上分析，本系統不做其他使用。
          <br />
          上傳之語料檔案在線上分析結束後將會移除，本系統不具儲存與保管責任。倘若您的語料內含重要個資或資訊，建議您保留原始檔案或改採下載
          CLAN 軟體至個人電腦進行語言樣本分析，以減少不必要之困擾。
        </p>
      </div>
      <v-checkbox
        v-model="isAgreed"
        :rules="[v => v || '您需要同意上述說明以進行線上分析。']"
        label="本人已詳細閱讀上述內容，同意上述說明並願意進行線上分析。"
      />
      
       <v-btn class="mt-4" color="primary" @click="submit">上傳檔案(不須斷詞)</v-btn>&nbsp;
       <v-btn class="mt-4" color="#FFA500" @click="submitAndSeg">上傳檔案(須斷詞)</v-btn>
           
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'ChaFileInput',
  data: () => ({
    file: null,
    isAgreed: false,
    seg: false,
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.seg=false;
        this.$emit('upload-file', this.file);
      }
    },
    submitAndSeg() {
      if (this.$refs.form.validate()) {
        this.seg=true;
        this.$emit('upload-file-seg', this.file);
      }
      //console.log(this.seg);
    },
  },
};
</script>
