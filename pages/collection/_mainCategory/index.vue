<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>
    <div>
      <span>Coming soon</span>
      <v-icon>mdi-tag-faces</v-icon>
    </div>
  </div>
</template>

<script>
export default {
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
          text: "coming-soon",
          disabled: true
        }
      ]
    };
  }
};
</script>

<style>
</style>