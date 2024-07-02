import Vue from 'vue'
import moment from 'moment'

Vue.prototype.$formatnumber = (value) => {
  if (!value) return '0'
  value = Number(value).toFixed(0)
  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return value
}
Vue.prototype.$formatnumber2 = (value) => {
  if (!value) return '0.00'
  value = Number(value).toFixed(2)
  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return value
}
Vue.prototype.$formatdate2 = (date) => {
  if (date) {
    return (date = moment(String(date)).format('YYYY-MM-DD'))
  }
}
Vue.prototype.$formatdate = (date) => {
  if (date) {
    return (date = moment(String(date)).format('DD/MM/YYYY'))
  }
}
Vue.prototype.$FormatDateTime = (date) => {
  if (date) {
    return (date = moment.utc(String(date)).format('DD/MM/YYYY HH:mm:ss'))
  }
}
Vue.config.debug = false
Vue.config.devtools = false
Vue.config.silent = true
