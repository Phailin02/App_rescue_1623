const axios = require('axios')
const CryptoJS = require('crypto-js')
export default {
  namespaced: true,
  state: () => ({
    dataUserApp: [],
    dataUnit: [],
  }),
  mutations: {
    SET_USER_APP_DATA(state, data) {
      data.map(
        (x) =>
          (x.password = CryptoJS.AES.decrypt(
            x.password,
            process.env.PASSWORD_KEY
          ).toString(CryptoJS.enc.Utf8))
      )

      state.dataUserApp = data
    },
    SET_UNIT_DATA(state, data) {
      state.dataUnit = data
    },
  },
  actions: {
    async GetUnit({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'get',
          url: `http://localhost:8081/backoffice/unit/view?limit=&page=`,
        })
        commit(
          'SET_UNIT_DATA',
          resp?.data?.title == 'success' ? resp?.data?.resultData : []
        )
      } catch (error) {
        throw error.response.data
      }
    },
    async GetUserApp({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'get',
          url: `http://localhost:8081/backoffice/userapp/view?limit=&page=`,
        })
        commit(
          'SET_USER_APP_DATA',
          resp?.data?.title == 'success' ? resp?.data?.resultData : []
        )
      } catch (error) {
        throw error.response.data
      }
    },
    async ChangePassUserApp({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'put',
          url: `http://localhost:8081/backoffice/userapp/changepass`,
          data: item,
        })
        return resp.data
      } catch (error) {
        throw error.response.data
      }
    },
    async DeleteUserApp({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'delete',
          url: `http://localhost:8081/backoffice/userapp/delete`,
          data: item,
        })

        return resp.data
      } catch (error) {
        throw error.response.data
      }
    },
    async UpdateUserApp({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'put',
          url: `http://localhost:8081/backoffice/userapp/update`,
          data: item,
        })
        return resp.data
      } catch (error) {
        throw error.response.data
      }
    },
    async CreateUserApp({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'post',
          url: `http://localhost:8081/backoffice/userapp/create`,
          data: item,
        })
        return resp.data
      } catch (error) {
        throw error.response.data
      }
    },
  },
  getters: {
    // status: (state) => state.status,
  },
}
