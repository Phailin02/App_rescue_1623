<template>
  <v-container>
    <button @click="goBack" class="mb-5" style="font-size: 15pt; color: white;">
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
              <h1 style="text-align: center">
                ເພີ່ມຂໍ້ມູນການປະຖົມພະຍາບານເບື່ອງຕົ້ນ
              </h1>
              <form @submit.prevent="onSubmit" class="mt-5">
                <v-text-field
                  label="ຫົວຂໍ້"
                  outlined
                  v-model="create.title"
                ></v-text-field>
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="ເນື້ອຫາ"
                  v-model="create.describe"
                  rows="12"
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
import axios from '../../assets/base_api'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      imageUrl: null,
      create: { image: '', title: '', describe: '' },
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
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

    save() {
      if (this.create.title && this.create.describe && this.create.image) {
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
      const formData = new FormData()
      const token = localStorage.getItem('token')
      formData.append('file', this.create.image)
      formData.append('title', this.create.title)
      formData.append('describe', this.create.describe)

      try {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
        console.log(config)
        await axios.post('/firstaid/create', formData, config)
        // Upon successful submission, show a success message or navigate the user to a different page
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'ບັນທືກຂໍ້ມູນສຳເລັດ!',
          showConfirmButton: false,
          timer: 1500,
        })
        this.$router.push({ path: '/Aid/ManageAid' })
      } catch (error) {
        console.error('Error saving data:', error)
        // Handle error
        // Show a user-friendly error message
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error saving data!',
          text: 'An error occurred while saving the data. Please try again later.',
          showConfirmButton: true,
        })
      }
    },
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
