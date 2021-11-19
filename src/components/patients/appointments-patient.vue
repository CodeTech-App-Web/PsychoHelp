<template>
  <div style="width: 100%; height: 100%">
    <v-card class="mt-10" style="width:100%">
      <v-divider vertical></v-divider>
      <h2 class="ml-9 mb-5">Appointments</h2>
      <v-row v-for="appointment in appointments" :key="appointment">
        <v-col cols="10">
          <v-card class="mr-8 ml-8" color=#03A9F4>
            <v-card-text class="white--text" style="display: flex">
              <v-col cols="9">
                <h3 class="ml-4">
                  <v-icon color="white">mdi-calendar-range</v-icon>
                  Date Scheduled at: {{ appointment.scheduleDate}}
                </h3>
              </v-col>
              <v-col cols="3">
                <h3 class="ml-4 mr-auto">
                  <v-icon class="ml-auto" color="white">mdi-account</v-icon>
                  Psychologist: {{getPsychologistName(appointment.psychoId)}}</h3>
              </v-col>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="2" class="align-content-center" style="display: grid">
          <v-btn class="mr-6" @click="psychologistDialog(appointment.psychoId, appointment.id)">Details</v-btn>
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
          <v-card-title class="justify-center">{{ selectedAppointment.name }}</v-card-title>
          <v-card-subtitle class="text-center">{{ selectedAppointment.phone }}</v-card-subtitle>
          <v-card-text class="text-justify">{{ selectedAppointment.email }}</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="joinMeet">Join</v-btn>
            <v-btn>ReSchedule</v-btn>
            <v-btn @click="openCancelDialog()">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Fin del Dialog-->
    </template>

    <template>
      <!--DIALOG INFO PSICOLOGO SELECCIONADO-->
      <v-dialog v-model="dialog" width="400">
        <v-card>
          <v-card-title class="justify-center">Do you want to cancel your appointment?</v-card-title>
          <v-card-actions class="justify-center">
            <v-btn @click="cancelAppointment(appointmentId)">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Fin del Dialog-->
    </template>
  </div>
</template>

<script>

import AppointmentApiService from '../../core/services/appointments-api.service'
import PsychologistApiService from '../../core/services/psychologists-api.service'

export default {
  name: "appointments-patient",
  data: () => ({
    appointments: [],
    psychologists: [],
    userId: "",
    dialogInfo: false,
    dialog: false,
    selectedAppointment: null,
    deleteAppointment: null,
    appointmentId: 0,
  }),

  async created() {
    this.userId = this.$route.params.id;
    const responsePsychologist = await PsychologistApiService.getAll();
    this.psychologists = responsePsychologist.data;
    await this.retrieveAppointments();
    console.log(this.dialogInfo)
  },

  methods: {

    getPsychologistName(id) {
      return this.psychologists.find(psychologists => psychologists.id == id).name;
    },

    async psychologistDialog(psychoId, idAppointment){
      this.appointmentId = idAppointment;
      const response = await PsychologistApiService.getById(psychoId);
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
      const response = await AppointmentApiService.getAppointmentsByPatientId(this.userId);
      this.appointments = response.data;
    },

    async cancelAppointment(appointmentId){
      await AppointmentApiService.deleteAppointment(appointmentId);
      const response = await AppointmentApiService.getAppointmentsByPatientId(this.userId);
      this.appointments = response.data;
      this.dialog = false;
      this.dialogInfo = false;
      alert("Canceled Appointment")
    },

    async joinMeet() {
      const response = await AppointmentApiService.getAppointmentId(this.appointmentId);
      const appointment = response.data;
      window.open(appointment.psychoNotes);
    }
  },
}
</script>


<style scoped>

</style>