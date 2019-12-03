<template>
  <v-card class="mx-auto" max-width="500">
    <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        v-model="search"
        placeholder="Search Bookmark Directory"
        dark
        flat
        autofocus
        filled
        append-icon="mdi-magnify"
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
    </v-sheet>
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
        <template v-slot:label="{ item }">
          <div class="v-treeview-node__label" @click="goTo(item.to)">item.title</div>
        </template>

        <template v-slot:prepend="{ item }">
          <v-icon
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
  layout: "search",
  data: () => ({
    open_all: true,
    search: null,
    caseSensitive: false,
    items: null
  }),
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    },
    open() {
      return this.$store.state.public.openNodes;
    }
  },
  mounted() {
    this.items = this.$store.state.public.filterData;
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