<template>
  <v-row align="center" justify="center" >
    <v-col>
      <v-card class="elevation-6 mt-10">
        <v-row>
          <v-col cols="12" md="6">
            <v-img width="100%" src="https://static.vecteezy.com/system/resources/previews/002/610/660/non_2x/woman-consulting-psychologist-vector.jpg"></v-img>
          </v-col>

          <v-col cols="12" md="6" align="center">
            <v-card-text class="mt-6">
              <h1 class="text-center ma-1 mb-5">Bienvenido a PsychoHelp</h1>
              <h3 class="text-center  grey--text ">
                Llena tus datos para continuar
              </h3>
              <v-row align="center" justify="center">
                <v-col cols="12" sm="8">
                  <v-form>
                    <v-text-field
                        outlined dense color="blue"
                        class="mt-16"
                        v-model="firstname"
                        :error-messages="firstnameErrors"
                        :counter="30"
                        label="Firstname"
                        required
                        @input="$v.firstname.$touch()"
                        @blur="$v.firstname.$touch()"
                    ></v-text-field>
                    <v-text-field
                        outlined dense color="blue"
                        v-model="lastname"
                        :error-messages="lastnameErrors"
                        :counter="30"
                        label="Lastname"
                        required
                        @input="$v.lastname.$touch()"
                        @blur="$v.lastname.$touch()"
                    ></v-text-field>
                    <v-text-field
                        outlined dense color="blue"
                        v-model="email"
                        :error-messages="emailErrors"
                        label="E-mail"
                        required
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                    ></v-text-field>


                    <v-text-field
                        outlined dense color="blue"
                        v-model="password"
                        :error-messages="passwordErrors"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        label="Password"
                        required
                        counter
                        hint="At least 8 characters"
                        @click:append="show1 = !show1"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                    ></v-text-field>


                    <v-select
                        outlined dense color="blue"
                        v-model="state"
                        :items="itemsState"
                        :error-messages="stateErrors"
                        label="Marital status"
                        required
                        @change="$v.state.$touch()"
                        @blur="$v.state.$touch()"
                    ></v-select>
                    <v-text-field
                        outlined dense color="blue"
                        v-model="number"
                        :error-messages="numberErrors"
                        :counter="9"
                        label="Phone Number"
                        required
                        @input="$v.number.$touch()"
                        @blur="$v.number.$touch()"
                    ></v-text-field>
                    <v-select
                        outlined dense color="blue"
                        v-model="gender"
                        :items="itemsGender"
                        :error-messages="genderErrors"
                        label="Gender"
                        required
                        @change="$v.gender.$touch()"
                        @blur="$v.gender.$touch()"
                    ></v-select>
                    <v-checkbox
                        outlined dense color="blue"
                        v-model="checkbox"
                        :error-messages="checkboxErrors"
                        label="Do you agree?"
                        required
                        @change="$v.checkbox.$touch()"
                        @blur="$v.checkbox.$touch()"
                    ></v-checkbox>


                    <v-btn
                        class="mr-4"
                        @click="submit"
                    >
                      submit
                    </v-btn>
                    <v-btn @click="clear">
                      clear
                    </v-btn>
                  </v-form>
                </v-col>
              </v-row>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import { validationMixin } from 'vuelidate'
import {required, maxLength, minLength, email} from 'vuelidate/lib/validators'

export default {
  name: "signup-patient",
  mixins: [validationMixin],
  validations: {
    firstname: { required, maxLength: maxLength(30) },
    lastname: { required, maxLength: maxLength(30) },
    number: { required, maxLength: maxLength(9) },
    password: { required, minLength: minLength(8) },
    email: { required, email },
    state: { required },
    gender: { required },
    checkbox: {
      checked (val) {
        return val
      },
    },
  },

  data: () => ({
    show1: false,
    firstname: '',
    lastname: '',
    email: '',
    number: '',
    password: '',
    state: null,
    gender: null,
    itemsState: [
      'Single',
      'Married',
      'Widower',
      'Divorced',
    ],
    itemsGender: [
      'Male',
      'Female',
      'Others',
    ],
    checkbox: false,
  }),

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    stateErrors () {
      const errors = []
      if (!this.$v.state.$dirty) return errors
      !this.$v.state.required && errors.push('Item is required')
      return errors
    },
    genderErrors () {
      const errors = []
      if (!this.$v.gender.$dirty) return errors
      !this.$v.gender.required && errors.push('Item is required')
      return errors
    },
    firstnameErrors () {
      const errors = []
      if (!this.$v.firstname.$dirty) return errors
      !this.$v.firstname.maxLength && errors.push('Name must be at most 30 characters long')
      !this.$v.firstname.required && errors.push('Name is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 8 characters')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    lastnameErrors () {
      const errors = []
      if (!this.$v.lastname.$dirty) return errors
      !this.$v.lastname.maxLength && errors.push('Lastname must be at most 30 characters long')
      !this.$v.lastname.required && errors.push('Lastname is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    numberErrors () {
      const errors = []
      if (!this.$v.number.$dirty) return errors
      !this.$v.number.maxLength && errors.push('Phone number must be at most 9 digit')
      !this.$v.number.required && errors.push('Phone number is required.')
      return errors
    },
  },

  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.firstname = ''
      this.lastname = ''
      this.email = ''
      this.number=''
      this.password=''
      this.state = null
      this.gender = null
      this.checkbox = false
    },
  },
}
</script>

<style scoped>

</style>


