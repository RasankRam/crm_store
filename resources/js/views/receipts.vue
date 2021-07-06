<template>
<div>
  <a v-if="!client" data-micromodal-trigger="modal_append_client" class="custom-button">
    Добавить клиента
  </a>
  <div v-else>
    <a class="custom-button dropdown-trigger" href="#!" data-target="dropdown3">{{this.$initials(client.name)}}<i class="material-icons right">arrow_drop_down</i></a>
    <a data-position="right" v-tooltip.noloc="'Добавить продажу'"
            class="custom-button"
            data-micromodal-trigger="modal_add_product_offer">
      Продажа
    </a>
    <ul id="dropdown3" class="dropdown-content">
      <li><a @click.prevent="clear_local_client" href="#!">Очистить</a></li>
      <li><a data-micromodal-trigger="modal_append_client"><span style="position: absolute;right: 0;" class="new badge"></span>Сменить пользователя</a></li>
    </ul>
  </div>

  <carousel style="min-height:212px;" />

  <div style="justify-content:flex-start" class="page-title">
    <span style="font-size:21px;">Итого:</span>
    <span style="color: rgb(102, 106, 115);font-weight: bold;font-size: 21px;margin-left: 23px;
    margin-right: 18px;width: 167px;text-align: center;display: inline-block;">{{ this.total_price }}&nbsp;₽</span>
    <beauty_button @issue_receipt="issue_receipt" v-if="this.$store.getters.local_receipt_product_offers.length !== 0" :text="'Оформить'" />
  </div>
  <Loader v-if="loading" />

  <p class="center" v-else-if="!receipts.length">
    {{ 'NoRecords' | localize }}
  </p>

  <div v-else>

    <receipts_table @pay_receipt="pay_receipt" />
    <Paginate
      v-if="res.meta.last_page !== 1"
      v-model="page"
      :page-count="pageCount"
      :margin-pages="2"
      :click-handler="pageChangeHandler"
      :prev-text="'&laquo;'"
      :next-text="'&raquo;'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
      :active-class="'active_pagination'"
    />

  </div>

  <m_append_client />
  <m_add_product_offer />
  <m_payment_code :receipt_code="code" />


</div>
</template>

<script>
import receipts_table from '../components/tables/receipts_table'
import m_append_client from "../components/m_append_client"
import carousel from '../components/external/carousel'
import m_add_product_offer from "../components/m_add_product_offer"
import m_payment_code from "../components/m_payment_code"
import beauty_button from '../components/external/beauty_button'
import axios from 'axios'

export default {
  name: "Receipts",
  metaInfo() {
    return { title: this.$title('Receipts') }
  },
  data() {
    return {
      page: +this.$route.query.page || 1,
      res: {},
      loading: true,
      class_name: "receipts",
      code: '',
    }
  },
  computed: {

    receipts() {
      return this.$store.getters.receipts
    },


    pageSize() {
      return this.res.meta.per_page
    },

    pageCount() {
      return this.res.meta.last_page
    },

    total_price() {
      return this.$store.getters.local_receipt_product_offers.reduce((sum, product_offer) => {
        return sum + product_offer.product.price * product_offer.count
      }, 0)
    },

    client() {
      setTimeout(() => {
        let elems = document.querySelectorAll('.dropdown-trigger')
        let instances = M.Dropdown.init(elems, {
         alignment: 'middle',
         coverTrigger: false
        })
        this.$store.dispatch('micromodal_init')
         }, 0)
      return this.$store.getters.local_receipt_client
    }
  },
  mounted() {

   // this.delayy(10000)

    if (this.$store.getters.local_receipt_client) {
      this.$store.dispatch('fetch_client', this.$store.getters.local_receipt_client.code).then((client) => {
        this.$store.dispatch('set_client_local_receipt', client)
      }).catch(err => {
        this.$store.dispatch('clear_local_receipt_product_offers')
        this.$store.dispatch('clear_client_local_receipt')
      })
    }

    this.$store.dispatch('fetch_receipts').then((res) => {
      this.res = res
      this.loading = false
      setTimeout(() => this.$store.dispatch('micromodal_init'), 0)
    })

  },

  methods: {

    convert_date(dateString) {
      const date = new Date(Date.parse(dateString));
      const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
      ];
      return `${date.getDate()} ${months[date.getMonth()]} (${
        date.getFullYear() % 1000
      }г.)`
    },

    clear_local_client() {
      this.$store.dispatch('clear_client_local_receipt')
    },

    pay_receipt(code) {
      this.$store.dispatch('pay_receipt', code)
    },

    append_client(client) {
      this.client = client
    },

    pageChangeHandler(page) {
      this.loading = true
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.$store.dispatch(`fetch_${this.class_name}`, page).then(() => {
        this.loading = false
      })
    },

    issue_receipt() {
      let data = {}
      data.product_offers = this.$store.getters.local_receipt_product_offers
      data.code_client = this.$store.getters.local_receipt_client.code

      this.$store.dispatch('issue_receipt', data).then(() => {
        this.$store.dispatch('clear_local_receipt_product_offers')
        this.$message('Квитанция оформлена!')
      }).catch(() => this.$message('Не удалось оформить квитанцию'))
    }

  },

  components: {
    m_payment_code,
    m_add_product_offer,
    m_append_client,
    receipts_table,
    carousel,
    beauty_button
  }
}
</script>

<style scoped>
  .add_product_offer {
    color: black;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    padding: 0;
    border: 1px solid #CCC;
    margin-left: 9px;
  }
</style>
