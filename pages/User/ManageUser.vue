<template>
  <div>
    <div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
        "
      >
        <td style="width: 250px">
          <v-text-field
            v-model="search"
            outlined
            style="background-color: white"
            append-icon="mdi-magnify"
            label="ຄົ້ນຫາ"
            single-line
            hide-details
          ></v-text-field>
        </td>

        <td>
          <v-btn @click="onOpenAdd" elevation="0" color="success">
            <v-icon>mdi-plus</v-icon> ເພີ່ມ
          </v-btn>
        </td>
      </div>
      <v-card>
        <v-card-title>
          <strong>ຈັດການຂໍ້ມູນຜູ້ໃຊ້ແອັດມິນ</strong>
          <v-spacer></v-spacer>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="dataUserBackOffice"
          :search="search"
          disable-sort
        >
          <template #[`item.no`]="{ item, index }">
            {{ index + 1 }}
          </template>
          <template #[`item.name`]="{ item, index }">
            {{ item.name }} {{ item.surname }}
          </template>

          <template v-slot:item.options="{ item }">
            <div>
              <div>
                <v-btn
                  @click="onOpenChngePassw(item)"
                  elevation="0"
                  color="primary"
                  text
                  style="width: 100px"
                >
                  <v-icon>mdi-lock-outline</v-icon>ປ່ຽນລະຫັດ
                </v-btn>
              </div>
              <div>
                <v-btn
                  @click="onOpenEdit(item)"
                  elevation="0"
                  color="warning"
                  text
                  style="width: 100px"
                >
                  <v-icon>mdi-square-edit-outline</v-icon>ແກ້ໄຂ
                </v-btn>
              </div>
              <div>
                <v-btn
                  elevation="0"
                  color="error"
                  text
                  @click="onOpenDelete(item)"
                  style="width: 100px"
                >
                  <v-icon>mdi-delete-outline</v-icon>ລົບ
                </v-btn>
              </div>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <UserbackofficeEdit ref="backofficeEdit" />
    <UserbackofficeAdd ref="backofficeAdd" />
    <UserbackofficeDelete ref="backofficeDelete" />
    <UserbackofficePass ref="backofficePass" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import secureStorage from '../../plugins/secure-storage'

export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'ລຳດັບ',
          align: 'center',
          sortable: false,
          value: 'no',
          width: '30px',
          class: 'darken-2 text-subtitle-2 font-weight-black',
        },

        {
          text: 'ຊື່ ແລະ ນາມສະກຸນ',
          align: 'center',
          value: 'name',
          width: '150px',
          class: 'darken-2 text-subtitle-2 font-weight-black',
        },
        {
          text: 'ປະເພດຜູ້ໃຊ້',
          align: 'center',
          value: 'user_type_name',
          width: '100px',
          class: 'darken-2 text-subtitle-2 font-weight-black',
        },
        {
          text: 'ເບີໂທ',
          align: 'center',
          value: 'tel',
          width: '100px',
          class: 'darken-2 text-subtitle-2 font-weight-black',
        },
        // {
        //   text: 'ລະຫັດ',
        //   align: 'center',
        //   value: 'password',
        //   width: '50px',
        //   class: 'darken-2 text-subtitle-2 font-weight-black',
        // },
        {
          text: 'ເພດ',
          align: 'center',
          value: 'gender',
          width: '50px',
          class: 'darken-2 text-subtitle-2 font-weight-black',
        },

        // {
        //   text: 'ບ້ານ',
        //   align: 'center',
        //   value: 'village_name',
        //   width: '100px',
        //   class: 'darken-2 text-subtitle-2 font-weight-black',
        // },
        // {
        //   text: 'ເມືອງ',
        //   align: 'center',
        //   value: 'district_name',
        //   width: '100px',
        //   class: 'darken-2 text-subtitle-2 font-weight-black',
        // },
        // {
        //   text: 'ແຂວງ',
        //   align: 'center',
        //   value: 'province_name',
        //   width: '100px',
        //   class: 'darken-2 text-subtitle-2 font-weight-black',
        // },
        {
          text: 'ຈັດການ',
          align: 'center',
          value: 'options',
          width: '130px',
          class: 'darken-2 text-subtitle-2 font-weight-black',
        },
      ],
    }
  },
  async mounted() {
    this.GetUserBackOffice()
    this.GetDropdown()
    this.GetProvince()
  },
  computed: {
    ...mapState('userBackoffice', ['dataUserBackOffice']),
  },
  methods: {
    ...mapActions('userBackoffice', ['GetUserBackOffice']),
    ...mapActions('dropdown', [
      'GetDropdown',
      'GetProvince',
      'GetDistrict',
      'GetVillage',
    ]),
    onOpenAdd(item) {
      this.$refs.backofficeAdd.dialog = true
    },
    onOpenChngePassw(item) {
      this.$refs.backofficePass.dialog = true
      this.$refs.backofficePass.userId = item.id
    },
    onOpenEdit(item) {
      this.$refs.backofficeEdit.dialog = true
      this.$refs.backofficeEdit.id = item.id
      this.$refs.backofficeEdit.name = item.name
      this.$refs.backofficeEdit.surname = item.surname
      this.$refs.backofficeEdit.tel = item.tel
      this.$refs.backofficeEdit.user_type_id = item.user_type_id
      this.$refs.backofficeEdit.gender_id = item.gender_id
      this.$refs.backofficeEdit.dob_year = Number(
        String(this.$formatdate(item.dob)).split('/')[2]
      )

      this.$refs.backofficeEdit.dob_month = Number(
        String(this.$formatdate(item.dob)).split('/')[1]
      )

      this.$refs.backofficeEdit.dob_date = Number(
        String(this.$formatdate(item.dob)).split('/')[0]
      )
      this.$refs.backofficeEdit.village_id = item.village_id
      this.$refs.backofficeEdit.district_id = item.district_id
      this.$refs.backofficeEdit.province_id = item.province_id
      this.GetDistrict(item.province_id)
      this.GetVillage(item.district_id)
    },
    onOpenDelete(item) {
      this.$refs.backofficeDelete.dialog = true
      this.$refs.backofficeDelete.id = item.id
    },
  },
}
</script>

<style></style>
