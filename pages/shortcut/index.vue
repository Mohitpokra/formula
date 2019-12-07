<template>
  <v-card>
    <v-card-text>
      <v-treeview
        v-if="items"
        :items="items"
        :search="search"
        hoverable
        activatable
        :open.sync="open"
        activatabless
      >
        <template v-slot:prepend="{ item }">
          <v-icon
            @click="goTo(item.to)"
            v-if="item.children"
            v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
          ></v-icon>
        </template>
        <template v-slot:append="{ item }">
          <v-btn icon color="primary">
            <v-icon>mdi-launch</v-icon>
          </v-btn>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>


<script>
export default {
  data: () => ({
    search: null,
    caseSensitive: false,
    items: null
  }),
  computed: {
    open() {
      return this.$store.state.public.openNodes;
    }
  },
  mounted() {
    this.items = this.$store.state.public.shortCutData;
  },
  methods: {
    goTo(to) {
      this.$router.push(to);
    }
  }
};
</script>

<style>
</style>