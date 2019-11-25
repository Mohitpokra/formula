export const state = () => ({
  formulas: [],
})

export const getters = {
  getFormulaOfSubCategory: (state) => (payload) => {
    return state.formulas.filter(item => {  
       return item.sub_category.title.toLowerCase() == payload.subCategory.toLowerCase();
    })
  }   
}

export const mutations = {
  initalizeFormulas(state, payload) {
    state.formulas = payload.formulas;
  }
}
