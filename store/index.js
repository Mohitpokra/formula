export const state = () => ({})

export const getters = {

}

export const mutations = {}

export const actions = {
   nuxtServerInit({
    dispatch
  }) {
    return dispatch('mainCategory/getMainCategories', null, {
      root: true
    });
  }
}
