<template>
  <div>
<!--    <button @click="get_type">УЗнать тип</button>-->
    <table class="striped">
      <thead>
      <tr>
        <th>Название</th>
        <th>Кол-во</th>
        <th>Цена ₽</th>
        <th>Шт. в мес.</th>
        <th>Дата появления</th>
        <th>
          <button data-micromodal-trigger="modal_create" class="custom-button" data-position="left" v-tooltip="'CreateNewRecord'">
            Добавить
          </button>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.title">
        <td>{{product.title}}</td>
        <td>{{product.count}}</td>
        <td>{{product.price}}</td>
        <td>{{product.sold_month}}</td>
        <td>{{convert_date(product.created_at)}}</td>
        <td style="width: 107px;">
          <button @click="$emit('edit', product.id)" data-micromodal-trigger="modal_edit" class="btn btn-manage-round">
            <i style="cursor:pointer" class="small pencil material-icons">mode_edit</i>
          </button>
          <button @click="$emit('del', product.id)" data-micromodal-trigger="modal_delete" class="btn btn-manage-round">
            <i style="cursor:pointer" class="small material-icons">close</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "products_table",

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
      // })
    },

  },

  computed: {
    products() {
      return this.$store.getters.products
    }
  }
}
</script>

<style scoped>

</style>
