<template>
  <div>
    <div class="page-title">
      <h3>{{'EmployeesRegistrationTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="register">
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="name">{{'Name'|localize}}</label>
        <small
          class="helper-text invalid"
          v-if="($v.name.$dirty &&  !$v.name.required)"
        >{{'Message_EnterName'|localize}}</small>
      </div>
      <div class="input-field">
        <input
          id="username"
          type="text"
          v-model="username"
          :class="{invalid: $v.username.$dirty &&  !$v.username.required}"
        />
        <label for="username">{{'UserName'|localize}}</label>
        <small
          class="helper-text invalid"
          v-if="($v.username.$dirty &&  !$v.username.required)"
        >{{'Message_EnterUserName'|localize}}</small>
      </div>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model="email"
          :class="{invalid: $v.email.$dirty &&  !$v.email.required}"
        />
        <label for="email">{{'Email' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="($v.email.$dirty &&  !$v.email.required)"
        >{{'Message_EnterEmail'|localize}}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: $v.password.$dirty &&  !$v.password.required}"
        />
        <label for="password">{{'Password'|localize}}</label>
        <small
          class="helper-text invalid"
          v-if="($v.password.$dirty &&  !$v.password.required)"
        >{{'Message_EnterPassword'| localize}}</small>
        <small class="helper-text invalid"
               v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{ 'Message_MinLength' | localize }} {{ $v.password.$params.minLength.min}}</small>
      </div>

      <button style="padding-top:5px;" class="custom-button" type="submit">
        {{'CreateEmployee'|localize}}
        <i class="material-icons right">person_add</i>
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import {email, minLength, required} from "vuelidate/lib/validators";

export default {
  name: "employees_registration",
  metaInfo() {
    return { title: this.$title('EmployeesRegistrationTitle') }
  },
  data: () => ({
    name: '',
    username: '',
    email: '',
    password: ''
  }),
  validations: {
    name: { required },
    username: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },
  methods: {
    async register() {
      //  валидация формы
      if (this.$v.$invalid) {
        // прошла ли форма валидацию
        this.$v.$touch() // активизирум валидацию
        return
      }


      const { data } = await axios.post('/api/register_employee', { ...this.$data })
      if (data.status) {
        this.$message('Вы успешно создали сотрудника')
        this.resetFormFields();
        setTimeout(() => M.updateTextFields())
      } else {
        this.$message(data.errors)
      }
    },
    resetFormFields() {
      this.name = ''
      this.username = ''
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style scoped>

</style>
