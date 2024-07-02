<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>ປ່ຽນລະຫັດຜ່ານຜູ້ໃຊ້ແອັດມິນ</v-card-title>
      <v-container>
        <v-text-field
          v-model="pass1"
          label="ລະຫັດຜ່ານ"
          :type="showpass1 ? 'text' : 'password'"
          :append-icon="showpass1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showpass1 = !showpass1"
        ></v-text-field>
        <v-text-field
          v-model="pass2"
          label="ຢືນຍັນລະຫັດຜ່ານ"
          :type="showpass2 ? 'text' : 'password'"
          :append-icon="showpass2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showpass2 = !showpass2"
        ></v-text-field>
        <v-text-field v-model="confirmchange" type="text">
          <template #label>
            <div>ກະລຸນາພິມ <strong>confirm</strong> ເພື່ອຢືນຢັນ</div>
          </template>
        </v-text-field>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="onChangePassword">ຢືນຢັນ</v-btn>
        <v-btn text color="error" @click="dialog = false">ຍົກເລີກ</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Swal from 'sweetalert2'
import { mapActions, mapState } from 'vuex'
import CryptoJS from 'crypto-js'

export default {
  data() {
    return {
      dialog: false,
      userId: 0,
      pass1: '',
      pass2: '',
      showpass1: false,
      showpass2: false,
      confirmchange: '',
    }
  },
  watch: {
    dialog(newData, oldData) {
      if (newData == false) {
        this.clearData()
      }
    },
  },
  methods: {
    ...mapActions('userBackoffice', [
      'GetUserBackOffice',
      'ChangePassUserBackOffice',
    ]),
    clearData() {
      this.userId = 0
      this.pass1 = ''
      this.pass2 = ''
      this.showpass1 = false
      this.showpass2 = false
      this.confirmchange = ''
    },
    async onChangePassword() {
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
      if (this.confirmchange != 'confirm') {
        return Swal.fire({
          icon: 'error',
          title: 'ກະລຸນາພິມ confirm ເພື່ອຢືນຢັນ',
          position: 'top-end',
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        })
      }
      let encryptPass = CryptoJS.AES.encrypt(
        this.pass2,
        process.env.PASSWORD_KEY
      ).toString()
      try {
        let body = { id: this.userId, newpass: encryptPass }
        let resp = await this.ChangePassUserBackOffice(body)
        if (resp.title == 'success') {
          Swal.fire({
            icon: 'success',
            title: 'ສຳເລັດ!',
            position: 'top-end',
            showConfirmButton: false,
            toast: true,
            timer: 1500,
          })
          this.GetUserBackOffice()
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
