<template>
  <v-card class="mx-auto" max-width="500">
    <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        v-model="search"
        label="Search Bookmark Directory"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
      <v-checkbox v-model="caseSensitive" dark hide-details label="Case sensitive search"></v-checkbox>
    </v-sheet>
    <v-card-text>
      <v-treeview v-if="items" :items="items" :search="search" :filter="filter" :open.sync="open" activatabless open-on-click>
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
  data: () => ({
    open: [0, 1],
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
  }
};
</script>

<style>
</style>