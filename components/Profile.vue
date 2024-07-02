<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          class="mr-5"
          v-bind="attrs"
          v-on="on"
          color="primary"
          size="45"
        >
          <v-icon color="white">mdi-cog-outline</v-icon>
        </v-avatar>
      </template>

      <v-list style="width: 250px" elevation="0">
        <v-container>
          <div style="display: flex; justify-content: center; margin-bottom: 50;">
          <v-icon size="50" color="black">mdi-account-circle-outline</v-icon>
        </div>
          <div v-for="(item, index) in items" :key="index" class="mt-3">
            <v-list-item-title>
              {{ item.title }}{{ item.gender }}{{ item.role }}
            </v-list-item-title>
          </div>
        </v-container>
        <v-divider class="mt-15"></v-divider>
        <v-btn
          style="width: 100%"
          color="white"
          elevation="0"
          @click="Logout"
          type="button"
        >
          <v-icon color="red" size="20">mdi-logout</v-icon>ອອກຈາກລະບົບ</v-btn
        >
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      name: '',
      surname: '',
      gender: '',
      role: '',
      items: [],
    }
  },

  mounted() {
    // console.log(this.$nuxt.$route.path)
    this.name = JSON.parse(localStorage.getItem('name'))
    this.surname = JSON.parse(localStorage.getItem('surname'))
    this.gender = JSON.parse(localStorage.getItem('gender'))
    this.role = JSON.parse(localStorage.getItem('user_type_name'))
    this.items.push({ title: 'ຜູ້ໃຊ້: ' + this.name + ' ' + this.surname })
    this.items.push({ gender: 'ເພດ: ' + this.gender })
    this.items.push({ role: 'ສະຖານະ: ' + this.role })
  },
  methods: {
    Logout() {
      Swal.fire({
        title: 'ຕ້ອງການອອກຈາກລະບົບແທ້ບໍ່ ?',
        text: 'Are you sure ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ',
        iconColor: 'lightblue',
        width: 600,
        padding: '3em',
        position: 'center',
      }).then(async (result) => {
        if (result.isConfirmed) {
          localStorage.clear()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'ດຳເນີນການສຳເລັດ !',
            text: 'Successful !',
            showConfirmButton: false,
            iconColor: 'limegreen',
            width: 600,
            padding: '3em',
            timer: 1500,
          })
          this.$router.push({ path: '/login' })
        }
      })
    },
  },
}
</script>
