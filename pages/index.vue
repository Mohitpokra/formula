<template>
  <div>
    <div v-for="(item,index) in [1,2,3]" :key="index">
      <v-skeleton-loader
        class="mx-auto my-2"
        v-if="!mainCategories"
        type="card-heading, list-item-three-line"
      ></v-skeleton-loader>
    </div>
    <div v-if="mainCategories">
      <nuxt-link
        class="text-deco-none"
        v-for="(item, index) in mainCategories"
        :key="item.id"
        :to="`/${item.slug}`"
      >
        <v-card :class="[`card-bg-${index}`, 'ma-2', 'my-colr']" height="100%">
          <v-card-title class="headline">{{item.title | capitalize }}</v-card-title>
          <v-card-subtitle>{{item.description | capitalize}}</v-card-subtitle>
        </v-card>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import config from "../config/frontend/index";
export default {
  async asyncData({ $axios, store }) {
    let data = await $axios.$get(`${config.reqHost}/api/public`);
    store.commit("ui/setNavbarTitle", {
      title: 'Formulas'
    });
    return { mainCategories: data.main_categories };
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapState("ui", {
      skeltonLoading: state => state.skeltonLoading
    })
  },
  mounted() {
    // Set bottomNav tab
    this.$store.commit("ui/setBottomNav", {
      number: 0
    });
  }
};
</script>

<style>
</style>
