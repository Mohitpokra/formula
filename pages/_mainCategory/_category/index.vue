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
          <v-card-title class="headline">{{category.title}}</v-card-title>
          <v-card-subtitle>{{category.description}}</v-card-subtitle>
        </v-card>
        <v-row>
          <v-col cols="6" v-for="(item, index) in category.sub_categories" :key="item.id">
            <nuxt-link class="text-deco-none" :to="`${item.slug}`" append>
              <div
                :class="[`card-bg-small-${index}`, 'ma-2', 'my-colr', 'd-flex', 'justify-center', 'align-center', 'br-5', 'theme--light v-card']"
              >
                <p class="subtitle-1 dotted-overflow px-2 text-center">{{item.title | capitalize }}</p>
              </div>
            </nuxt-link>
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
import { mapState } from "vuex";  
import config from "../../../config/frontend/index";
import { bottomNav } from "../../../mixins/index";
import { skeltonLoading } from "../../../mixins/index";
export default {
  mixins: [bottomNav, skeltonLoading],
  async asyncData({ $axios, params, store }) {
    try {
      let category = await $axios.$get(
        `${config.reqHost}/api/public/category/${params.mainCategory}/${params.category}`
      );
      store.commit("ui/setNavbarTitle", {
        title: category.title
      });
      return {
        category: category
      };
    } catch (err) {}
  },
  computed: {
    ...mapState("ui", {
      skeltonLoading: state => state.skeltonLoading
    })
  }
};
</script>

<style>
</style>
