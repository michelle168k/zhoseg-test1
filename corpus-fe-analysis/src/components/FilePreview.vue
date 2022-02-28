<template>
  <v-container class="fill-height">
    <v-row>
      <h2 class="pr-3">檔案預覽</h2>
      <v-btn @click="download" color="success">下載檔案</v-btn>
    </v-row>
    <v-row>
      <v-textarea v-model="fileText" rows="12" no-resize readonly />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FilePreview',
  props: {
    file: {
      type: File,
      default: null,
    },
  },
  data: () => ({
    fileText: '',
  }),
  watch: {
    async file(newFile) {
      if (!newFile) return;
      this.fileText = await newFile.text();
    },
  },
  methods: {
    download() {
      if (window.navigator.msSaveOrOpenBlob) {
        // IE10+
        window.navigator.msSaveOrOpenBlob(this.file, 'export.cha');
      } else {
        // Others
        var a = document.createElement('a');
        var url = URL.createObjectURL(this.file);
        a.href = url;
        a.download = 'export.cha';
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    },
  },
};
</script>

<style></style>
