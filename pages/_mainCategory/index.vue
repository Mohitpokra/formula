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
      <div v-for="(item, index) in mainCategory.categories" :key="item.id">
        <nuxt-link class="text-deco-none" :to="`${item.slug}`" append>
          <v-card :class="[`card-bg-${index}`, 'ma-2', 'my-colr']" height="100%">
            <v-card-title class="headline">{{item.title | capitalize }}</v-card-title>
            <v-card-subtitle>{{item.description | capitalize}}</v-card-subtitle>
          </v-card>
        </nuxt-link>
      </div>
      <v-btn
        fab
        class="footer"
        :style="moveForBottomNavStyle"
        bottom
        right
        fixed
        @click="$router.go(-1)"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";  
import config from "../../config/frontend/index";
import { bottomNav } from "../../mixins/index";
import { skeltonLoading } from "../../mixins/index";
export default {
  mixins: [bottomNav, skeltonLoading],
  async asyncData({ $axios, params, store }) {
    let mainCategory = await $axios.$get(
      `${config.reqHost}/api/public/main_category/${params.mainCategory}`
    );
    store.commit("ui/setNavbarTitle", {
      title: mainCategory.title
    });
    return {
      mainCategory: mainCategory
    };
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    routePara() {
      return this.$route.params.mainCategory;
    },
    ...mapState("ui", {
      skeltonLoading: state => state.skeltonLoading
    })
  },
  methods: {
    change() {
      this.mainCategory = null;
    }
  }
};
</script>

<style>
</style>
