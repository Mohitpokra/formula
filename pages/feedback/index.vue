<template>
  <div></div>
</template>

<script>
export default {
  asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
      store.commit("ui/setNavbarTitle", {
          title: 'Feedback'
        });
  },
  mounted() {
    // Set bottomNav tab
    this.$store.commit("ui/setBottomNav", {
      number: 2
    });
  }
};
</script>

<style>
</style>