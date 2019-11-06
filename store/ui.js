export const state = () => ({
    navBarTitle: "Formulas",
    skeltonLoading: true
})

export const getters = {
}

export const mutations = {
    setNavbarTitle(state, payload) {
        state.navBarTitle = payload.title
    },
    changeSkletonLoading(state, payload) {
       state.skeltonLoading = payload.skeltonLoading;
    }
}