<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs">
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
      <v-container v-if="category" fluid>
        <v-card :dark="isDark">
          <v-card-title class="headline">{{category.title}}</v-card-title>
          <v-card-subtitle>{{category.description}}</v-card-subtitle>
        </v-card>
        <v-row>
          <v-col cols="6" v-for="(item) in category.sub_categories" :key="item._id">
            <nuxt-link class="text-deco-none" :to="`${item.slug}`" append>
              <v-card
                :class="['ch-50', 'ma-2', 'd-flex', 'justify-center', 'align-center', 'br-5', 'theme--light v-card']"
                :dark="isDark"
              >
                <p class="subtitle-1 dotted-overflow px-2 text-center">{{item.title | capitalize }}</p>
              </v-card>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
      <v-card>
        <v-btn
          fab
          :style="moveForBottomNavStyle"
          bottom
          color="primary"
          right
          fixed
          @click="$router.go(-1)"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { bottomNav } from "../../../../mixins/index";
import { skeltonLoading } from "../../../../mixins/index";
import config from "../../../../config/frontend/index";
export default {
  transition: {
    name: "custom-classes-transition",
    enterActiveClass: "animated fadeInUp"
  },
  mixins: [bottomNav, skeltonLoading],
  asyncData({ $axios, store, params }) {
    return $axios
      .$get(
        `${config.reqHost}/api/collection/category/${params.mainCategory}/${params.category}`
      )
      .then(data => {
        return {
          category: data
        };
      })
      .catch(err => {});
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: "Collection".toUpperCase(),
          disabled: false,
          exact: true,
          to: `/collection`
        },
        {
          text: this.$route.params.mainCategory.toUpperCase(),
          exact: true,
          disabled: false,
          to: `/collection/${this.$route.params.mainCategory}`
        },
        {
          text: this.$route.params.category.toUpperCase(),
          to: true
        }
      ]
    };
  },
  methods: {
    goTo(category, item) {
      this.$router.push(`/sub_category/${category}/${item.title}`);
    }
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
