<template>
  <div style=";width: 100%">
    <div class="ma-2 mb-4 font-weight-medium" style="font-size:1.5rem">Tus Pacientes</div>
    <v-sheet color="white" elevation="1" height="100%" rounded width="100%">
      <v-row align="center" justify="center">
        <v-col class="d-flex flex-wrap" >
          <v-card class="mx-auto mb-10 pb-3 justify-center" width="280" v-for="(patientDB,i) in patientDBs"
                  :key="i">
            <v-col align="center">
              <v-avatar class="mt-4" width="100" height="100">
                <img :src="patientDB.img"></v-avatar>
            </v-col>
            <v-card-title class="justify-center font-weight-bold text-lg-body-1">{{ patientDB.lastName }} {{ patientDB.firstName }}</v-card-title>
            <v-card-subtitle class="text-center" style="font-size:1rem">{{ patientDB.date }}
            </v-card-subtitle>
            <v-card-text class="text-center" style="color: black">{{ patientDB.email }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import PatientApiService from "../../core/services/patient-api-service"

export default {
  name: "patientDBs",

  data: () => ({
    id: '',
    lastName: '',
    firstName: '',
    email: '',
    date: '',
    img: '',
    patientDBs: []
  }),
  computed: {},
  watch: {},
  methods: {
    getDisplayPatient(patient) {
      return {
        id: patient.id,
        lastName: patient.lastName,
        firstName: patient.firstName,
        email: patient.email,
        date: patient.date,
        img: patient.img,
      }
    },
    retrievePatient() {
      PatientApiService.getAll()
          .then(response => {
            this.patientDBs = response.data.map(this.getDisplayPatient);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.retrievePatient();
  }
}
</script>

<style scoped>
.circular_image {
  border-radius: 50%;
}
</style>