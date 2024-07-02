const axios = require('axios')
export default {
  namespaced: true,
  state: () => ({
    dataHistories: [],
  }),
  mutations: {
    SET_HISTORY(state, data) {
      state.dataHistories = data
    },
  },
  actions: {
    async GetHistory({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'get',
          url: `http://localhost:8081/backoffice/reportaccident/view/accidentbysttcase?stt_case_id=history`,
        })
        commit(
          'SET_HISTORY',
          resp?.data?.title == 'success' ? resp?.data?.resultData : []
        )
      } catch (error) {}
    },
  },
  getters: {
    // status: (state) => state.status,
  },
}
