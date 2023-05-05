<template>
  <form style="height:349px;" class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span style="text-align: center;margin-left: -19px;" class="card-title">
        <i class="material-icons">layers</i><span>OFFICE</span></span>
      <div class="input-field">
        <input
          id="username"
          type="text"
          v-model.trim="username"
          :class="{invalid: ($v.username.$dirty && !$v.username.required)}" />
        <label for="username">Логин --> employee</label>
        <small class="helper-text invalid"
               v-if="$v.username.$dirty && !$v.username.required"
        >{{ 'Message_UsernameRequired' | localize }}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        />
        <label for="password">Пароль --> employee</label>
<!--        <div v-if="error-section" class="error-section"></div>-->
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >{{ 'Message_EnterPassword' | localize }}</small>
        <small class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{ 'Message_MinLength' | localize }} {{ $v.password.$params.minLength.min}}</small>
      </div>
    </div>
      <div>
        <button style="display:block;margin:0 auto;padding:9px 45px;" class="custom-button" type="submit">
          {{ 'Login' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>
  </form>
</template>

<script>

import { required, minLength } from 'vuelidate/lib/validators'
import messages from '../utils/messages';
import localizeFilter from '../filters/localize.filter';
import axios from "axios";

export default {
  name: "Login",
  metaInfo() {
    return { title: this.$title('Login') }
  },
  data: () => ({
    username: '',
    password: '',
  }),
  validations: {
    username: { required },
    password: { required, minLength: minLength(6) }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(localizeFilter(messages[this.$route.query.message]))
    }
  },
  methods: {
    submitHandler() {

      // валидация формы
      if (this.$v.$invalid) {
        this.$v.$touch() // активизируем валидацию
        return
      }
      // отправка данных для отправки на сервер
      const formData = {
        username: this.username,
        password: this.password
      }

      axios.post('/api/login', formData).then(res => {
        this.$store.dispatch('set_user',res.data.response).then(() => {
          this.$router.push('/')
        })
      }).catch(err => {
        this.$message('Неправильный логин/или пароль')
        localStorage.removeItem("user-token")
      })

    }
  }
}
</script>

<style scoped>

  .card {
    border-radius:5px;
    border:1px solid #717171;
    box-shadow: inset 0px 0px 2px 2px rgba(255, 15, 0, 0.04), inset 0px 0px 1px 2px rgba(223, 227, 227, 0.59), inset 0px 4px 250px rgba(241, 241, 241, 0.25), inset 0px 4px 67px rgba(196, 244, 255, 0.1);
  }

  .card-title span {
    margin-left: 9px;
  }

  .card-title > * {
    display: inline-block;
    vertical-align: middle;
  }

  .card .card-content .card-title i {
    line-height:normal;
    font-size: 48px;
  }
  .card-title {
    font-family: Quantico, sans-serif;
    font-size: 20px;
    letter-spacing: 0.12em;
  }
  .card-action {
    padding-top:0;
  }
  .center {
    margin-top:20px;
  }
</style>
