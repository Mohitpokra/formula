import {
  frontConfig
} from '../config/frontend/index';
import config from '../config/frontend/dev';
export const state = () => ({
  mainCategories: [],
  currentMainCategory: null,
  test: 'this it the test msg'
})

export const getters = {}

export const mutations = {
  initalizeMainCategories(state, payload) {
    state.mainCategories = payload.mainCategories;
  }
}

export const actions = {
  getMainCategories({
    commit
  }) {
    return this.$axios.$get(`${config.reqHost}/api/public`).then(data => {
      commit('initalizeMainCategories', {
        mainCategories: data.main_categories
      })

      commit('category/initalizeCategories', {
        categories: data.categories
      }, {
        root: true 
      });

      commit('subCategory/initalizeSubCategories', {
        subCategories: data.sub_categories
      }, {
        root: true
      })

      commit('formula/initalizeFormulas', {
        formulas: data.products
      }, {
        root: true
      })
    }).catch(err => {
      console.log(err);
    })
  }
}
