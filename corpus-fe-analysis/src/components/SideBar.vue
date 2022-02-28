<template>
  <v-card id="side-bar">
    <v-sheet class="pa-4 primary">
      <v-text-field
        v-model="search"
        label="搜尋檔案"
        flat
        dark
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      />
      <v-checkbox v-model="caseSensitive" dark hide-details label="區分大小寫" />
    </v-sheet>
    <v-treeview
      dense
      open-on-click
      transition
      hoverable
      activatable
      return-object
      @update:active="onActive"
      :search="search"
      :filter="filter"
      :items="items"
      :active="active"
      item-key="fullName"
      style="flex: 1; overflow-y: scroll"
    >
      <template v-slot:label="{ item }">
        <v-list-item>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ item.name }}</span>
            </template>
            <span>{{ item.name }}</span>
          </v-tooltip>
        </v-list-item>
      </template>
      <template v-slot:append="{ item }">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn
              v-if="item.depth === 1 && !item.selectAll"
              v-on="on"
              color="info"
              icon
              @click.stop="showDesc(item.fullName)"
            >
              <v-icon>mdi-information</v-icon>
            </v-btn>
          </template>
          <span>顯示詳細資訊</span>
        </v-tooltip>
      </template>
    </v-treeview>
  </v-card>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    items: {
      type: Array,
      default: [],
    },
    active: {
      type: Array,
      default: [],
    },
    showDesc: {
      type: Function,
      default: fileName => alert(fileName),
    },
  },
  data() {
    return {
      search: null,
      caseSensitive: false,
      oldOpend: [],
    };
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    },
  },
  methods: {
    onActive(eles) {
      console.log(eles);
      this.$emit('click-file', eles);
    },
  },
};
</script>

<style>
#side-bar {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
