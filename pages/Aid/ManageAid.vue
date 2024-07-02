<template>
  <div>
    <div
      style="display: flex; justify-content: space-between; margin-bottom: 25px"
    >
      <td style="width: 250px">
        <v-text-field
          v-model="search"
          outlined
          style="background-color: white;"
          append-icon="mdi-magnify"
          label="ຄົ້ນຫາ"
          single-line
          hide-details
        ></v-text-field>
      </td>

      <td>
        <Nuxt-link to="/Aid/Create">
          <v-btn elevation="0" color="success"
            ><v-icon>mdi-plus</v-icon> ເພີ່ມ</v-btn
          ></Nuxt-link
        >
      </td>
    </div>

    <div>
      <v-card>
        <v-card-title>
          <strong>ຈັດການຂໍ້ມູນການປະຖົມພະຍາບານເບື່ອງຕົ້ນ</strong>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table :headers="headers" :items="responseData" :search="search">
          <template v-slot:item.image="{ item }">
            <div>
              <img
                :src="item.file"
                style="height: 50px; width: 50px; object-fit: cover"
              />
            </div>
          </template>
          <template v-slot:item.first_aid_title="{ item }">
            <div class="a">
              {{ item.first_aid_title }}
            </div>
          </template>
          <template v-slot:item.description="{ item }">
            <div class="b">
              {{ item.description }}
            </div>
          </template>
          <template v-slot:item.options="{ item }">
            <div>
              <v-btn
                elevation="0"
                color="primary"
                style="width: 100px"
                text
                @click="openDialog(item)"
                ><v-icon>mdi-information-outline</v-icon>ເພີ່ມເຕີມ</v-btn
              >
              <Nuxt-link :to="`/Aid/Edit/${item.id}`">
                <v-btn elevation="0" color="warning" text style="width: 100px"
                  ><v-icon>mdi-square-edit-outline</v-icon>ແກ້ໄຂ</v-btn
                >
              </Nuxt-link>
              <v-btn
                elevation="0"
                color="error"
                text
                @click="confirmDelete(item)"
                style="width: 100px"
                ><v-icon>mdi-delete-outline</v-icon>ລົບ</v-btn
              >
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <v-dialog v-model="dialogDelete" max-width="400">
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
          <v-btn color="error" text @click="dialogDelete = false"
            >ຍົກເລີກ</v-btn
          >
          <v-btn color="success" text @click="deleteItem(itemToDelete.id)"
            >ລົບຂໍ້ມູນ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" scrollable max-width="500">
      <v-card>
        <v-card-title style="display: flex; justify-content: space-between">
          <strong>Info </strong>
          <span style="font-size: 60%">
            <v-icon size="20">mdi-clock-outline</v-icon> {{ selectedCreate_at }}
          </span>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <v-spacer></v-spacer>
        <v-card-text style="height: 500px">
          <!-- Your Info dialog content goes here -------------------------------------------------------------------------------------->
          <img
            :src="selectedImage"
            alt="Info Image"
            style="max-width: 100%"
            class="mt-5"
          />
          <strong>{{ selectedTitle }}</strong>
          <p>{{ selectedDescription }}</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="grey" text @click="dialog = false">
            <v-icon>mdi-close</v-icon>close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from '../../assets/base_api'
export default {
  data() {
    return {
      selectedImage: '',
      selectedCreate_at: '',
      selectedTitle: '',
      selectedDescription: '',
      dialog: false,
      selectedItem: null,
      search: '',
      responseData: [],
      headers: [
        {
          text: '#ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'ຮູບພາບ', value: 'image' },
        { text: 'ຫົວຂໍ້', value: 'first_aid_title' },
        { text: 'ເນື້ອຫາ', value: 'description' },
        { text: 'ເວລາ', value: 'create_at' },
        { text: 'ເຄື່ອງມື', value: 'options' },
      ],
      dialogDelete: false,
      itemToDelete: null,
    }
  },
  methods: {
    ///infoDialogs--------------------------------------------------------------------------------------->
    openDialog(item) {
      this.selectedImage = item.file
      this.selectedCreate_at = item.create_at
      this.selectedTitle = item.first_aid_title
      this.selectedDescription = item.description
      this.dialog = true
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toISOString().slice(0, 10)
    },
    showID(item) {
      this.selectedItem = item.id
    },
    confirmDelete(item) {
      this.itemToDelete = item
      this.dialogDelete = true
    },

    async deleteItem(itemId) {
      try {
        const access_token = localStorage.getItem('token')
        let config = {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          data: {
            id: itemId,
          },
        }
        await axios.delete('/firstaid/delete', config)

        // Remove the deleted item from the responseData array
        const index = this.responseData.findIndex((item) => item.id === itemId)
        if (index !== -1) {
          this.responseData.splice(index, 1)
        }
        this.dialogDelete = false
      } catch (error) {
        console.error('Error deleting item:', error)
      }
    },
  },
  async mounted() {
    await axios
      .get('/firstaid/view?limit=&page=')
      .then((response) => {
        this.responseData = response.data.resultData.map((item) => ({
          ...item,
          create_at: this.formatDate(item.create_at),
        }))
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching data:', error)
      })
  },
}
</script>

<style>
div.a {
  white-space: nowrap;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
div.b {
  white-space: nowrap;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.centerItem {
  display: flex;
  justify-content: center;
}
</style>
