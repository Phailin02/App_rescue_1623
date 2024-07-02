<template>

  <div>
    <v-container>
      <div>
        <h2 style="color: white; margin-bottom: 10px">Dashboard</h2>
      </div>

      <div>
        <v-row>
          
          <v-col cols="4">
            <v-card elevation="2" color="blue" style="height: 220px;">
              <v-container>

               
                <v-container>
                <div style=" justify-content: center; height: 100%">

                      <div style="display: flex; justify-content: center;"><v-icon size="50" color="white">mdi-bell-badge-outline</v-icon></div>
                   
                    <div style="color: white; display: flex; justify-content: center; margin-top: 20px; font-size: 20px;"><strong>ອຸບັດຕິເຫດທີ່ແຈ້ງເຂົ້າມາ</strong></div>
                  <div style="display: flex; justify-content: center; margin-top: 20px;">
                    <v-avatar color="white" size="60"><span style="font-size: 25px;">{{ responseData.length }}</span></v-avatar>
                  </div>



                </div>
                </v-container>
              </v-container>
            </v-card>
    
          </v-col>

          <v-col cols="8">
            <div>
     
                <v-row>
                  <v-col col="6">
                    <v-card elevation="0" color="white">
                      <v-container>
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <v-icon size="50" color="red">mdi-hospital-building</v-icon>
                            </div>
                            <div>ໂຮງໝໍ</div>
                          </v-col>
                          <v-col cols="6" style="display: flex; justify-content: end">
                            <v-avatar color="red" size="60" style="color: white;"><span style="font-size: 25px;">{{ hospital.length }}</span></v-avatar>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-col>
                  <v-col col="6">
                    <v-card elevation="0" color="white" max-height="500">
                      <v-container>
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <v-icon size="50" color="blue">mdi-account-group-outline</v-icon>
                            </div>
                            <div>ຜູ້ໃຊ້ລະບົບ</div>
                          </v-col>
                          <v-col cols="6" style="display: flex; justify-content: end">
                            <v-avatar color="blue" size="60" style="color: white;"><span style="font-size: 25px;">{{ user.length }}</span></v-avatar>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col col="6">
                    <v-card elevation="0" color="white" max-height="500">
                      <v-container>
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <v-icon size="50" color="yellow">mdi-domain</v-icon>
                            </div>
                            <div>ສູນກູ້ໄພ</div>
                          </v-col>
                          <v-col cols="6" style="display: flex; justify-content: end">
                            <v-avatar color="yellow" size="60"><span style="font-size: 25px;">{{ unit.length }}</span></v-avatar>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-col>
                  <v-col col="6">
                    <v-card elevation="0" color="white" max-height="500">
                      <v-container>
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <v-icon size="50" color="orange">mdi-message-alert-outline</v-icon>
                            </div>
                            <div>ຈຳນວນເຫດ</div>
                          </v-col>
                          <v-col cols="6" style="display: flex; justify-content: end">
                            <v-avatar color="orange" size="60"><span style="font-size: 25px;">{{ Allcase.length }}</span></v-avatar>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-col>
                </v-row>
            
            </div>
          </v-col>
        </v-row>
      </div>

      <div style="margin-top: 25px;" v-show="isSuperAdmin">
        <template>
          <v-card>
            <v-card-title>ແຈ້ງເຕືອນ<v-spacer></v-spacer></v-card-title>
            <v-data-table
              :items-per-page="5"
              :headers="headers"
              :items="dataInfo"
              :search="search"
            >
              <template v-slot:item.options="{ item }">
                <div>
                  <v-btn elevation="0" color="primary" style="width: 100px" text @click="openDialog(item)">
                    <v-icon>mdi-information-outline</v-icon>ເພີ່ມເຕີມ
                  </v-btn>

                  <v-btn elevation="0" color="success" style="width: 100px" @click="confirm(item)">
                    <v-icon>mdi-check</v-icon>ຍອມຮັບ
                  </v-btn>

                  <v-btn elevation="0" color="error" style="width: 100px" @click="cancel(item)">
                    <v-icon>mdi-text-box-remove-outline</v-icon>ປະຕິເສດ
                  </v-btn>
                </div>
              </template>

              <template v-slot:item.status="{ item }">
                <div>
                  <span v-if="item.stt_case === 'ລໍຖ້າກູ້ໄພຮັບເຄສ'" style="color: green;">{{ item.stt_case }}</span>
                  <span v-else-if="item.stt_case === 'ປະຕິເສດ'" style="color: red;">{{ item.stt_case }}</span>
                  <span v-else style="color: grey;">{{ item.stt_case }}</span>
                </div>
              </template>
            </v-data-table>
          </v-card>
        </template>
      </div>

<!-- ----------------------------------------------------------------------------------------------- -->
      <div class="mt-7">
    <div>
      <v-card>
        <v-card-title>
          <strong>ປະຫວັດການແຈ້ງອຸບັດຕິເຫດ</strong>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="headers2"
          :items="dataHistories"
          :search="search"
          disable-sort
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              label="ຄົ້ນຫາ"
              class="mx-4"
            ></v-text-field>
          </template>

          <template #[`item.no`]="{ item, index }">
            {{ index + 1 }}
          </template>
          <template #[`item.case_info.description`]="{ item, index }">
            <div
              style="
                width: 100px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ item.case_info.description }}
            </div>
          </template>
          <template #[`item.case_info.stt_case`]="{ item, index }">
            <div
              :class="
                item.case_info.stt_case_id == 4
                  ? 'success--text'
                  : item.case_info.stt_case_id == 2
                  ? 'warning--text'
                  : item.case_info.stt_case_id == 3
                  ? 'primary--text'
                  : 'error--text'
              "
            >
              {{ item.case_info.stt_case }}
            </div>
          </template>

          <template #[`item.case_info.file_name`]="{ item, index }">
            <div
              @click=";(pathImg = item.case_info.file_name), (showImg = true)"
            >
              <img
                :src="item.case_info.file_name"
                style="height: 50px; width: 50px; object-fit: cover"
              />
            </div>
          </template>
          <template #[`item.case_info.report_time`]="{ item, index }">
            <div>
              {{ $FormatDateTime(item.case_info.report_time) }}
            </div>
          </template>

          <template v-slot:item.options="{ item }">
            <div>
              <v-btn
                elevation="0"
                color="primary"
                style="width: 100px"
                text
                @click="onOpenDetail(item)"
                ><v-icon>mdi-information-outline</v-icon>ເພີ່ມເຕີມ</v-btn
              >
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <HistoryDialog ref="historyDialog" />
    <v-dialog v-model="showImg" width="700">
      <img :src="pathImg" alt="" style="width: 700px; height: 700px" />
    </v-dialog>
  </div>

    </v-container>

    
    <v-dialog v-model="dialog" scrollable max-width="500">
      <v-card>
        <v-card-title style="display: flex; justify-content: space-between">
          <strong>Info </strong>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <v-spacer></v-spacer>
        <v-card-text style="height: 500px">
          <!-- Your Info dialog content goes here -->
          <img :src="selectedImage" alt="Info Image" style="width: 100%" class="mt-5" />
          <p style="font-size: 15pt" class="my-5">
            <strong>{{ unit_name }}</strong>
          </p>

          <div style="border: 2px solid #ababab; border-radius: 10px; padding: 12px;">
            <p><h2>ລາຍລະອຽດເຫດການ</h2></p>
            <!-- <p><v-icon>mdi-map-marker-outline</v-icon> ພິກັດ:( {{ name }}, {{ lng }})</p> -->
            <p><v-icon>mdi-map-marker-outline</v-icon> ພິກັດ:                

                    <a
                      :href="`https://www.google.com/maps?q=
                        ${lat},${lng}`"
                      target="_blank"
                    >
                      Google Map
                      <v-icon size="19" color="#1976d2">mdi-open-in-new</v-icon>
                    </a>
                  </p>
            <p><v-icon>mdi-calendar-range</v-icon> ວັນທີ: {{ selectedCreate_at1 }}</p>
            <p><v-icon>mdi-clock-time-four-outline</v-icon> ເວລາ: {{ selectedCreate_at2 }}</p>
            <p><strong style="font-size: 12pt">ຄຳອະທິບາຍ:</strong><br />{{ description }}</p>
          </div>

          <div style="border: 2px solid #ababab; border-radius: 10px; padding: 12px; margin-top: 10px;">
            <p><h2>ລາຍລະອຽດຜູ້ແຈ້ງ</h2></p>
            <p><v-icon>mdi-phone-outline</v-icon> ເບີໂທ: {{ tel }}</p>
            <p><v-icon>mdi-account-outline</v-icon> ຊື່ & ນາມສະກຸນ: {{ name }} {{ surname }}</p>
            <p><v-icon>mdi-gender-male-female</v-icon> ເພດ: {{ gender }}</p>
            <!-- <p><v-icon>mdi-account-group-outline</v-icon> ແຈ້ງໄປທີ່ໜ່ວຍ: {{ unit_name }}</p> -->
          </div>



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

    <!-- Confirm Dialog -->
    <v-dialog v-model="confirmDialog" max-width="500">
      <v-card>
        <v-card-title>Confirm Action</v-card-title>
        <v-card-text>ທ່ານໝັ້ນໃຈບໍ່ວ່າຈະຍືນຍັນ??</v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="confirmAction">ຍືນຍັນ</v-btn>
          <v-btn color="grey" text @click="confirmDialog = false">ຍົກເລີກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Cancel Dialog -->
    <v-dialog v-model="cancelDialog" max-width="500">
      <v-card>
        <v-card-title>Confirm Action</v-card-title>
        <v-card-text>ທ່ານໝັ້ນໃຈບໍ່ວ່າຈະຍືນຍັນ??</v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="cancelAction">ປະຕິເສດ</v-btn>
          <v-btn color="grey" text @click="cancelDialog = false">ຍົກເລີກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from '../store/baseApi'
import secureStorage from '../plugins/secure-storage'
export default {
  data() {
    return {
      isSuperAdmin:secureStorage.getItem('permission')?.manage_user_backoffice == 1
              ? false
              : true,
      search:'',
      showImg: false,
      pathImg: '',
      selectedImage:'',
      unit_name:'',
      name:'',
      surname:'',
      lat:'',
      lng:'',
      selectedCreate_at1:'',
      selectedCreate_at2:'',
      description:'',
      tel:'',
      gender:'',
      Allcase:[],
      hospital: [],
      user: [],
      unit: [],
      dialog: false,
      confirmDialog: false,
      cancelDialog: false,
      selectedItem: null,
      responseData: [],
      dataInfo: [],
      headers: [
        { text: '#ID', align: 'start', sortable: false, value: 'id' },
        { text: 'ວັນທີ', value: 'date' },
        { text: 'ເວລາ', value: 'time' },
        { text: 'lat', value: 'lat' },
        { text: 'lng', value: 'lng' },
        { text: 'ສະຖານະ', value: 'status' },
        { text: 'ເຄື່ອງມື', value: 'options' },
      ],
      headers2: [
        {
          text: 'ລຳດັບ',
          align: 'center',
          sortable: false,
          value: 'no',
          width: '30px',
          class: 'darken-2 text-subtitle-2 font-weight-black',
        },
        {
          text: 'ຮູບ',
          align: 'center',
          value: 'case_info.file_name',
          width: '100px',
          class: 'darken-2 text-subtitle-2 font-weight-black',
        },
        {
          text: 'ລາຍລະອຽດ',
          align: 'center',
          value: 'case_info.description',
          width: '100px',
          class: 'darken-2 text-subtitle-2 font-weight-black',
        },
        {
          text: 'ເວລາແຈ້ງ',
          align: 'center',
          value: 'case_info.report_time',
          width: '130px',
          class: 'darken-2 text-subtitle-2 font-weight-black',
        },
        {
          text: 'ຮັບໂດຍແອັດມິນ',
          align: 'center',
          value: 'admin_update_stt_info.name',
          width: '130px',
          class: 'darken-2 text-subtitle-2 font-weight-black',
        },
        {
          text: 'ເບີໂທແອັດມິນ',
          align: 'center',
          value: 'admin_update_stt_info.tel',
          width: '100px',
          class: 'darken-2 text-subtitle-2 font-weight-black',
        },
        {
          text: 'ສະຖານະ',
          align: 'center',
          value: 'case_info.stt_case',
          width: '120px',
          class: 'darken-2 text-subtitle-2 font-weight-black',
        },
        {
          text: 'ລາຍລະອຽດ',
          align: 'center',
          value: 'options',
          width: '130px',
          class: 'darken-2 text-subtitle-2 font-weight-black',
        },
      ],
    }
  },

  async mounted() {
    this.GetHistory()
    try {
      const response = await this.fetchData()
      const response2 = await this.fetchDataAll()
      const res1 = await this.gethospital()
      const res2 = await this.getunit()
      const res3 = await this.getuser()
      this.role = JSON.parse(localStorage.getItem('user_type_name'))
      this.Allcase = response2.data.resultData
      this.hospital = res1.data.resultData
      this.unit = res2.data.resultData
      this.user = res3.data.resultData
      this.responseData = response.data.resultData
      this.responseData1 = this.responseData.map((item) => ({
        item: item,
        caseInfo: item.case_info,
      }))

      this.dataInfo = this.responseData1.map((info, index) => ({
        id: index + 1,
        caseID: info.caseInfo.id,
        image: info.caseInfo.file_name,
        lat: info.caseInfo.lat,
        lng: info.caseInfo.lng,
        stt_case: info.caseInfo.stt_case,
        description: info.caseInfo.description,
        number_of_emp: '',
        date: this.formatDateTime1(info.caseInfo.report_time),
        time: this.formatDateTime2(info.caseInfo.report_time),
        options: info.item,
      }))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  },
  methods: {
    ...mapActions('historyStore', ['GetHistory']),
    onOpenDetail(item) {
      this.$refs.historyDialog.dialog = true
      this.$refs.historyDialog.dataAccident = item
    },
    openDialog(item) {
      this.selectedImage = item.image
      this.selectedCreate_at1 = item.date
      this.selectedCreate_at2 = item.time
      this.description = item.description
      this.lat = item.lat
      this.lng = item.lng
      this.tel = item.options.user_report_info.tel
      this.name = item.options.user_report_info.name
      this.surname = item.options.user_report_info.surname
      this.gender = item.options.user_report_info.gender
      this.unit_name = item.options.user_report_info.unit_name

      this.dialog = true
    },

    // confirmDialog ---------------------------------------------------------------------------------
    confirm(item) {
      // Store the selected item
      this.selectedItem = item
      // Open the confirm dialog
      this.confirmDialog = true
    },

    // cancelDialog ---------------------------------------------------------------------------------
    cancel(item) {
      // Store the selected item
      this.selectedItem = item
      // Open the cancel dialog
      this.cancelDialog = true
    },

    // confirmDialog ---------------------------------------------------------------------------------
    async confirmAction() {
      const access_token = localStorage.getItem('token')
      let data = JSON.stringify({
        case_id: this.selectedItem.caseID + '',
        stt_case_id: '2',
      })
      window.location.reload()
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }

      const update = await axios.put(
        '/reportaccident/update/casestatus',
        {
          case_id: this.selectedItem.caseID + '',
          stt_case_id: '2',
        },
        config
      )
      console.log('Case status updated:', update)
      this.confirmDialog = false
    },

    // cancelDialog ---------------------------------------------------------------------------------
    async cancelAction() {
      const access_token = localStorage.getItem('token')
      let data = JSON.stringify({
        case_id: this.selectedItem.caseID + '',
        stt_case_id: '5',
      })
      window.location.reload()
      let config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }

      const update = await axios.put(
        '/reportaccident/update/casestatus',
        {
          case_id: this.selectedItem.caseID + '',
          stt_case_id: '5',
        },
        config
      )
      console.log('Case status updated:', update)
      // Close the cancel dialog after confirmation
      this.cancelDialog = false
    },

    async fetchData() {
      const access_token = localStorage.getItem('token')
      console.log (typeof access_token)
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
      return await axios.get(
        '/reportaccident/view/accidentbysttcase?stt_case_id=1',
        config
      )
    },

    async fetchDataAll() {
      const access_token = localStorage.getItem('token')
      console.log (typeof access_token)
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
      return await axios.get(
        '/reportaccident/view/accidentbysttcase?stt_case_id=',
        config
      )
    },


    async gethospital() {
      const access_token = localStorage.getItem('token')
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
      return await axios.get('/hospital/view?limit=&page=', config) || []
    },
    async getunit() {
      const access_token = localStorage.getItem('token')
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
      return await axios.get('/unit/view?limit=&page=', config) || []
    },
    async getuser() {
      const access_token = localStorage.getItem('token')
      let config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
      return await axios.get('/userapp/view?limit=&page=', config) || []
    },

    formatDateTime1(dateTimeString) {
      const dateTime = new Date(dateTimeString)
      const year = dateTime.getFullYear()
      const month = ('0' + (dateTime.getMonth() + 1)).slice(-2)
      const day = ('0' + dateTime.getDate()).slice(-2)
      const hours = ('0' + dateTime.getHours()).slice(-2)
      const minutes = ('0' + dateTime.getMinutes()).slice(-2)
      const seconds = ('0' + dateTime.getSeconds()).slice(-2)
      return `${year}-${month}-${day}`
    },
    formatDateTime2(dateTimeString) {
      const dateTime = new Date(dateTimeString)
      const year = dateTime.getFullYear()
      const month = ('0' + (dateTime.getMonth() + 1)).slice(-2)
      const day = ('0' + dateTime.getDate()).slice(-2)
      const hours = ('0' + dateTime.getHours()).slice(-2)
      const minutes = ('0' + dateTime.getMinutes()).slice(-2)
      const seconds = ('0' + dateTime.getSeconds()).slice(-2)
      return `${hours}:${minutes}:${seconds}`
    },
  },
  computed: {
    filteredData() {
      // Filter out the item with id = 1
      return this.data.filter(item => item.id !== 1);
    },
    ...mapState('historyStore', ['dataHistories']),
    
  }
}
</script>
