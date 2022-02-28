<template>
  <v-app>
    <v-app-bar app color="success" dark height="64">
      <div class="d-flex align-center title">兒童語料庫 語料查看與分析</div>

      <v-spacer></v-spacer>

      <v-btn to="/browse" text>
        <v-icon>mdi-file-find</v-icon>
        <span class="title">語料查看</span>
      </v-btn>

      <v-btn to="/analysis/none" text>
        <v-icon>mdi-desktop-classic</v-icon>
        <span class="title">語料分析</span>
      </v-btn>

      <v-btn to="/upload" text>
        <v-icon>mdi-file-chart</v-icon>
        <span class="title">線上分析</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn href="http://noj.tw:8000/" target="_blank" text>
        <span>回到華語兒童語言發展評估系統</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
