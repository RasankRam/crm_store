<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
      <div
        v-for="link in links"
        :key="link.url"
      >
        <router-link
          v-if="link.hasOwnProperty('permission') ? link.permission : true"
          tag="li"
          active-class="active"
          :to="link.url"
          :exact="link.exact"
        >
          <a href="#" class="waves-effect pointer">{{link.title}}</a>
        </router-link>
      </div>
      <a @click.prevent="reset()" class="reset btn waves-effect">Сбросить проект</a>
  </ul>
</template>


<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import localizeFilter from "../../filters/localize.filter"
  export default {
    props: ['value'],
    data() {
      return {
        links: [
          { title: localizeFilter('Menu_Receipts'), url: '/', exact: true },
          { title: localizeFilter('Menu_Sales'), url: '/product_offers' },
          { title: localizeFilter('Menu_Products'), url: '/products' },
          { title: localizeFilter('Menu_Clients'), url: '/clients' },
          { title: localizeFilter('Menu_PickupPoints'), url: '/pickup_points' },
          { title: localizeFilter('Menu_EmployeesRegistration'), url: '/employees_registration' }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'isSenior'
      ])
    },
    created() {
      this.set_nav_permission()
    },
    methods: {
      set_nav_permission() {
        const urlEmployeesRegistrationIndex = this.links.findIndex(item => item.url === '/employees_registration');
        this.links[urlEmployeesRegistrationIndex].permission = this.isSenior
      },
      reset() {
        this.$store.dispatch('auth_logout').then(() => {
          axios.get('/api/reset')
          this.$message('Вы успешно сбросили проект в начальное состояние!')
          this.$router.push('/login')
          }
        )
      }
    }
  }
</script>

<style scoped>
  .pointer {
    font-size: 16px;
    font-weight:normal;
  }
  .sidenav {
    overflow-y: visible;
  }
  .reset {

    width: 100%;
    box-shadow: none;
    border-radius: 0;
    background: none !important;
    border-top:1px solid #B8BAC4;
    color: #9C9DA7;

    text-shadow: 1px 0 rgb(5 25 128 / 25%);

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none;   /* Chrome/Safari/Opera */
    -khtml-user-select: none;    /* Konqueror */
    -moz-user-select: none;      /* Firefox */
    -ms-user-select: none;       /* Internet Explorer/Edge */
    user-select: none;
  }
</style>
