<template>
  <v-app>
    <v-main style="background-color: #5269BB;">
      <div class="nav" style="z-index: 1000;">
        <td>
          <div v-if="drawer == false">
            <v-btn icon @click.stop=";(mini = !mini), (drawer = !drawer)">
              <v-icon color="blue" size="35">mdi-menu-close</v-icon>
            </v-btn>
          </div>
          <div v-else>
            <v-btn icon @click.stop=";(mini = !mini), (drawer = !drawer)">
              <v-icon color="blue" size="35">mdi-menu-open</v-icon>
            </v-btn>
          </div>
        </td>

        <td>
          <div>
            <v-list-item-title><Profile/></v-list-item-title>
          </div>
        </td>
      </div>

      <v-divider />
      <div class="pa-5">
        <Nuxt />
      </div>
    </v-main>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <img src="../static/Ellipse 2.png"></img>
        </v-list-item-avatar>
        <v-list-item-title>Admin Rescue</v-list-item-title>

      </v-list-item>

      <v-divider />

      <v-list dense>

        
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
          :class="{
            active: item.params && item.params.includes($route.path),
          }"
          v-show="item.show"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import Swal from 'sweetalert2'
import secureStorage from '../plugins/secure-storage'

export default {
  data() {
    return {
      ws: null,
      message: 'hello from client',
      name: null,
      surname: null,
      drawer: true,
      mini: false,
      permission: {},
      items: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard-outline',
          to: '/',
          params: '/',
          show: true,
        },
        {
          title: 'Users',
          icon: 'mdi-account-group-outline',
          to: '/User/ManageUser',
          params: [
            '/User/ManageUser',
            '/User/ManageUser2',
            '/User/ManageUser3',
          ],
          show:
            secureStorage.getItem('permission')?.manage_user_backoffice == 1
              ? true
              : false,
        },
        {
          title: 'Users App',
          icon: 'mdi-account-group-outline',
          to: '/Userapp/ManageUser',
          params: ['/Userapp/ManageUser'],
          show:
            secureStorage.getItem('permission')?.manage_user_app == 1
              ? true
              : false,
        },
        {
          title: 'Center',
          icon: 'mdi-domain',
          to: '/Center/ManageCenter',
          params: ['/Center/ManageCenter'],
          show:
            secureStorage.getItem('permission')?.manage_unit == 1
              ? true
              : false,
        },

        {
          title: 'Hospital',
          icon: 'mdi-hospital-building',
          to: '/Hospital/ManageHospital',
          params: ['/Hospital/ManageHospital'],
          show:
            secureStorage.getItem('permission')?.manage_hospital == 1
              ? true
              : false,
        },

        {
          title: 'History',
          icon: 'mdi-history',
          to: '/History/ManageHistory',
          params: ['/History/ManageHistory'],
          show:
            secureStorage.getItem('permission')?.manage_history == 1
              ? true
              : false,
        },

        {
          title: 'Aid',
          icon: 'mdi-medical-bag',
          to: '/Aid/ManageAid',
          params: ['/Aid/ManageAid', '/Aid/Create', '/Aid/Edit/:id'],
          show:
            secureStorage.getItem('permission')?.manage_first_aid == 1
              ? true
              : false,
        },
      ],
    }
  },
  mounted() {
    // Retrieve data from local storage
console.log(this.$nuxt.$route.path);
    this.name = JSON.parse(localStorage.getItem('name'))
    this.surname = JSON.parse(localStorage.getItem('surname'))
    // Connect to the WebSocket server
    this.ws = new WebSocket('ws://localhost:8080')

    // Handle WebSocket events
    this.ws.onopen = () => {
      console.log('WebSocket connected')
    }

    this.ws.onmessage = (event) => {
      // console.log('Received: ', event.data)
      if (event.data == 'new case from app') {
        this.PlaySound()
        Swal.fire({
          icon: 'info',
          title: 'ມີແຈ້ງເຫດໃຫມ່ເຂົ້າມາ',
          position: 'top-end',
          showConfirmButton: false,
          toast: true,
          timer: 3000,
        })
        this.$router.push('/')
      }
      // Handle received messages
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket error: ', error)
    }

    this.ws.onclose = () => {
      console.log('WebSocket connection closed')
      this.ws.onopen = () => {
        console.log('WebSocket connectioned')
      }
    }
  },
  methods: {
    PlaySound() {
      console.log('play audio');
      try {
        this.audio = new Audio(require("@/assets/sounds/noti.wav").default);
        this.audio.play();
      } catch (error) {
        // console.log(error);
      }
    },
    sendMessage() {
      // Send a message to the WebSocket server
      console.log(this.message)
      this.ws.send(this.message)
    },
    Logout() {
      // localStorage.clear();
      // this.$router.push("/login");

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

<style>
.nav {
  height: 56px;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

<style lang="scss">
.active {
  background-color: rgb(199, 230, 255);
}

body {
  overflow: hidden;
}

div.a {
  white-space: nowrap;
  width: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
