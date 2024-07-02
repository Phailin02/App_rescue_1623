<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>ລາຍລະອຽດ</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-card style="height: 100%">
              <v-container>
                <v-card-title style="font-weight: bold">
                  ຂໍ້ມູນອຸບັດຕິເຫດ
                </v-card-title>
                <div>
                  <p>
                    ຊື່ໂຮງໝໍ :
                    {{ dataAccident?.report_case_detail?.hospital_name }}
                  </p>
                  <p>
                    ຂໍ້ມູນບ່ອນສົ່ງຜູ້ເຈັບ :
                    {{ dataAccident?.report_case_detail?.destination }}
                  </p>
                  <p>
                    ປະເພດອຸບັດຕິເຫດ :
                    {{ dataAccident?.report_case_detail?.case_type_name }}
                  </p>
                  <p>
                    ປະເພດການເກີດເຫດ :
                    {{
                      dataAccident?.report_case_detail?.case_type_detail_name
                    }}
                  </p>
                  <p>
                    ສະພາບສະຖານທີ່ເກີດເຫດ :
                    {{ dataAccident?.report_case_detail?.describe_scene }}
                  </p>
                  <p>
                    ສະຖານທີ່ເກີດເຫດ :

                    <a
                      :href="`https://www.google.com/maps?q=
                        ${dataAccident?.case_info?.lat},${dataAccident?.case_info?.lng}`"
                      target="_blank"
                    >
                      Google Map
                      <v-icon size="19" color="#1976d2">mdi-open-in-new</v-icon>
                    </a>
                  </p>
                </div>
              </v-container>
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card style="height: 100%">
              <v-container>
                <v-card-title style="font-weight: bold">
                  ຂໍ້ມູນຜູ້ແຈ້ງເຫດ
                </v-card-title>
                <div>
                  <p>
                    ຊື່ ແລະ ນາມສະກຸນ :
                    {{ dataAccident?.user_report_info?.name }}
                    {{ dataAccident?.user_report_info?.surname }}
                  </p>
                  <p>
                    ເບີໂທ :
                    {{ dataAccident?.user_report_info?.tel }}
                  </p>
                  <p>
                    ເພດ :
                    {{ dataAccident?.user_report_info?.gender }}
                  </p>
                  <p>
                    ຊື່ໜ່ວຍ :
                    {{ dataAccident?.user_report_info?.unit_name }}
                  </p>
                </div>
              </v-container>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card style="height: 100%">
              <v-container>
                <v-card-title style="font-weight: bold">
                  ຂໍ້ມູນກູ້ໄພ
                </v-card-title>
                <div>
                  <p>
                    ຊື່ ແລະ ນາມສະກຸນ :
                    {{ dataAccident?.rescue_accept_info?.name }}
                    {{ dataAccident?.rescue_accept_info?.surname }}
                  </p>
                  <p>
                    ເບີໂທ :
                    {{ dataAccident?.rescue_accept_info?.tel }}
                  </p>
                  <p>
                    ເພດ :
                    {{ dataAccident?.rescue_accept_info?.gender }}
                  </p>
                  <p>
                    ຊື່ໜ່ວຍ :
                    {{ dataAccident?.rescue_accept_info?.unit_name }}
                  </p>
                </div>
              </v-container>
            </v-card>
          </v-col>
          <v-col cols="12" v-if="dataAccident?.injured_info">
            <h2>ຂໍ້ມູນຜູ້ເຈັບ</h2>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col
                cols="4"
                v-for="(item, index) in dataAccident?.injured_info"
                :key="index"
              >
                <v-card>
                  <v-container>
                    <v-card-title style="font-weight: bold">
                      ຜູ້ເຈັບຄົນທີ {{ index + 1 }}
                    </v-card-title>
                    <div>
                      <p>
                        ຊື່ ແລະ ນາມສະກຸນ :
                        {{ item.fullname }}
                      </p>
                      <p>
                        ເພດ :
                        {{ item.gender }}
                      </p>
                      <p>
                        ອາຍຸ :
                        {{ item.age }}
                      </p>
                      <p>
                        ທີ່ຢູ່ :
                        {{ item.address }}
                      </p>
                      <p>
                        ອາການຂອງຜູ້ເຈັບ :
                        {{ item.symptoms_injured }}
                      </p>
                      <p>
                        ອັດຕາການເຕັ້ນຫົວໃຈ :

                        {{ item.heart_rate }}
                      </p>
                    </div>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      dataAccident: null,
    }
  },
}
</script>
