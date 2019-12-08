<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-btn icon v-if="$route.fullPath != '/'" @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/search" v-if="$route.fullPath == '/' ||$route.params.mainCategory">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon @click="changeTheme">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("ui", {
      title: state => state.navBarTitle,
      isDark: state => state.darkTheme
    })
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$store.commit("ui/changeTheme");
    }
  }
};
</script>
<style scoped>
/**
To-do issue in production temporaty fix need to remove in future

 */
.v-item-group.v-bottom-navigation {
  align-items: center !important;
}
.v-item-group.v-bottom-navigation--grow .v-btn {
  height: 100% !important;
}
</style>