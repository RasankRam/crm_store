<template>
  <table class="striped">
    <thead>
    <tr>
      <th>Код</th>
      <th>ФИО</th>
      <th>Email</th>
      <th>Дата регистрации</th>
      <th>
        <button data-micromodal-trigger="modal_create" class="custom-button" data-position="left" v-tooltip="'CreateNewRecord'">
          Добавить
        </button>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="client in clients" :key="client.code">
      <td>{{client.code}}</td>
      <td>{{client.name}}</td>
      <td>{{client.email}}</td>
      <td>{{convert_date(client.created_at)}}</td>
      <td style="width: 107px;">
        <button @click="$emit('edit', client.id)" data-micromodal-trigger="modal_edit" class="btn btn-manage-round">
          <i style="cursor:pointer" class="small pencil material-icons">mode_edit</i>
        </button>
        <button @click="$emit('del', client.id)" data-micromodal-trigger="modal_delete" class="btn btn-manage-round">
          <i style="cursor:pointer" class="small material-icons">close</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: "clients_table",
  props: {
    clients: {
      required: true,
      type: Array
    }
  },
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

  }

}
</script>

<style scoped>
</style>
