<template>
<div>
    <v-container fluid>
        <v-card color="#385F73" dark>
            <v-card-title class="headline">{{category.title}}</v-card-title>
            <v-card-subtitle>{{category.description}}</v-card-subtitle>
        </v-card>
        <v-row>
            <v-col cols=6 v-for="(item, index) in subCategories" :key="item.id">
                <nuxt-link class="text-deco-none" :to="`${routePara}/${item.title}`">
                    <div :class="[`card-bg-small-${index}`, 'ma-2', 'my-colr', 'd-flex', 'justify-center', 'align-center', 'br-5', 'theme--light v-card']">
                        <p class="subtitle-1 dotted-overflow px-2">{{item.title | capitalize }}</p>
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
        subCategories() {
            return this.$store.getters["subCategory/getSubCategoiresOfCategory"](
                this.$route.params
            );
        },
        routePara() {
            return this.$route.fullPath;
        },
        category() {
            return this.$store.getters["category/getCategory"](this.$route.params)
        }
    }
};
</script>

<style>
</style>
