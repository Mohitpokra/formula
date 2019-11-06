export const state = () => ({
  subCategories: [],
})

export const getters = {
    getSubCategoiresOfCategory: (state) => (payload) => {
      return state.subCategories.filter(item => {
        return item.category.title.toLowerCase() == payload.category.toLowerCase();
     })
    },
    getSubCategory: (state) => (payload) => {
      return state.subCategories.find(item => {
        return item.title.toLowerCase() == payload.subCategory.toLowerCase();
     })
    }
}

export const mutations = {
  initalizeSubCategories(state, payload) {
    state.subCategories = payload.subCategories;
  }
}
