<template>
  <v-card elevation="0">
    <v-card-title>
      <v-icon class="mr-2">mdi-account-circle-outline</v-icon>
      <span>提供者：{{ desc.provider }}</span>
    </v-card-title>

    <v-card-title>
      <v-icon class="mr-2">mdi-file-document-outline</v-icon>
      <span>簡介</span>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(v, i) in desc.introduction" :key="i">
          <v-list-item-content class="pt-0">
            <v-list-item-title>{{ v }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-title>
      <v-icon class="mr-2">mdi-information-outline</v-icon>
      <span>引用資訊</span>
      <v-btn
        color="info"
        class="ml-2"
        x-small
        bottom
        outlined
        elevation="0"
        id="copy-quote-info"
        data-clipboard-target="#quote-info"
      >
        複製到剪貼簿
      </v-btn>
      <transition name="fade">
        <span v-show="hintString !== ''" class="hint ml-2 caption">{{ hintString }}</span>
      </transition>
    </v-card-title>
    <v-card-text
      class="text--primary"
      style="white-space: pre-wrap"
      id="quote-info"
      v-text="desc.quoteInfo"
    />
  </v-card>
</template>

<script>
import Clipboard from 'clipboard';

export default {
  name: 'Description',
  props: {
    desc: {
      provider: '',
      introduction: [],
      quoteInfo: '',
    },
    hintTime: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      hintString: '',
    };
  },
  methods: {
    async clear() {
      await new Promise(r => setTimeout(r, this.hintTime));
      this.hintString = '';
    },
  },
  mounted() {
    const clipboard = new Clipboard('#copy-quote-info');
    clipboard.on('success', () => {
      this.hintString = '成功複製';
      this.clear();
    });
    clipboard.on('error', () => {
      this.hintString = '複製失敗，請再試一次';
      this.clear();
    });
  },
};
</script>

<style scpoed>
.fade-enter-active,
.fade-leave-active {
  transition: all 120ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
@keyframes hint {
}
</style>
