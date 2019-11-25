<template>
  <div>
    <v-container fluid>
      <v-card color="#385F73" dark>
        <v-card-title class="headline">{{subCategory.title}}</v-card-title>
        <v-card-subtitle>{{subCategory.description}}</v-card-subtitle>
      </v-card>
      <v-row>
        <v-col cols="12">
          <v-card v-for="item in subCategory.products" :key="item.id" flat>
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
</template>

<script>
import { bottomNav } from "../../../../../mixins/index";
export default {
  mixins: [bottomNav],
  async asyncData({ store, params, $axios }) {
    let subCategory = await $axios.$get(
      `http://127.0.0.1:3000/api/collection/sub_category/${params.mainCategory}/${params.category}/${params.subCategory}`
    );
    return {
      subCategory: subCategory
    };
  }
};
</script>

<style>
</style>