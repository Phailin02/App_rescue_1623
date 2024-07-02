<template>
  <div>
    <div>
      <v-card>
        <v-card-title>
          <strong>ປະຫວັດການແຈ້ງອຸບັດຕິເຫດ</strong>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="headers"
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
</template>

<script>
import { mapActions, mapState } from 'vuex'
import secureStorage from '../../plugins/secure-storage'

export default {
  data() {
    return {
      search: '',
      showImg: false,
      pathImg: '',
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
  },
  computed: {
    ...mapState('historyStore', ['dataHistories']),
  },
  methods: {
    ...mapActions('historyStore', ['GetHistory']),
    onOpenDetail(item) {
      this.$refs.historyDialog.dialog = true
      this.$refs.historyDialog.dataAccident = item
    },
  },
}
</script>

<style></style>
