<template>
  <v-dialog v-model="dialog" max-width="800" persistent>
    <v-card>
      <v-card-title>ເພີ່ມຜູ້ໃຊ້ແອັດມິນ</v-card-title>
      <v-container>
        <v-row>
          <v-col cols="6" class="py-0">
            <v-text-field v-model="name" label="ຊື່"></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field v-model="surname" label="ນາມສະກຸນ"></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field v-model="tel" label="ເບີໂທ"></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select
              v-model="gender_id"
              :items="dropdownDataForApp.gender"
              :item-text="(item) => item.gender"
              :item-value="(item) => item.id"
              label="ເພດ"
            ></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select
              v-model="user_type_id"
              :items="dropdownDataForApp.user_type"
              :item-text="(item) => item.user_type_name"
              @change="onChangeUserType"
              :item-value="(item) => item.id"
              label="ປະເພດຜູ້ໃຊ້"
            ></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select
              :disabled="user_type_id != 3"
              v-model="unit_id"
              :items="dataUnit"
              :item-text="(item) => item.unit_name"
              :item-value="(item) => item.id"
              label="ໜ່ວຍ"
            ></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field
              v-model="pass1"
              label="ລະຫັດຜ່ານ"
              :type="showpass1 ? 'text' : 'password'"
              :append-icon="showpass1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showpass1 = !showpass1"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field
              v-model="pass2"
              label="ຢືນຍັນລະຫັດຜ່ານ"
              :type="showpass2 ? 'text' : 'password'"
              :append-icon="showpass2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showpass2 = !showpass2"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="success" @click="createItem">ເພີ່ມ</v-btn>
        <v-btn text color="error" @click="dialog = false">ຍົກເລີກ</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Swal from 'sweetalert2'
import CryptoJS from 'crypto-js'
export default {
  data() {
    return {
      pass1: '',
      pass2: '',
      showpass1: false,
      showpass2: false,
      dialog: false,
      unit_id: '',
      name: '',
      surname: '',
      tel: '',
      user_type_id: '',
      gender_id: '',
    }
  },
  computed: {
    ...mapState('dropdown', ['dropdownDataForApp']),
    ...mapState('userApp', ['dataUnit']),
  },

  methods: {
    ...mapActions('userApp', ['GetUserApp', 'CreateUserApp']),
    onChangeUserType() {
      this.unit_id = ''
    },
    clearData() {
      this.pass1 = ''
      this.pass2 = ''
      this.showpass1 = false
      this.showpass2 = false
      this.unit_id = ''
      this.name = ''
      this.surname = ''
      this.tel = ''
      this.user_type_id = ''
      this.gender_id = ''
    },
    async createItem() {
      if (this.pass1 != this.pass2 || !this.pass1 || !this.pass2) {
        return Swal.fire({
          icon: 'error',
          title: 'ລະຫັດຜ່ານບໍ່ກົງກັນ!',
          position: 'top-end',
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        })
      }
      let encryptPass = CryptoJS.AES.encrypt(
        this.pass1,
        process.env.PASSWORD_KEY
      ).toString()
      let myData = {
        user_type_id: this.user_type_id,
        tel: this.tel,
        unit_id: this.unit_id,
        uname: this.name,
        usurname: this.surname,
        gender_id: this.gender_id,
        pass: encryptPass,
      }
      try {
        let resp = await this.CreateUserApp(myData)
        if (resp.title == 'success') {
          Swal.fire({
            icon: 'success',
            title: 'ສຳເລັດ!',
            position: 'top-end',
            showConfirmButton: false,
            toast: true,
            timer: 1500,
          })
          this.GetUserApp()
          this.dialog = false
          this.clearData()
        } else {
          Swal.fire({
            icon: 'error',
            title: resp?.title ? resp?.title : 'ເກີດຂໍ້ຜິດພາດ!',
            position: 'top-end',
            showConfirmButton: false,
            toast: true,
            timer: 1500,
          })
        }
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: error?.title ? error?.title : 'ເກີດຂໍ້ຜິດພາດ!',
          position: 'top-end',
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        })
      }
    },
  },
}
</script>
