<template>
  <table class="striped">
    <thead>
      <tr>
        <th>Код</th>
        <th>Товар</th>
        <th>Адрес</th>
        <th>Доставить от</th>
        <th>Дата доставки</th>
        <th>Доставить до</th>
        <th>Сумма</th>

        <th></th> <!-- Кнопка доставить -->
        <th></th> <!-- Кнопка подробно просмотра подписки -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="product_offer in product_offers" :key="product_offer.code">
        <td>{{product_offer.code}}</td>
        <td>{{product_offer.product.title}}</td>
  <!--      <td>{{product_offer.count}}</td>-->
  <!--      <td>{{product_offer.price}}</td>-->
        <td>{{product_offer.address}}</td>
        <td>{{convert_date(product_offer.start_at)}}</td>
        <td style="position:relative;">
          <button style="position:relative;left:-17.5px;display:block;margin:0 auto;"
                  v-if="!product_offer.delivered_at"
                  @click="$emit('deliver', product_offer.code)"
                  class="btn btn-manage-round"
                  data-position="top"
                  v-tooltip.noloc="'Доставить (дата-сегодня)'"
          >
          <i style="cursor:pointer" class="small material-icons">clear_all</i>
          </button>
          <span v-else>{{convert_date(product_offer.delivered_at)}}</span>
        </td>
        <td>{{convert_date(product_offer.end_at)}}</td>
        <td>
          <span
            data-position="top"
            style="padding:1px 5px;border-radius:5px;border:1px solid orangered"
            v-tooltip.noloc="(function(){return product_offer.product.title + ` ${product_offer.product.price}₽x${product_offer.count}=${product_offer.product.price*product_offer.count}` + '<br>'}())"
          >
            {{product_offer.count * product_offer.product.price}}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "product_offers_table",
  props: ['product_offers'],
  methods: {
    convert_date(dateString) {
      // return new Promise ((resolve, reject) => {
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
    }
  },
}
</script>

<style scoped>

</style>
