<template>
  <div>
    <v-app-bar app class="header">
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
   computed: {
     ...mapState('ui', {
         title: state => state.navBarTitle
     })
   }
}
</script>
<style scoped>
/**
To-do issue in production temporaty fix need to remove in future

 */
.v-item-group.v-bottom-navigation {
  align-items: center !important;
}
.v-item-group.v-bottom-navigation--grow .v-btn {
  height: 100% !important
}
</style>