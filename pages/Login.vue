<template>
  <v-container>
    <template>
      <div>
        <form @submit.prevent="logIn" style="display: flex; align-items: center; height: 100vh;">
          <v-card class="mx-auto" st max-width="512" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-5 mt-5" align="center">
                  <div><img src="../static/Ellipse 2.png" style="width: 100px; height: 100px;"></img></div>
                  <div><h2> Admin Rescue </h2></div>
                  <div class="mt-10"><strong style="color:darkblue;"> ເຂົ້າສູ່ລະບົບ </strong></div>
                </v-list-item-title>

                <div>
                  <v-text-field
                    label="Tel"
                    v-model="login.tel"
                    outlined
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    v-model="login.password"
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </div>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <template>
                <v-btn class="mb-2" block elevation="0" color="primary" type="submit">
                  Login
                </v-btn>
              </template>
            </v-card-actions>
          </v-card>
        </form>
      </div>
    </template>

    <v-dialog v-model="errorDialog" max-width="400">
      <v-card>
        <v-card-title class="headline error--text">ຜິດພາດ</v-card-title>
        <v-card-text>{{ errorMessage }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="errorDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from '../assets/base_api'
import secureStorage from '../plugins/secure-storage'
import CryptoJS from 'crypto-js'

export default {
  layout: 'empty',
  data() {
    return {
      errorMessage:'',
      show1: false,
      login: { tel: '', password: '' },
      errorDialog: false,
    }
  },

  methods: {
    logIn() {
      const encrypted = CryptoJS.AES.encrypt(
        this.login.password,
        process.env.PASSWORD_KEY
      ).toString()

      let myData = { tel: this.login.tel, password: encrypted }

      axios
        .post('authen/login', myData)
        .then((response) => {
          this.messages = response.data.msg
          let savetoken = response.data.resultData.access_token
          let sevename = response.data.resultData.name
          let sevesurname = response.data.resultData.surname
          let sevegender = response.data.resultData.gender
          let severole = response.data.resultData.user_type_name
          secureStorage.setItem('token', String(savetoken))
          secureStorage.setItem(
            'permission',
            response.data.resultData.permission
          )
          localStorage.setItem('token', String(savetoken))
          localStorage.setItem('name', JSON.stringify(sevename))
          localStorage.setItem('surname', JSON.stringify(sevesurname))
          localStorage.setItem('gender', JSON.stringify(sevegender))
          localStorage.setItem('user_type_name', JSON.stringify(severole))
          this.$store.dispatch('setToken', JSON.stringify(savetoken)) // Dispatch 'setToken' action with the retrieved token
          this.$router.replace('/')
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            this.errorMessage = error.response.data.message // Set error message from server response
          } else {
            this.errorMessage = 'ເກີດຂໍ້ຜິດພາດ ກະລຸນາລອງອີກຄັ້ງ' // Generic error message
          }
          this.errorDialog = true // Open error dialog
        })
    },
  },
}
</script>
