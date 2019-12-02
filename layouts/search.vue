<template>
<v-app>
  <v-content>
      <nuxt />
  </v-content>
</v-app>
</template>

<script>
export default {
  data: () => ({
    open: [1, 2],
    search: null,
    caseSensitive: false,
      }),
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    },
    items() {
      return this.$store.state.public.filterData;
    }
  }
};
</script>

