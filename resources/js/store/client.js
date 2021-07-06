import axios from 'axios'
import store from '../store'

export default {
  state: {
    clients: []
  },

  actions: {

    update_client({dispatch, commit}, data) {
      return new Promise( (resolve, reject) => {
        axios.patch(`/api/clients/${data.id}`, data).then((res) => {
          commit('update_client', {id: data.id, name: data.name, email: data.email})
          resolve(res.data.response)
        }).catch(err => reject(err))
      })
    },

    create_client({dispatch, commit}, data) {

      data.created_at = new Date()
      data.code = 'C-XXXXXXXX'
      commit('init_client', data)

      return new Promise ( (resolve, reject) => {
        axios.post('/api/clients', data).then((res) => {
          commit('add_client', {data, code: res.data.response.code })
          resolve()
        }).catch(err => { reject() } )
      })
    },

    fetch_clients({commit}, page = 1) {
      return new Promise ((resolve, reject) => {
        axios.get('/api/clients?page=' + page).then((res) => {
          commit('set_clients', res.data.response.data)
          resolve(res.data.response)
        })
          .catch(err => reject())
      })
    },

    fetch_client({dispatch, commit}, code) {
      return new Promise ((resolve, reject) => {
        if (!code) { reject() }

        axios.get(`/api/clients/${code}`).then( res => {
          resolve(res.data.response)
        }).catch(err => reject())

      })
    },

    delete_client({ commit }, id) {
      commit('delete_client', id)
    },



  },

  mutations: {

    init_client(state, client) {
      state.clients.pop()
      state.clients.unshift(client)
    },

    add_client(state, {data, code}) {
      const client = state.clients.find(c => c === data)
      client.code = code
    },

    set_clients(state, clients) {
      state.clients = clients
    },

    delete_client(state, id) {
      state.clients = state.clients.filter(client => client.id !== id)
    },

    update_client(state, {id, name, email}) {
      const client = state.clients.find(client => client.id === id)
      client.name = name
      client.email = email
    }

  },

  getters: {
    clients: s => s.clients
  }
}
