<template>
  <v-container fluid class="px-6 pt-6">
    <v-row style="height: calc(100vh - 64px - 12px - 24px)">
      <v-col cols="3" class="pt-0 mt-0" style="height: 100%">
        <SideBar @click-file="clickFile" :items="items" :active="active" :show-desc="showDesc" />
      </v-col>
      <v-col cols="9" class="pt-0 mt-0" style="height: 100%">
        <InfoPanel :file="file" @analysis-file="analysisFile">
          <v-card
            elevation="0"
            v-if="!content.provider"
            class="subtitle-1 pa-4"
            style="white-space: pre;"
            v-text="content"
          />
          <Description v-else :desc="content" />
        </InfoPanel>
      </v-col>
    </v-row>

    <UiAlert
      v-model="alert"
      title="確定要分析此目錄底下所有檔案嗎？"
      subtitle="確認後將前往分析頁面。"
      @ok="analysisFolder(file)"
    ></UiAlert>

    <v-snackbar v-model="snackbar" color="error">{{ snackbarMessage }}</v-snackbar>
  </v-container>
</template>

<script>
import SideBar from '@/components/SideBar';
import InfoPanel from '@/components/InfoPanel';
import Description from '@/components/Description';
import File from '@/util/file';
import UiAlert from '@/components/ui-alert';

const ROOT_FILE_NAME = '_I_ROOT_FILE__';

export default {
  name: 'Browse',
  components: {
    SideBar,
    InfoPanel,
    Description,
    UiAlert,
  },
  data() {
    return {
      items: [],
      content: '',
      fileName: '',
      active: [],
      file: new File(''),
      snackbar: false,
      snackbarMessage: '',
      alert: false,
    };
  },
  async created() {
    let root = new File(ROOT_FILE_NAME);
    await this.getItems(root);
    this.items = root.children;
  },
  methods: {
    activateSnackbar(msg) {
      this.snackbarMessage = msg;
      this.snackbar = true;
    },
    analysisFolder(fileName) {
      fileName.fullName = fileName.fullName.substr(1);
      this.analysisFile(fileName);
    },
    analysisFile(fileName) {
      if (fileName) {
        this.$router.push({
          name: 'analysis',
          params: { file: fileName.fullName },
        });
      } else {
        this.activateSnackbar('無法取得檔案');
      }
    },
    getItemByPath(path) {
      path = path.split('/').splice(-1, 1);
      let ret = this.items;
      for (let p of path) {
        for (let f of ret) {
          if (f.name === p) {
            ret = f;
            break;
          }
        }
      }
      return ret;
    },
    showDesc(fileName) {
      let it = this.getItemByPath(fileName);
      this.active = [];
      this.content = it.data;
      this.file = it;
    },
    clickFile(files) {
      if (!files.length) return;
      let f = files[0];
      this.file = f;
      if (f.selectAll) {
        this.alert = true;
        return;
      }
      this.content = f.data;
    },
    async getItems(file) {
      try {
        let { data } = await this.$http.get('/api/view', {
          params: { file: file.fullName || '/' },
        });
        // parse info panel
        if (!!data.description) {
          // colletion
          file.data = JSON.parse(data.description);
        } else if (!!data.content) {
          // file
          file.data = data.content;
        }
        if (file.children !== null) {
          // parse tree view
          let isFolder = false;
          if (data.folders?.length) {
            data.folders.forEach(f => file.pushDir(f));
            isFolder = true;
          }
          if (data.files?.length) {
            data.files.forEach(f => file.pushFile(f));
            isFolder = true;
          }
          // get children
          Promise.all(file.children.map(c => this.getItems(c)));
          // prepend "select all" item
          if (isFolder) {
            file.pushNode('分析此目錄所有檔案');
          }
        }
      } catch (err) {
        this.activateSnackbar('載入資源發生錯誤');
        console.log(err);
      }
    },
  },
};
</script>
