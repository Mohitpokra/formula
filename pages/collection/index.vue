<template>
  <div>
    <div v-if="mainCategories">
      <div v-for="mainCategory in mainCategories" :key="mainCategory._id">
        <p class="title">{{mainCategory.title}}</p>
        <carousel :scrollPerPage="false">
          <slide v-for="(category, index) in mainCategory.categories" :key="category.id">
            <div
              :class="[`card-bg-small-${index}`, 'my-colr', 'd-flex', 'justify-center', 'align-center', 'theme--light v-card']"
              @click="goTo(mainCategory, category)"
            >
              <p class="subtitle-1 dotted-overflow px-2">{{category.title}}</p>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../../config/frontend/index'
export default {
  asyncData({ $axios, store }) {
    return $axios
      .$get(`${config.reqHost}/api/collection`)
      .then(data => {
        store.commit("ui/setNavbarTitle", {
          title: 'Collections'
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
