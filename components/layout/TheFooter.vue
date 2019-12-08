<template>
  <v-bottom-navigation app background-color="primary" :value="bottomNav" fixed grow dark>
    <v-btn to="/">
      <span>Offline</span>
      <v-icon>mdi-bookmark-outline</v-icon>
    </v-btn>

    <v-btn to="/Collection">
      <span>Collections</span>
      <v-icon>mdi-briefcase-search-outline</v-icon>
    </v-btn>

    <v-btn to="/feedback">
      <span>Feedback</span>
      <v-icon>mdi-message-alert-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("ui", {
      bottomNav: state => state.bottomNav,
       isDark: state => state.darkTheme
    })
  }
};
</script>
