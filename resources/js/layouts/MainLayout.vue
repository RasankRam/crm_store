<template>
  <div>
    <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>
      <Navbar @click="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" :key="locale"/>
      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <div class="content-wrapper">
            <error_message v-if="error" :message="error" />
            <success_message v-if="success" :message="success" />
            <router-view/>
          </div>
        </div>
      </main>
      <div style="text-align:center">
        <span>Telegram: @ramazon_sangov</span>
        <span>Github: https://github.com/RasankRam</span>
      </div>
    </div>
  </div>
</template>

<script>
import error_message from '../components/messages/error_message'
import success_message from '../components/messages/success_message'
import Navbar from '../components/app/Navbar'
import Sidebar from '../components/app/Sidebar'
import messages from '../utils/messages'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  mounted() {
    this.loading = false

  },
  components: {
    error_message,
    success_message,
    Navbar,
    Sidebar
  },
  computed: {
    success() {
      return this.$store.getters.success
    },
    error() {
      return this.$store.getters.error
    },
    locale() {
      return "ru-RU"
    }
    // locale() {
    //   return this.$store.getters.info.locale
    // }
  },
  // watch: {
  //   error(fbError) {
  //     this.$error(messages[fbError.code] || 'Что-то пошло не так')
  //   }
  // },

}
</script>
