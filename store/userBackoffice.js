const axios = require('axios')
const CryptoJS = require('crypto-js')

export default {
  namespaced: true,
  state: () => ({
    dataUserBackOffice: [],
  }),
  mutations: {
    SET_USER_BACKOFFICE_DATA(state, data) {
      data.map(
        (x) =>
          (x.password = CryptoJS.AES.decrypt(
            x.password,
            process.env.PASSWORD_KEY
          ).toString(CryptoJS.enc.Utf8))
      )
      state.dataUserBackOffice = data
    },
  },
  actions: {
    async GetUserBackOffice({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'get',
          url: `http://localhost:8081/backoffice/userbackoffice/view?limit=&page=`,
        })
        commit(
          'SET_USER_BACKOFFICE_DATA',
          resp?.data?.title == 'success' ? resp?.data?.resultData : []
        )
      } catch (error) {}
    },
    async DeleteUserBackOffice({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'delete',
          url: `http://localhost:8081/backoffice/userbackoffice/delete`,
          data: item,
        })

        return resp.data
      } catch (error) {
        throw error.response.data
      }
    },
    async UpdateUserBackOffice({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'put',
          url: `http://localhost:8081/backoffice/userbackoffice/update`,
          data: item,
        })
        return resp.data
      } catch (error) {
        throw error.response.data
      }
    },
    async ChangePassUserBackOffice({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'put',
          url: `http://localhost:8081/backoffice/userbackoffice/changepass`,
          data: item,
        })
        return resp.data
      } catch (error) {
        throw error.response.data
      }
    },
    async CreateUserBackOffice({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'post',
          url: `http://localhost:8081/backoffice/userbackoffice/create`,
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
