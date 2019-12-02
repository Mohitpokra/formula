export const state = () => ({})

export const getters = {

}

export const mutations = {}

export const actions = {
  async nuxtServerInit({
    dispatch
  }) {
    await dispatch('public/getPublicData', null, {
      root: true
    });
  }
}
