<template>
  <v-container fluid>
    <h1>手動輸入主段 (Main tier)</h1>
    <v-row>
      <v-col cols="5">
        <v-textarea
          v-model="text"
          placeholder="貼上文本"
          auto-grow
          outlined
          rows="10"
          @input="parseText"
          @keydown.tab.prevent="appendTabToHeader($event)"
          row-height="40"
        />
      </v-col>
      <v-col cols="6">
        <v-row v-for="(row, index) in splitText" :key="index" no-gutters>
          <v-col col="4">
            <v-combobox
              v-model="row.speaker"
              :items="speakerNames"
              placeholder="選取或輸入說話者"
              outlined
              @input="joinText"
              dense
              hide-details
            />
          </v-col>
          <v-col cols="8">
            <v-text-field
              v-model="row.text"
              placeholder="輸入語句"
              outlined
              @input="joinText"
              dense
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1">
        <v-row justify="end">
          <v-btn @click="addLine" color="success">新增語句</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Speaker } from '@/util/speaker';

export default {
  name: 'ChaContentInput',
  data() {
    return {
      text: '',
      splitText: [{ speaker: '', text: '' }],
      hello: '',
    };
  },
  computed: {
    speakerNames() {
      return this.$store.state.speakers.map(speaker => speaker.nameCode);
    },
    speakers() {
      const rows = this.text.split('\n');
      let speakers = rows
        .filter(text => text[0] === '*')
        .map(text =>
          text
            .split(':')[0]
            .concat('')
            .slice(1),
        );
      const newSpeakers = [...new Set(speakers)].map(nameCode => {
        let ret = new Speaker();
        ret.nameCode = nameCode;
        return ret;
      });
      this.$store.dispatch('setSpeakers', this.$store.state.speakers.concat(newSpeakers));
      return newSpeakers;
    },
  },
  methods: {
    // 把左側的文本 parse 成一行一行
    parseText() {
      const rows = this.text.split('\n');
      this.splitText = rows
        .filter(text => text)
        .map(text => {
          const cuts = text.split(':');
          return {
            speaker: cuts[0],
            text: cuts
              .slice(1)
              .join('')
              .trim(),
          };
        });
    },
    // 把右側的文本組成一行
    joinText() {
      this.text = this.splitText.map(text => `*${text.speaker}:\t${text.text}`).join('\n');
    },
    // 按按鈕
    addLine() {
      this.text += '\n';
      this.splitText.push({
        speaker: '',
        text: '',
      });
    },
    // FIXME: caret index will at the line end after insert
    appendTabToHeader(event) {
      let startText = this.header.slice(0, event.target.selectionStart);
      let endText = this.header.slice(event.target.selectionStart);
      this.header = `${startText}\t${endText}`;
    },
  },
};
</script>

<style></style>
