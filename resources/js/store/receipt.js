import axios from 'axios'
import store from '../store'
import _ from 'lodash'
export default {

  state: {
    receipts: [],
  },

  actions: {

    issue_receipt({commit}, data) {

      return new Promise((resolve, reject) => {
        axios.post('/api/receipts/issue', data).then(res => {
          commit('add_receipt', res.data.response)
          resolve()
        }).then(() => reject())
      })

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
          commit('set_receipts', res.data.response.data)
          resolve(res.data.response)
        }).catch(err => reject(err) )
      })

    },

  },

  mutations: {

    add_receipt(state, receipt) {
      state.receipts.unshift(receipt)
      state.receipts.pop()
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
