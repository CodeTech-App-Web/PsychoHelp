<template>
  <div class="fullClass">
    <v-sheet class="mt-4 ml-7 mr-7 fullClass" color=#03A9F4 rounded>
      <v-row>
        <v-col cols="2">
          <v-card rounded class="ml-4" color=8BC6CD>
            <h2 class="Center">{{patients.firstname}}</h2>
          </v-card>
          <img class="mt-2 ml-4" width="95%" height="135vw" :src="patients.img">
        </v-col>
        <v-col cols="10">
          <v-sheet rounded class="mr-4">
            <h2 class="ml-4 font-weight-regular">Datos de identificación</h2>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="6">
                <h4 class="ml-4 mt-3">Nombre Completo: {{patients.firstname + " " + patients.lastname}}</h4>
                <h4 class="ml-4 mt-2">Edad: {{dateNow()}}</h4>
                <h4 class="ml-4 mt-2">Fecha de Nacimiento: {{patients.date}}</h4>
                <h4 class="ml-4 mt-2">Estado Civil: {{patients.state}}</h4>
              </v-col>
              <v-col cols="6">
                <h4 class="ml-4 mt-3">Email: {{patients.email}}</h4>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card rounded class="ml-7 mr-7 mb-5">
            <v-row>
              <v-col cols="3">
                <h1  class="font-weight-regular Center mb-3">Citas</h1>
                <div>
                  <v-card height="5vh" v-for="appointment in patients.appointments" :key="appointment"
                          hover class="mr-auto ml-auto mb-5 cardCenter" color=#03A9F4  width="50%" rounded>
                    <subtitle-1 @click="retrieveAppointmentInfo(appointment.id)" class="Center white--text">{{appointment.date}}</subtitle-1>
                  </v-card>
                </div>
              </v-col>
              <v-col cols="9">
                  <v-card class="mr-8 mt-5" color=#03A9F4>
                    <v-divider inset vertical></v-divider>
                    <h3 class="ml-5 font-weight-regular white--text">{{date}}</h3>

                    <v-card class="ml-5 mr-5 mb-8 mt-8">
                      <v-row>
                        <v-col cols="3">
                          <h4 class="ml-8 font-weight-regular">Motivo de la consulta:</h4>
                        </v-col>
                        <v-col cols="9">
                          <h4 class="ml-5 font-weight-regular">{{motive}}</h4>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-card class="ml-5 mr-5 mb-8">
                      <v-row>
                        <v-col cols="3">
                          <h4 class="ml-8 font-weight-regular">Historia Personal: </h4>
                        </v-col>
                        <v-col cols="9">
                          <h4 class="ml-5 font-weight-regular">{{personalHistory}}</h4>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-card class="ml-5 mr-5 mb-8">
                      <v-row>
                        <v-col cols="3">
                          <h4 class="ml-8 font-weight-regular">Pruebas realizadas: </h4>
                        </v-col>
                        <v-col cols="9">
                          <h4 class="ml-5 font-weight-regular">{{testRealized}}</h4>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-card class="ml-5 mr-5 mb-5">
                      <v-row>
                        <v-col cols="3">
                          <h4 class="ml-8 font-weight-regular">Tratamiento: </h4>
                        </v-col>
                        <v-col cols="9">
                          <h4 class="ml-5 font-weight-regular">{{treatment}}</h4>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-divider inset vertical></v-divider>
                  </v-card>
              </v-col>
            </v-row>
            <v-col class="End">
              <v-btn color=#03A9F4 class="mr-5 btnCol white--text" @click="editDialog(dataAppointment)"> Editar </v-btn>
            </v-col>

            <template>
              <!--DIALOG INFO PSICOLOGO SELECCIONADO-->
              <v-dialog v-model="dialog" width="600" v-if="actualSession!=null" persistent>
                <v-card color=#03A9F4>
                  <v-form>
                    <v-card-title class="justify-start">
                      <span class="ml-5 white--text">Observaciones</span>
                      <v-spacer></v-spacer>
                      <v-menu bottom left>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn color="white" class="mr-5" @click="cancelDialog()" icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </template>
                      </v-menu>
                    </v-card-title>
                    <v-card elevation="0" class="mr-5 ml-5">
                      <v-divider inset vertical></v-divider>
                      <v-text-field clearable class="ml-10 mr-10" v-model="motiveForm" label="Motivo de la Consulta"></v-text-field>
                      <v-text-field clearable class="mt-5 ml-10 mr-10" v-model="personalHistoryForm" label="Historia Personal"></v-text-field>
                      <v-text-field clearable class="mt-5 ml-10 mr-10" v-model="testRealizedForm" label="Test Realizados"></v-text-field>
                      <v-text-field clearable class="mt-5 ml-10 mr-10" v-model="treatmentForm" label="Historia Personal"></v-text-field>
                    </v-card>
                  </v-form>
                  <v-card-actions class="mt-2 justify-end">
                    <v-btn @click="editDialog()">Cancel</v-btn>
                    <v-btn class="mr-5" @click="saveDialog()">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!--Fin del Dialog-->
            </template>

          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import PatientApiService from "../../core/services/patient-api-service"
import AppointmentApiService from "../../core/services/appointments-api.service"

export default {
  name: "psychologist-logbook",
  data: () => ({
    patients: [],
    motive: "",
    motiveForm: "",
    personalHistory: "",
    personalHistoryForm: "",
    testRealized: "",
    testRealizedForm: "",
    treatment: "",
    treatmentForm: "",
    date: "",
    patientId: 0,
    actualSession: null,
    dialog: false,
    dataAppointment: {}
  }),

  async created() {
    try {
      this.patientId = this.$route.params.id;
      const response = await PatientApiService.findAppointments(this.patientId);
      this.patients = response.data;
    }
    catch (e)
    {
      console.error(e);
    }
  },

  methods: {
    async retrieveAppointmentInfo(appointmentId) {
      const response = await AppointmentApiService.getAppointmentId(appointmentId);
      this.dataAppointment = response.data;
      this.motive = this.dataAppointment.motive;
      this.personalHistory = this.dataAppointment.personalHistory;
      this.testRealized = this.dataAppointment.testRealized;
      this.treatment = this.dataAppointment.treatment;
      this.date = this.dataAppointment.date;
      console.log(this.dataAppointment.motive)
    },

    dateNow() {
      let rightNow = new Date();
      let res = rightNow.toISOString().slice(0,4);
      let sum = res - this.patients.date.slice(0,4);
      return sum;
    },

    editDialog(session){
      console.log(this.dataAppointment.length);
      this.actualSession = session;
      this.motiveForm = this.motive;
      this.personalHistoryForm = this.personalHistory;
      this.testRealizedForm = this.testRealized;
      this.treatmentForm = this.treatment;
      this.dialog = true;
    },

    cancelDialog() {
      this.dialog = false;
    },

    saveDialog() {
      this.motive = this.motiveForm;
      this.personalHistory = this.personalHistoryForm;
      this.testRealized = this.testRealizedForm;
      this.treatment = this.treatmentForm;
      let object = {
        id:this.dataAppointment.id,
        scheduleId: this.dataAppointment.scheduleId,
        psychologistId: this.dataAppointment.patientId,
        patientId: this.dataAppointment.patientId,
        date: this.dataAppointment.date,
        motive: this.motiveForm,
        personalHistory: this.personalHistoryForm,
        testRealized: this.testRealizedForm,
        treatment: this.treatmentForm}
      AppointmentApiService.updateAppointment(this.dataAppointment.id, object);
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

.fullClass {
  height: 100%;
}

img {
  border-radius: 2%;
}

.Center {
  justify-items: center;
  display: grid;
}

.End {
  justify-items: end;
  display: grid;
}

.cardCenter {
  display: grid;
  align-content: center;
}

.btnCol {
  font-palette: light;
}

</style>