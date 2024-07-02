// In your store/index.js or wherever your Vuex store is defined

export const state = () => ({
  token: null,
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
}

// Action to set the token
export const actions = {
  setToken({ commit }, token) {
    commit('setToken', token)
  },
}
