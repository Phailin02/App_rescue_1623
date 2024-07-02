<template>
  <v-dialog v-model="dialog" max-width="800" persistent>
    <v-card>
      <v-card-title>ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້ແອັດມິນ</v-card-title>
      <v-container>
        <v-row>
          <v-col cols="6" class="py-0">
            <v-text-field v-model="name" label="ຊື່"></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field v-model="surname" label="ນາມສະກຸນ"></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field v-model="tel" label="ເບີໂທ"></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select
              v-model="gender_id"
              :items="dropdownDataForAdmin.gender"
              :item-text="(item) => item.gender"
              :item-value="(item) => item.id"
              label="ເພດ"
            ></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select
              v-model="user_type_id"
              :items="dropdownDataForAdmin.user_type"
              :item-text="(item) => item.user_type_name"
              :item-value="(item) => item.id"
              label="ປະເພດຜູ້ໃຊ້"
            ></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-row>
              <v-col>
                <v-select
                  v-model="dob_year"
                  :items="listYear"
                  label="ປີ"
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-model="dob_month"
                  :items="listMonth"
                  label="ເດືອນ"
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-model="dob_date"
                  :items="listDate"
                  label="ວັນ"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4" class="py-0">
            <v-select
              v-model="province_id"
              :items="provinceData"
              :item-text="(item) => item.province_name"
              :item-value="(item) => item.province_id"
              label="ແຂວງ"
            ></v-select>
          </v-col>
          <v-col cols="4" class="py-0">
            <v-select
              v-model="district_id"
              :items="districtData"
              :item-text="(item) => item.district_name"
              :item-value="(item) => item.district_id"
              label="ເມືອງ"
            ></v-select>
          </v-col>
          <v-col cols="4" class="py-0">
            <v-select
              v-model="village_id"
              :items="villageData"
              :item-text="(item) => item.village_name"
              :item-value="(item) => item.village_id"
              label="ບ້ານ"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="success" @click="updateItem">ແກ້ໄຂ</v-btn>
        <v-btn text color="error" @click="dialog = false">ຍົກເລີກ</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      dialog: false,
      id: null,
      name: null,
      surname: null,
      tel: null,
      user_type_id: null,
      gender_id: null,
      dob_year: null,
      dob_month: null,
      dob_date: null,
      village_id: null,
      district_id: null,
      province_id: null,
      listYear: [
        1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981,
        1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993,
        1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005,
        2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
      ],
      listMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      listDate: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
    }
  },
  computed: {
    ...mapState('dropdown', [
      'dropdownDataForAdmin',
      'provinceData',
      'districtData',
      'villageData',
    ]),
  },

  methods: {
    ...mapActions('userBackoffice', [
      'GetUserBackOffice',
      'UpdateUserBackOffice',
    ]),

    async updateItem() {
      let resp
      let myData = {
        id: this.id,
        user_type_id: this.user_type_id,
        tel: this.tel,
        uname: this.name,
        usurname: this.surname,
        gender_id: this.gender_id,
        dob: this.dob_year + '-' + this.dob_month + '-' + this.dob_date,
        village_id: this.village_id,
      }
      try {
        resp = await this.UpdateUserBackOffice(myData)
        if (resp?.title == 'success') {
          Swal.fire({
            icon: 'success',
            title: 'ສຳເລັດ!',
            position: 'top-end',
            showConfirmButton: false,
            toast: true,
            timer: 1500,
          })
          this.GetUserBackOffice()
          this.dialog = false
        } else {
          Swal.fire({
            icon: 'error',
            title: resp?.title ? resp?.title : 'ເກີດຂໍ້ຜິດພາດ!',
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
          title: error?.title ? error?.title : 'ເກີດຂໍ້ຜິດພາດ!',
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
