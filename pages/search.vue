<template>
  <v-card class="mx-auto" max-width="500">
    <v-sheet>
      <v-text-field
        v-model="search"
        placeholder="Search Bookmark Directory"
        dark
        background-color="primary"
        flat
        autofocus
        filled
        color="white"
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
        autofocus
        activatable
        open-all
        activatabless
      >
        <template v-slot:label="{ item }">
          <div class="v-treeview-node__label" @click="goTo(item.to)">{{item.name}}</div>
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