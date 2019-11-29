export const state = () => ({
    navBarTitle: "Formulas",
    skeltonLoading: false,
    darkTheme: false,
    bottomNav: 0   // Bottom Nav active button
})

export const getters = {
}

export const mutations = {
    setNavbarTitle(state, payload) {
        state.navBarTitle = payload.title
    },
    changeSkletonLoading(state, payload) {
       state.skeltonLoading = payload.skeltonLoading;
    },
    setBottomNav(state, payload) {
        state.bottomNav = payload.number;
    },
    changeTheme(state) {
        state.darkTheme = !state.darkTheme
    }
}