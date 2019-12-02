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
        :open-all="open_all"
        :items="items"
        :search="search"
        :filter="filter"
        :open.sync="open"
        activatabless
        open-on-click
      >
        <template v-slot:prepend="{ item }">
          <v-icon
            v-if="item.children"
            v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
          ></v-icon>
        </template>
        <template v-slot:append="{ item }">
          <v-btn :to="item.to" icon color="primary">
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
    open: [],
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
    }
  },
  mounted() {
    this.items = this.$store.state.public.filterData;
  },
  methods: {}
};
</script>

<style>
</style>