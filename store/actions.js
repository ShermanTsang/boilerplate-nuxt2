export default {
  async GET_INIT_DATA({ commit }) {
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch('GET_INIT_DATA')
  }
}
