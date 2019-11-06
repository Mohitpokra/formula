export const state = () => ({
  categories: [],
})

export const getters = {
  getCategoriesOfMainCategory: (state) => (payload) => {
    return state.categories.filter(item => { 
       return item.mainCategory.title.toLowerCase() == payload.mainCategory.toLowerCase();
    })
  },
  
  getCategory: (state) => (payload) => {
    return state.categories.find(item => { 
      return item.title.toLowerCase() == payload.category.toLowerCase();
   });
  }
}

export const mutations = {
  initalizeCategories(state, payload) {
    state.categories = payload.categories;
  },
}
