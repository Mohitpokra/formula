<template>
<div>
    <div v-for="(item,index) in [1,2,3]" :key="index">
        <v-skeleton-loader class="mx-auto my-2" v-if="!mainCategories && !mainCategories.lenght" type="card-heading, list-item-three-line"></v-skeleton-loader>
    </div>
    <div v-for="(item, index) in mainCategories" :key="item.id">
        <nuxt-link class="text-deco-none" :to="`/${item.title}`">
            <v-card :class="[`card-bg-${index}`, 'ma-2', 'my-colr']" height="100%">
                <v-card-title class="headline">{{item.title | capitalize }}</v-card-title>
                <v-card-subtitle>{{item.description | capitalize}}</v-card-subtitle>
            </v-card>
        </nuxt-link>
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    data() {
        return {
            loading: true
        };
    },
    name: "HelloWorld",
    computed: {
        ...mapState("mainCategory", {
            mainCategories: state => state.mainCategories
        }),
        ...mapState('ui', {
            skeltonLoading: state => state.skeltonLoading
        })

    }
};
</script>

<style>
</style>
