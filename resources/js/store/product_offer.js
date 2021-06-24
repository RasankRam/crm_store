import axios from "axios"
import store from '../store'

export default {
  state: {
    product_offers: []
  },

  actions: {

    deliver_product_offer({commit}, code) {
      return new Promise((resolve, reject) => {
        axios.get('/api/product_offers/deliver/' + code).then(res => {
          commit('deliver_product_offer', { code, date: res.data.response})
          resolve()
        }).catch(err => reject(err))
      })


    },

    fetch_product_offers({commit}, page = 1) {
      return new Promise ((resolve, reject) => {
        axios.get('/api/product_offers?page=' + page).then((res) => {
          commit('set_product_offers', res.data.response.data)
          resolve(res.data.response)
        })
          .catch(err => reject())
      })
    },

  },

  mutations: {

    set_product_offers(state, product_offers) {
      product_offers.forEach(product_offer => {
        store.dispatch('convert_date', product_offer.start_at).then(res=>product_offer.start_at=res)
        if (product_offer.delivered_at) {
          store.dispatch('convert_date', product_offer.delivered_at).then(res => product_offer.delivered_at = res)
        }
        store.dispatch('convert_date', product_offer.end_at).then(res=>product_offer.end_at=res)
      })
      state.product_offers = product_offers
    },

    deliver_product_offer(state, { code, date }) {

      const index = state.product_offers.findIndex(item => item.code === code)
      store.dispatch('convert_date', date).then(res => {
        state.product_offers[index].delivered_at=res
      })
    }

  },


  getters: {
    product_offers: s => s.product_offers
  }
}
