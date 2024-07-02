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
          <strong>ຈັດການຂໍ້ມູນຜູ້ໃຊ້ແອັບ</strong>
          <v-spacer></v-spacer>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="dataUserApp"
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
                  @click="onOpenChangep(item)"
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
    <UserappEdit ref="appEdit" />
    <UserappAdd ref="appAdd" />
    <UserappDelete ref="appDelete" />
    <UserappPass ref="appPass" />
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
    this.GetUserApp()
    this.GetUnit()
    this.GetDropdownApp()
  },
  computed: {
    ...mapState('userApp', ['dataUserApp']),
  },
  methods: {
    ...mapActions('userApp', ['GetUserApp', 'GetUnit']),
    ...mapActions('dropdown', ['GetDropdownApp']),
    onOpenAdd(item) {
      this.$refs.appAdd.dialog = true
    },
    onOpenChangep(item) {
      this.$refs.appPass.dialog = true
      this.$refs.appPass.userId = item.id
    },

    onOpenEdit(item) {
      console.log(item)
      this.$refs.appEdit.dialog = true
      this.$refs.appEdit.id = item.id
      this.$refs.appEdit.name = item.name
      this.$refs.appEdit.surname = item.surname
      this.$refs.appEdit.tel = item.tel
      this.$refs.appEdit.user_type_id = item.user_type_id
      this.$refs.appEdit.gender_id = item.gender_id
      this.$refs.appEdit.unit_id = Number(item.unit_id)
    },
    onOpenDelete(item) {
      this.$refs.appDelete.dialog = true
      this.$refs.appDelete.id = item.id
    },
  },
}
</script>

<style></style>
