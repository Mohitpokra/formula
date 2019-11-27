export default function ({
  store
}) {
  if (!process.server) {
    store.commit('ui/changeSkletonLoading', {
      skeltonLoading: true
    })
  }
}
