const axios = require('axios')
export default {
  namespaced: true,
  state: () => ({
    dropdownDataForAdmin: [],
    dropdownDataForApp: [],
    provinceData: [],
    districtData: [],
    villageData: [],
  }),
  mutations: {
    async SET_DROPDOWN_FOR_ADMIN(state, data) {
      state.dropdownDataForAdmin = data
    },
    async SET_DROPDOWN_FOR_APP(state, data) {
      state.dropdownDataForApp = data
    },
    SET_PROVINCE(state, data) {
      state.provinceData = data
    },
    SET_DISTRICT(state, data) {
      state.districtData = data
    },
    SET_VILLAGE(state, data) {
      state.villageData = data
    },
  },
  actions: {
    async GetDropdown({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'get',
          url: `http://localhost:8081/backoffice/common/dropdown`,
        })
        const someAsyncOperation = (filteredData) => {
          return new Promise((resolve, reject) => {
            resolve(filteredData)
          })
        }

        let AdminDataDropdown = resp.data?.resultData

        let myFilterAdmin = AdminDataDropdown?.user_type.filter(
          (x) => x.id != 2 && x.id != 3
        )

        await someAsyncOperation(myFilterAdmin).then((result) => {
          AdminDataDropdown.user_type = result
        })

        commit(
          'SET_DROPDOWN_FOR_ADMIN',
          resp?.data?.title == 'success' ? AdminDataDropdown : []
        )
      } catch (error) {
        console.log(error)
      }
    },
    async GetDropdownApp({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'get',
          url: `http://localhost:8081/backoffice/common/dropdown`,
        })
        const someAsyncOperation = (filteredData) => {
          return new Promise((resolve, reject) => {
            resolve(filteredData)
          })
        }

        let AppDataDropdown = resp.data?.resultData

        let myFilterAdmin = AppDataDropdown?.user_type.filter(
          (x) => x.id != 1 && x.id != 4
        )

        await someAsyncOperation(myFilterAdmin).then((result) => {
          AppDataDropdown.user_type = result
        })

        commit(
          'SET_DROPDOWN_FOR_APP',
          resp?.data?.title == 'success' ? AppDataDropdown : []
        )
      } catch (error) {
        console.log(error)
      }
    },
    async GetProvince({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'get',
          url: `http://localhost:8081/backoffice/common/province`,
        })

        commit(
          'SET_PROVINCE',
          resp?.data?.title == 'success' ? resp?.data?.resultData : []
        )
      } catch (error) {}
    },
    async GetDistrict({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'get',
          url: `http://localhost:8081/backoffice/common/district/${item}`,
        })

        commit(
          'SET_DISTRICT',
          resp?.data?.title == 'success' ? resp?.data?.resultData : []
        )
      } catch (error) {}
    },
    async GetVillage({ commit }, item) {
      try {
        let resp = await this.$axios({
          method: 'get',
          url: `http://localhost:8081/backoffice/common/village/${item}`,
        })

        commit(
          'SET_VILLAGE',
          resp?.data?.title == 'success' ? resp?.data?.resultData : []
        )
      } catch (error) {}
    },
  },
  getters: {
    // status: (state) => state.status,
  },
}
