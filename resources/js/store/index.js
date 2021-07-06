import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import common from './common'
import auth from './auth'
import client from './client'
import product from './product'
import employee from './employee'
import receipt from './receipt'
import subscription from './product_offer'
import local_receipt from './local_receipt'
import pickup_point from './pickup_point'
import category from './category'
import show_init_config from '../configs/show_init'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {

    fetch_delivery_by_name({commit}, title) {
      return new Promise( (resolve, reject) => {
        axios.get(`/api/delivery/title?title=${title}`).then((res) => {
          resolve(res.data.response)
        }).catch(err => reject())
      })
    },

    micromodal_init() {
      MicroModal.init(show_init_config)
    },

  },
  modules: {
    pickup_point, client, product, receipt, auth, employee, common, local_receipt, subscription, category
  },
  plugins: [createPersistedState()]
})
