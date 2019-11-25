export const state = () => ({
  categories: [],
  selCollectionId: null // Current selected collection Id of page
})

export const getters = {
  getCategoriesOfMainCategory: (state) => (payload) => {
    return state.categories.filter(item => { 
       return item.main_category.title.toLowerCase() == payload.mainCategory.toLowerCase();
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
  setSelCollectionId(state, payload) {
    state.selCollectionId = payload.id;
  }
}
