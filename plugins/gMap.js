import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCAEcMgQpvxZwok2WGiNVX2WvRgZLSY-nA',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})
