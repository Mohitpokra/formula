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
        <div v-for="mainCategory in mainCategories" :key="mainCategory._id">
          <p class="title">{{mainCategory.title}}</p>
          <carousel :scrollPerPage="false">
            <slide v-for="(category, index) in mainCategory.categories" :key="category.id">
              <v-card
                :class="[{ [`card-bg-small-${index}`]: !isDark }, 'my-colr', 'd-flex', 'justify-center', 'ch-50' ,'align-center', 'theme--light v-card']"
                @click="goTo(mainCategory, category)"
                :dark="isDark"
              >
                <p class="subtitle-1 dotted-overflow px-2">{{category.title}}</p>
              </v-card>
            </slide>
          </carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import config from "../../config/frontend/index";
import { skeltonLoading } from "../../mixins/index";
export default {
  mixins: [skeltonLoading],
    transition: {
    name: "custom-classes-transition",
    enterActiveClass: "animated fadeInUp",
    leaveActiveClass: "animated fadeInUp"
  },
  asyncData({ $axios, store }) {
    return $axios
      .$get(`${config.reqHost}/api/collection`)
      .then(data => {
        store.commit("ui/setNavbarTitle", {
          title: "Collections"
        });
        return {
          mainCategories: data.main_categories
        };
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      showCarousel: false
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
      number: 1
    });
    this.showCarousel = true;
  },
  methods: {
    goTo(mainCategory, category) {
      this.$router.push(`Collection/${mainCategory.slug}/${category.slug}`);
    }
  }
};
</script>

<style>
.VueCarousel-slide {
  position: relative;
  padding: 0 10px;
  color: #fff;
  font-family: Arial;
  font-size: 24px;
  text-align: center;
  /* min-height: 100px; */
}

.label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ch-100 {
  height: 100px;
  border-radius: 10px;
}
</style>
