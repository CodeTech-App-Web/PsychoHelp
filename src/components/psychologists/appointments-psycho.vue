<template>
  <div style="width: 100%; height: 100%">
    <v-btn class="mr-6" @click="openPaymentDialog">Pay</v-btn>

    <v-card class="mt-10" style="width:100%">
      <v-divider vertical></v-divider>
      <h2 class="ml-9 mb-5">Appointments</h2>
      <v-row v-for="appointment in appointments" :key="appointment">
        <v-col cols="10">
          <v-card class="mr-8 ml-8" color=#03A9F4>
            <v-card-text class="white--text" style="display: flex">
              <v-col cols="10">
                <h3 class="ml-4">
                  <v-icon color="white">mdi-calendar-range</v-icon>
                  Date Scheduled at: {{ appointment.scheduleDate}}
                </h3>
              </v-col>
              <v-col cols="2">
                <h3 class="ml-4 mr-auto">
                  <v-icon class="ml-auto" color="white">mdi-account</v-icon>
                  Patient: {{getPatientName(appointment.patientId)}}</h3>
              </v-col>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="2" class="align-content-center" style="display: grid">
          <v-btn class="mr-6" @click="patientDialog(appointment.patientId, appointment.id)">Details</v-btn>
        </v-col>
      </v-row>
    </v-card>
    <template>
      <!--DIALOG INFO PSICOLOGO SELECCIONADO-->
      <v-dialog v-model="dialogInfo" width="400" v-if="selectedAppointment!=null">
        <v-card>
          <v-card-actions class="justify-end">
            <v-icon @click="closeDialog">mdi-close</v-icon>
          </v-card-actions>
          <v-col align="center">
            <v-avatar width="100" height="100">
              <v-img :src="selectedAppointment.img"></v-img>
            </v-avatar>
          </v-col>
          <v-card-title class="justify-center">{{ selectedAppointment.firstName + " " + selectedAppointment.lastName }}</v-card-title>
          <v-card-subtitle class="text-center">{{ selectedAppointment.phone }}</v-card-subtitle>
          <v-card-text class="text-justify">{{ selectedAppointment.email }}</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn>Join</v-btn>
            <v-btn @click="closeDialog()">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Fin del Dialog-->
    </template>

    <template>
      <!--DIALOG INFO PSICOLOGO SELECCIONADO-->
      <v-dialog v-model="dialogPayment" width="400px">
        <v-card>
          <v-card-actions class="justify-end">
            <v-icon @click="closePaymentDialog">mdi-close</v-icon>
          </v-card-actions>
          <div>
            <label class="mb-4 mr-4 ml-4">Credit Card</label>
<!--            <div class="mr-4 ml-4" id="stripe-element-mount-point"/>-->
            <stripe-element-card class="mr-4 ml-4"></stripe-element-card>
          </div>
          <v-card-actions class="justify-center">
            <v-btn @click="handleSubmit()">Pay</v-btn>
            <v-btn @click="refund()">refund</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Fin del Dialog-->
    </template>
  </div>
</template>

<script>

import AppointmentApiService from '../../core/services/appointments-api.service'
import PatientApiService from '../../core/services/patient-api-service'
import { StripeElementCard } from '@vue-stripe/vue-stripe';
import {loadStripe} from "@stripe/stripe-js";

export default {
  components: {
    StripeElementCard
  },
  name: "appointments-psycho",
  data: () => ({
    token: null,
    appointments: [],
    dialogPayment:false,
    patients: [],
    userId: "",
    dialogInfo: false,
    dialog: false,
    selectedAppointment: null,
    deleteAppointment: null,
    appointmentId: 0,
    stripe: null,
    elements: null,
    Key:'pk_test_51JxFdHE3DueU8pu3V9DMyx0VUOZEFxUGMEjGqsPakEilVuRQQ8FH8wYUb8Valy6DQr4ykdCXhZnuAvLM7UFJZmGt00g9v8mDwj',
  }),

  async created() {
    this.userId = this.$route.params.id;
    const responsePatient = await PatientApiService.getAll();
    this.patients = responsePatient.data;
    await this.retrieveAppointments();
    console.log(this.dialogInfo)
  },

  methods: {
    getPatientName(id) {
      const patient = this.patients.find(patient => patient.id === id);
      return patient.firstName + " " + patient.lastName;
    },

    async patientDialog(patientId, idAppointment){
      this.appointmentId = idAppointment;
      const response = await PatientApiService.getById(patientId);
      this.selectedAppointment = response.data;
      this.dialogInfo = true;
    },

    openCancelDialog(){
      this.dialog = true;
    },

    closeDialog(){
      this.dialogInfo = false;
    },

    async retrieveAppointments(){
      const response = await AppointmentApiService.getAppointmentsByPsychologistId(this.userId);
      this.appointments = response.data;
    },

    async cancelAppointment(appointmentId){
      await AppointmentApiService.deleteAppointment(appointmentId);
      const response = await AppointmentApiService.getAppointmentsByPsychologistId(this.userId);
      this.appointments = response.data;
      this.dialog = false;
      this.dialogInfo = false;
      alert("Canceled Appointment")
    },

    //CHECKOUT

    async openPaymentDialog() {
      this.dialogPayment = true;
      const ELEMENT_TYPE = "card";
      this.stripe = await loadStripe(this.Key);
      this.elements = this.stripe.elements();
      const element =this.elements.create(ELEMENT_TYPE,{hidePostalCode: true});
      element.mount("#stripe-element-mount-point");

    },

    closePaymentDialog() {
      this.dialogPayment = false;
    },

    async refund() {
      await this.stripe.refunds.create({
        payment_intent: 'pi_3JxLiAE3DueU8pu30ozoVI9Z',
      })
    },

    async handleSubmit() {
      const cardElement = this.elements.getElement("card");
      try {
        const response = await fetch("https://stripe-psychohelp.mybluemix.net/stripe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ amount: 5000 })
        });
        const { secret } = await response.json();
        console.log("secret", secret);
        const paymentMethodReq = await this.stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });
        console.log("error?", paymentMethodReq);
        const { error } = await this.stripe.confirmCardPayment(secret, {
          payment_method: paymentMethodReq.paymentMethod.id
        });
        console.log("error?", error);
        // await this.$router.push({name: 'home'});
      } catch (error) {
        console.log("error", error);
      }
      this.dialogPayment = false;
    },
    redirect() {
      this.stripe.redirectToCheckout({
        successUrl: "http://localhost:8000/success",
        cancelUrl: "http://localhost:8000",
        lineItems: [
          {
            price: "price_1JxJ49E3DueU8pu30wETsCxs",
            quantity: 1
          }
        ],
        mode: "payment"
      });
    }

  },
}
</script>


<style scoped>

</style>