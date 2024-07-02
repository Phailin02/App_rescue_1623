<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="centerItem">
        <strong align="center">ຍືນຍັນການລົບ</strong></v-card-title
      >
      <v-card-text align="center">
        <v-icon size="100" color="#f8bb86">mdi-alert-outline</v-icon>
      </v-card-text>

      <v-card-text align="center"> ຕ້ອງການລົບຂໍ້ມູນແທ້ບໍ? </v-card-text>
      <v-divider />
      <v-card-actions class="centerItem">
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="onDelData()">ລົບຂໍ້ມູນ</v-btn>
        <v-btn color="primary" text @click="dialog = false"> ຍົກເລີກ </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      dialog: false,
      id: null,
    }
  },
  methods: {
    ...mapActions('userApp', ['GetUserApp', 'DeleteUserApp']),

    async onDelData() {
      try {
        const resp = await this.DeleteUserApp({
          id: this.id,
        })
        if (resp.title == 'success') {
          Swal.fire({
            icon: 'success',
            title: 'ລົບສຳເລັດ!',
            position: 'top-end',
            showConfirmButton: false,
            toast: true,
            timer: 1500,
          })
          this.GetUserApp()
          this.dialog = false
        } else {
          Swal.fire({
            icon: 'error',
            title: resp.title ? resp?.title : 'ເກີດຂໍ້ຜິດພາດ!',
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
          title: error.title ? error?.title : 'ເກີດຂໍ້ຜິດພາດ!',
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
