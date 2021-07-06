import axios from 'axios'
import store from '../store'

export default {
  state: {
    products: []
  },

  actions: {

    update_product({dispatch, commit}, data) {

      return new Promise( (resolve, reject) => {

        axios.patch(`/api/products/${data.id}`, data).then((res) => {
          commit('update_product', {id: data.id, title: data.title, count: data.count, price: data.price})
          resolve(res.data.response)
        }).catch(err => reject(err))
      })
    },

    fetch_product_by_name({ commit }, name) {

      return new Promise((resolve, reject) => {

        axios.get(`/api/products/name?name=${name}`).then((res) => {
          resolve(res.data.response)
        }).catch(err => reject(err))

      })

    },

    fetch_products({ commit }, page = 1) {
      return new Promise ((resolve, reject) =>
        {
          axios.get('/api/products?page=' + page).then((res) =>
            {
              commit('set_products', res.data.response.data)
              resolve(res.data.response)
            }).catch(err => reject() )
        })
    },

    create_product({ commit }, dataC) {

      dataC.created_at = new Date()
      dataC.sold_month = 0
      commit('init_product', dataC)
      return new Promise ( (resolve, reject) => {

        axios.post('/api/products', dataC).then((res) => {


          commit('update_product', { ...dataC })


          resolve()
        }).catch(err => { reject(err) } )
      })

    },


    delete_product({ commit }, id) {
      commit('delete_product', id)
    }
  },

  mutations: {

    update_product(state, data) {
      let product = state.products.find(item => data.id === item.id)

      if (product) {
        product.title = data.title
        product.count = data.count
        product.price = data.price
      }
    },

    delete_product(state, id) {
      state.products = state.products.filter(product => product.id !== id)
    },

    set_products(state, products) {
      state.products = products
    },

    init_product(state, product) {
      state.products.pop()
      state.products.unshift(product)
    },

  },

  getters: {
    products: s => {
      return s.products
    }
  }
}
