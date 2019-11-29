<template>
  <v-bottom-navigation app :value="bottomNav" fixed grow :class="{ footer: !isDark}" :dark="isDark">
    <v-btn to="/">
      <span>Bookmark</span>
      <v-icon color="primary">mdi-bookmark-outline</v-icon>
    </v-btn>

    <v-btn to="/Collection">
      <span>Collections</span>
      <v-icon color="primary">mdi-briefcase-search-outline</v-icon>
    </v-btn>

    <v-btn to="/feedback">
      <span>Feedback</span>
      <v-icon color="primary">mdi-message-alert-outline</v-icon>
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
