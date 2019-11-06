<template>
<div>
    <v-container fluid>
        <v-row>
            <v-col cols=6 v-for="(item, index) in categories" :key="item.id">
                <nuxt-link class="text-deco-none" :to="`${routePara}/${item.title}`">
                    <div :class="[`card-bg-small-${index}`, 'ma-2', 'my-colr', 'd-flex', 'justify-center', 'align-center', 'br-5', 'theme--light v-card']">
                        <p class="title">{{item.title | capitalize }}</p>
                    </div>
                </nuxt-link>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            loading: true
        };
    },
    computed: {
        categories() {
            return this.$store.getters["category/getCategoriesOfMainCategory"](
                this.$route.params
            );
        },
        routePara() {
            return this.$route.params.mainCategory;
        }
    }
};
</script>

<style>
</style>
