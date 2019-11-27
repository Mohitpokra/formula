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
      <v-container fluid>
        <v-card color="#385F73" dark>
          <v-card-title class="headline">{{subcategory.title}}</v-card-title>
          <v-card-subtitle>{{subcategory.description}}</v-card-subtitle>
        </v-card>
        <v-row>
          <v-col cols="12">
            <v-card v-for="item in subcategory.products" :key="item.id" flat>
              <v-card-subtitle>{{item.title | capitalize}}</v-card-subtitle>
              <no-ssr>
                <div class="ml-5 width-0">
                  <vue-mathjax :formula="item.equation" :safe="false"></vue-mathjax>
                </div>
              </no-ssr>
              <v-divider></v-divider>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
import config from "../../../../config/frontend/index";
import { bottomNav } from "../../../../mixins/index";
import { skeltonLoading } from "../../../../mixins/index";
import { mapState } from "vuex";  
export default {
  mixins: [bottomNav, skeltonLoading],
  async asyncData({ $axios, params, store }) {
    try {
      let subCategory = await $axios.$get(
        `${config.reqHost}/api/public/sub_category/${params.mainCategory}/${params.category}/${params.subCategory}`
      );
      store.commit("ui/setNavbarTitle", {
        title: subCategory.title
      });
      return {
        subcategory: subCategory
      };
    } catch (err) {
      return {};
    }
  },
  computed: {
    ...mapState("ui", {
      skeltonLoading: state => state.skeltonLoading
    })
  }
};
</script>

<style scoped>
</style>
