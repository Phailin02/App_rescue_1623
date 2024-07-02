<template>
  <v-container>
    <button @click="goBack" class="mb-5" style="font-size: 15pt; color: white">
      <v-icon color="white">mdi-arrow-left</v-icon>ກັບຄືນ
    </button>
    <div style="display: flex; justify-content: center">
      <v-card style="width: 1000px">
        <v-container>
          <v-row>
            <v-col cols="6">
              <div v-if="imageUrl">
                <img
                  :src="imageUrl"
                  class="image_style pb-10"
                  alt="Uploaded Image"
                />
                <input
                  style="display: none"
                  id="files"
                  type="file"
                  @change="handleFileUpload"
                  accept="image/png, image/jpeg"
                />
                <div style="display: flex; justify-content: center">
                  <label for="files" class="input_file_style"
                    ><v-icon color="white">mdi-image-sync-outline </v-icon>
                    ປ່ຽນຮູບ</label
                  >
                </div>
              </div>

              <div v-else class="input_card">
                <input
                  style="display: none"
                  id="files"
                  type="file"
                  @change="handleFileUpload"
                  accept="image/png, image/jpeg"
                />

                <label for="files" class="input_file_style"
                  ><v-icon color="white">mdi-image-outline </v-icon>
                  ເລືອກຮູບ</label
                >
              </div>
            </v-col>

            <v-col cols="6">
              <h1 style="text-align: center">ແກ້ໄຂຂໍ້ມູນໜ່ວຍ</h1>
              <form @submit.prevent="onSubmit" class="mt-5">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="ຊື່ໜ່ວຍ"
                      outlined
                      v-model="create.unit_name"
                    ></v-text-field
                  ></v-col>
                </v-row>

                <v-row>
                  <v-col class="py-0">
                    <v-text-field
                      type="number"
                      label="ຈຳນວນລົດ"
                      outlined
                      v-model="create.number_of_van"
                    ></v-text-field
                  ></v-col>
                  <v-col class="py-0">
                    <v-text-field
                      type="number"
                      label="ຈຳນວນຄົນ"
                      outlined
                      v-model="create.number_of_emp"
                    ></v-text-field
                  ></v-col>
                </v-row>

                <!-- <v-col cols="4">
                    <v-text-field
                      label="ຈຳນວນຄົນ"
                      type="number"
                      outlined
                      v-model="create.number_of_emp"
                    ></v-text-field>
                  </v-col> -->

                <v-row>
                  <v-col class="py-0">
                    <v-text-field
                      label="Lat"
                      outlined
                      v-model="create.lat"
                    ></v-text-field
                  ></v-col>
                  <v-col class="py-0">
                    <v-text-field
                      label="Lng"
                      outlined
                      v-model="create.lng"
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col class="py-0">
                    <v-select
                      v-model="create.selectedProvince"
                      :items="provinceData"
                      item-text="province_name"
                      item-value="province_id"
                      label="ແຂວງ"
                      outlined
                      @change="onProvinceSelect"
                    ></v-select>
                  </v-col>
                  <v-col class="py-0">
                    <v-select
                      v-model="create.selectedDistrict"
                      :items="districtData"
                      item-text="district_name"
                      item-value="district_id"
                      label="ເມືອງ"
                      outlined
                      @change="onDistrictSelect"
                    ></v-select>
                  </v-col>
                  <v-col class="py-0">
                    <v-select
                      v-model="create.selectedVillage"
                      :items="villageData"
                      item-text="village_name"
                      item-value="village_id"
                      label="ບ້ານ"
                      outlined
                      @change="onVillageSelect"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-text-field
                  label="ເບີໂທຕິດຕໍ່"
                  outlined
                  v-model="create.tel"
                ></v-text-field>

                <v-textarea
                  outlined
                  name="input-7-4"
                  label="ລາຍລະອຽດໜ່ວຍ"
                  v-model="create.address_detail"
                  max-height="500"
                ></v-textarea>

                <v-btn type="submit" color="primary">Submit</v-btn>
              </form>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import axios from '../../../assets/base_api'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      files: [],
      test: '',
      responseData: [],
      id: this.$route.params.id,

      imageUrl: null,
      create: {
        image: '',
        unit_name: '',
        lat: '',
        lng: '',
        village_name: '',
        district_name: '',
        province_name: '',
        address_detail: '',
        number_of_emp: '',
        number_of_van: '',
      },
      villageId: null,
      provinceData: [],
      districtData: [],
      villageData: [],
      selectedProvince: null,
      selectedDistrict: null,
      selectedVillage: null,
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    onProvinceSelect() {
      if (this.create.selectedProvince !== null) {
        this.getDistrict(this.create.selectedProvince)
      }
    },
    onDistrictSelect() {
      if (this.create.selectedDistrict !== null) {
        console.log('object', this.create.selectedDistrict)
        this.getVillage(this.create.selectedDistrict)
      }
    },
    onVillageSelect() {
      if (this.create.selectedVillage !== null) {
        // console.log('object', this.create.selectedVillage)
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.imageUrl = URL.createObjectURL(file)
        this.create.image = file // Save the file object itself for submission
      } else {
        this.imageUrl = null
        this.create.image = null
      }
    },
    getProvince(token) {
      axios
        .get('/common/province', {
          headers: {
            'ngrok-skip-browser-warning': true,
            Authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          this.provinceData = res.data.resultData // Populate provinceData with response data
          console.log('provinceData', provinceData)
        })
        .catch((error) => {
          //console.error('Error fetching province data:', error)
        })
    },
    getDistrict(selectedProvinceId) {
      // console.log('=====', selectedProvinceId)
      axios
        .get(`/common/district/${selectedProvinceId}`)
        .then((res) => {
          // Process the response from the other API call
          this.districtData = res.data.resultData
          console.log('Response from other API:', districtData)
        })
        .catch((error) => {
          //console.error('Error calling other API:', error)
        })
    },

    getDistrict(selectedProvinceId) {
      axios
        .get(`/common/district/${selectedProvinceId}`)
        .then((res) => {
          // Process the response from the other API call
          this.districtData = res.data.resultData
          console.log('Response from other API:', districtData)
        })
        .catch((error) => {
          //console.error('Error calling other API:', error)
        })
    },
    getVillage(selectedDistrictId) {
      // Make your API call here, using the selectedDistrictId
      // Example:
      axios
        .get(`/common/village/${selectedDistrictId}`)
        .then((res) => {
          // Process the response from the other API call
          this.villageData = res.data.resultData
          console.log('Response from other API:', res.data)
        })
        .catch((error) => {
          //console.error('Error calling other API:', error)
        })
    },

    save() {
      if (
        this.create.unit_name &&
        this.create.number_of_emp &&
        this.create.number_of_van &&
        this.create.lat &&
        this.create.lng &&
        this.create.tel &&
        this.create.address_detail &&
        this.create.selectedVillage
      ) {
        this.saveData()
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ!',
          showConfirmButton: false,
          iconColor: '#f8bb86',
          width: 600,
          padding: '3em',
          timer: 1500,
        })
      }
    },
    onSubmit(event) {
      event.preventDefault()
      this.save()
    },
    async saveData() {
      try {
        // Create a new FormData object
        const formData = new FormData()

        // Get token from localStorage
        const token = localStorage.getItem('token')

        // Append data to FormData
        formData.append('file', this.create.image)
        formData.append('unit_name', this.create.unit_name)
        formData.append('number_emp', this.create.number_of_emp)
        formData.append('number_van', this.create.number_of_van)
        formData.append('lat', this.create.lat)
        formData.append('lng', this.create.lng)
        formData.append('tel', this.create.tel)
        formData.append('address', this.create.address_detail)
        formData.append('village_id', this.create.selectedVillage)
        formData.append('id', Number(this.$route.params.id))

        // Create request configuration
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }

        await axios.put(`/unit/update`, formData, config)

        // Show success message
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ!',
          showConfirmButton: false,
          timer: 1500,
        })

        // Redirect to manage page
        this.$router.push({ path: '/Center/ManageCenter' })
      } catch (error) {
        // Handle error
        console.error('Error updating data:', error)
        // Show error message
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error updating data!',
          text: 'An error occurred while updating the data. Please try again later.',
          showConfirmButton: true,
        })
      }
    },
  },
  mounted() {
    const token = localStorage.getItem('token')
    this.getProvince(token)
    axios
      .get('/unit/view?limit=&page=', {
        headers: {
          'ngrok-skip-browser-warning': true,
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        this.responseData = res.data.resultData
        // console.log(this.$route.params.id)
        // console.log("id====", this.responseData);

        for (const data of this.responseData) {
          // console.log("id====", data.id);
          // console.log(typeof(this.$route.params.id))
          if (data.id === Number(this.$route.params.id)) {
            this.create.unit_name = data.unit_name
            this.create.lat = data.lat
            this.create.lng = data.lng
            this.create.tel = data.tel
            this.create.number_of_emp = data.number_of_emp
            this.create.number_of_van = data.number_of_van
            this.create.address_detail = data.address_detail
            this.create.selectedProvince = data.province_id
            this.create.selectedDistrict = data.district_id
            this.create.selectedVillage = data.village_id
            console.log('f', this.create.selectedDistrict)
            console.log('t', this.create.selectedProvince)
            this.getVillage(this.create.selectedDistrict)
            this.getDistrict(this.create.selectedProvince)
            this.imageUrl = data.file

            this.selectedVillage = data.village_name
            this.selectedDistrict = data.district_name
            this.selectedProvince = data.province_name

            console.log(data)
            // this.name = data.first_aid_title
            // console.log("Selected Currency Name:", this.name);
            // console.log("Selected Currency Image:", this.imagefile);
            break
          }
        }
      })
  },
}
</script>

<style scoped>
.v-application .pb-10 {
  padding-bottom: 0 !important;
}

.image_style {
  margin-top: 70px;
  height: 414px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  border: 3px dashed rgb(95, 95, 95);
}

.input_card {
  margin-top: 70px;
  height: 414px;
  width: 100%;
  border: 3px dashed rgb(95, 95, 95);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input_file_style {
  cursor: pointer;
  background-color: #5269bb;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
}
</style>
