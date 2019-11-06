<template>
<v-app>
  <navigation-bar app></navigation-bar>
  <v-content>
    <v-container fluid>
      <nuxt />
    </v-container>
  </v-content>
  <the-footer app></the-footer>
</v-app>
</template>

<script>
import NavigationBar from '~/components/layout/TheNavigationBar';
import TheFooter from '~/components/layout/TheFooter'
  export default {
    components: {
      NavigationBar,
      TheFooter
    }
  }
</script>

