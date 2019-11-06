<template>
  <div>
    <v-toolbar class="header">
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
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