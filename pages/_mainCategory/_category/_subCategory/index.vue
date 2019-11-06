<template>
<div>

    <v-container fluid>
        <v-card color="#385F73" dark>
            <v-card-title class="headline">{{subcategory.title}}</v-card-title>
            <v-card-subtitle>{{subcategory.description}}</v-card-subtitle>
        </v-card>
        <v-row>
            <v-col cols=12>
                <v-card v-for="item in formulas" :key="item.id" flat>
                    <v-card-subtitle>{{item.title | capitalize}}</v-card-subtitle>
                    <no-ssr>
                        <div class="ml-5 width-0">
                            <vue-mathjax :formula="item.equation" :safe="false"></vue-mathjax>
                        </div>
                    </no-ssr>
                    <v-divider></v-divider>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    asyncData(context) {
        return {
            loading: "$x = {-b \pm \\sqrt{b^2-4ac} \\over 2a}.$"
        };
    },
    computed: {
        formulas() {
            return this.$store.getters["formula/getFormulaOfSubCategory"](
                this.$route.params
            );
        },
        routePara() {
            return this.$route.fullPath;
        },
        subcategory() {
            return this.$store.getters["subCategory/getSubCategory"](
                this.$route.params
            );
        }
    }
};
</script>

<style scoped>
.MJXc-display {
    text-align: left !important;
}
.width-0 {
    width: 0%;
}
</style>
