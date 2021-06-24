import axios from 'axios'
import store from '../store'
import _ from 'lodash'
export default {

  state: {
    receipts: [],
  },

  actions: {

    add_receipt({ commit }, data) {
      commit('add_receipt', data)
    },

    fetch_receipt({commit}, code) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/receipts/${code}`).then((res) => {
          resolve(res.data.response)
        }).catch(err => reject(err))
      })
    },

    pay_receipt({ commit }, code) {

      return new Promise ((resolve, reject) => {
        commit('pay_receipt', {code, 'payment_code': 'PY-XXXXXXXX'})

        axios.get(`/api/receipts/${code}/pay`).then((res) => {
          commit('pay_receipt', { code, 'payment_code': res.data.response })
          resolve()
        }).catch(err => reject(err))
      })

    },

    fetch_receipts({commit}, page = 1) {

      return new Promise ((resolve, reject) =>
      {
        axios.get('/api/receipts?page=' + page).then((res) => {

          res.data.response.data.forEach(item => {

            store.dispatch('convert_date', item.created_at).then(res => item.created_at = res)
            item.code_client = item.client.code
            item.code_employee = item.employee.code
            item.product_offers_count = item.product_offers.length

            delete item.client
            delete item.employee

          })
          commit('set_receipts', res.data.response.data)
          resolve(res.data.response)
        }).catch(err => reject(err) )
      })

    },

  },

  mutations: {

    add_receipt(state, receipt) {
      if (receipt.sum === -1) {
        state.receipts.unshift(receipt)
        state.receipts.pop()
      } else {
        state.receipts[0].code = receipt.code
        state.receipts[0].code_employee = receipt.code_employee
        state.receipts[0].created_at = receipt.created_at
        state.receipts[0].sum = receipt.sum
      }
    },

    pay_receipt(state, { code, payment_code }) {
      const index = state.receipts.findIndex(item => item.code === code)
      state.receipts[index].payment_code = payment_code
    },

    set_receipts(state, receipts) {
      state.receipts = receipts
    },

  },

  getters: {

    receipts: s => s.receipts,

  }
}
