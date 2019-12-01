<template>
  <div>
    <v-breadcrumbs color="red" :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>
    <div v-for="(item,index) in [1,2,3]" :key="index">
      <v-skeleton-loader
        class="mx-auto my-2"
        v-if="skeltonLoading"
        :height="`${25*index}vh`"
        type="card-heading, list-item-three-line"
      ></v-skeleton-loader>
    </div>
    <div v-if="!skeltonLoading">
      <v-container fluid>
        <v-card :color="isDark ? '' :'#0097A7'" :dark="isDark">
          <v-card-title class="headline">{{subCategory.title}}</v-card-title>
          <v-card-subtitle>{{subCategory.description}}</v-card-subtitle>
        </v-card>
        <v-row>
          <v-col cols="12">
            <v-card v-for="item in subCategory.products" :key="item.id" flat>
              <v-card-subtitle>{{item.title | capitalize}}</v-card-subtitle>
              <no-ssr>
                <div class="ml-5 width-0 ch-50">
                  <vue-mathjax :formula="item.equation" :safe="false" :options="params"></vue-mathjax>
                </div>
              </no-ssr>
              <v-divider></v-divider>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-btn
        fab
        :class="{ footer: !isDark}"
        dark="isDark"
        :style="moveForBottomNavStyle"
        color="primary"
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
import { bottomNav, skeltonLoading } from "../../../../../mixins/index";
import config from "../../../../../config/frontend/index";
export default {
  transition: {
    name: "custom-classes-transition",
    enterActiveClass: "animated fadeInUp"
  },
  mixins: [bottomNav, skeltonLoading],
  async asyncData({ store, params, $axios }) {
    let subCategory = await $axios.$get(
      `${config.reqHost}/api/collection/sub_category/${params.mainCategory}/${params.category}/${params.subCategory}`
    );
    return {
      subCategory: subCategory
    };
  },
  data() {
    return {
      params: {
        tex2jax: {
          inlineMath: [["$", "$"], ["(", ")"]],
          displayMath: [["$$", "$$"], ["[", "]"]],
          processEscapes: true,
          processEnvironments: true,
          preview: ".......loading"
        },
        showMathMenu: false
      },
      breadcrumbs: [
        {
          text: "Collection".toUpperCase(),
          disabled: false,
          href: `/collection`
        },
        {
          text: this.$route.params.mainCategory.toUpperCase(),
          disabled: false,
          href: `/collection/${this.$route.params.mainCategory}`
        },
        {
          text: this.$route.params.category.toUpperCase(),
          disabled: false,
          href: `/collection/${this.$route.params.mainCategory}/${this.$route.params.category}`
        },
        {
          text: this.$route.params.subCategory.toUpperCase(),
          disabled: true,
          href: `/collection/${this.$route.params.mainCategory}/${this.$route.params.category}/${this.$route.params.subCategory}`
        }
      ]
    };
  },
  computed: {
    ...mapState("ui", {
      skeltonLoading: state => state.skeltonLoading,
      isDark: state => state.darkTheme
    })
  }
};
</script>

<style>
</style>