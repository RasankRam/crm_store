<template>
  <table class="striped">
    <thead>
    <tr>
      <th>Код</th>
      <th>Сотрудник</th>
      <th>Клиент</th>
      <th>Дата</th>
      <th></th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="receipt in receipts" :key="receipt.code">
      <td>{{receipt.code}}</td>
      <td>{{receipt.employee.code}}</td>
      <td>{{receipt.client.code}}</td>
      <td>{{convert_date(receipt.created_at)}}</td>
      <td style="position:relative;">
        <span data-position="top" style="font-weight:700;padding:0 5px;color:#0b4975">{{receipt.sum}} ₽</span>

        <span v-if="receipt.product_offers.length" data-position='top' v-tooltip.noloc="(function(){return receipt.product_offers.reduce((carry, item) =>
         { return carry + item.product.title + ` ${item.product.price}₽x${item.count}=${item.product.price*item.count}` + '<br>'},'')}())"
              :style="receipt.product_offers.length ? 'border-bottom:1px solid orangered' : 'border:none'">
              <!--style="/*position:absolute;left:-109px;margin-top:-2px;border-bottom:1px solid orangered*/"-->
          {{receipt.product_offers.length}} подписок</span>
        <span v-else style="/*position:absolute;left:-109px;margin-top:-2px*/">{{receipt.product_offers.length}} подписок</span>
      </td>
      <td>
        <button style="position: relative;left: -39px;" @click="$emit('pay_receipt', receipt.code)"
                v-if="!receipt.payment_code" class="pay_button"
                data-position="top" v-tooltip.noloc="'Оплатить'">
          <i style="position: relative;left: -2px;top: 1px;" class="material-icons">done</i>
        </button>
        <div style="/*position: absolute;margin-left: -39px;margin-top:-15px;*/" v-else >
          <span v-tooltip.noloc="'Квитанция оплачена'" data-position="top">
            {{receipt.payment_code}}
            <button data-micromodal-trigger="modal_payment_code" v-if="receipt.payment_code" data-position="top" style="background:none;border:none;color:#4fd996" class="tooltipped">
              <i class="material-icons">done_all</i>
            </button>
          </span>
        </div>
      </td>

    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "receipts_table",
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

  },
  computed: {
    receipts() {
      return this.$store.getters.receipts
    }
  }
}
</script>

<style scoped>
  .pay_button {
    cursor: pointer;
    background: #C0CDDB;
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
</style>
