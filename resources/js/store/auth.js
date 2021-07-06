import axios from 'axios'
import Vue from 'vue'
import router from "../router"

export default {
  state: {
    token: localStorage.getItem('user-token') || "",
    user: {},
  },

  getters: {
    user: state => state.user,
    isAuthenticated: state => !!state.token,
  },

  actions: {

    update_user({dispatch, commit}, credentials) {

      return new Promise((resolve, reject) => {
        axios.patch('/api/update_profile', credentials).then(res => {

          commit('update_user', credentials)

          resolve()
        }).catch(err => {
          reject()
        })
      })
    },

    set_user({commit}, user) {
      return new Promise(resolve => {
        commit('set_user', user)
        resolve()
      })
    },

    auth_logout({commit}) {
      return new Promise(resolve => {
        commit('clear_local_receipt_product_offers')
        commit('clear_client_local_receipt')
        commit('clear_user')
        resolve()
      })

    },
  },
  mutations: {

    set_user(state, user) {
      state.token = user.api_token
      state.user = user
      localStorage.setItem('user-token', user.api_token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.api_token
    },

    update_user(state, data) {
      state.user.username = data.username
      state.user.email = data.email
    },

    clear_user(state) {
      state.token = ""
      state.user = {}
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('user-token')
    },

  }
}
