<template>
  <v-app>
    <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        v-model="search"
        label="Search Company Directory"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
      <v-checkbox v-model="caseSensitive" dark hide-details label="Case sensitive search"></v-checkbox>
    </v-sheet>
    <v-content>
      <v-container fluid>
        <v-card>
          <v-card-text>
            <v-treeview :items="items" :search="search" :filter="filter" :open.sync="open">
              <template v-slot:prepend="{ item }">
                <v-icon
                  v-if="item.children"
                  v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
                ></v-icon>
              </template>
            </v-treeview>
          </v-card-text>
        </v-card>
      </v-container>
    </v-content>
    <the-footer app></the-footer>
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

