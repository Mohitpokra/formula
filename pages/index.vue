<template>
  <div>
    <div v-for="(item,index) in [1,2,3]" :key="index">
      <v-skeleton-loader
        class="mx-auto my-2"
        v-if="skeltonLoading"
        :height="`${25*index}vh`"
        type="card-heading, list-item-three-line"
      ></v-skeleton-loader>
    </div>
    <div v-if="!skeltonLoading">
      <div v-if="mainCategories">
        <nuxt-link
          class="text-deco-none"
          v-for="(item, index) in mainCategories"
          :key="item.id"
          :to="`/${item.slug}`"
        >
          <v-card
            :class="[{ [`card-bg-${index}`]: !isDark }, 'ma-2', 'ch-100', {'my-colr': !isDark}]"
            height="100%"
            :dark="isDark"
          >
            <v-card-title class="headline">{{item.title | capitalize }}</v-card-title>
            <v-card-subtitle>{{item.description | capitalize}}</v-card-subtitle>
          </v-card>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import config from "../config/frontend/index";
import { skeltonLoading } from "../mixins/index";
export default {
  mixins: [skeltonLoading],
  transition: {
    name: "custom-classes-transition",
    enterActiveClass: "animated fadeInUp",
    leaveActiveClass: "animated fadeInUp"
  },
  async asyncData({ $axios, store }) {
    let data = await $axios.$get(`${config.reqHost}/api/public`);
    store.commit("ui/setNavbarTitle", {
      title: "Formulas"
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
      skeltonLoading: state => state.skeltonLoading,
      isDark: state => state.darkTheme
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
