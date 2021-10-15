<template>
  <div style=";width: 100%">
    <div class="ma-2 mb-4 font-weight-medium" style="font-size:3rem">Tus pacientes</div>
    <v-sheet color="white" elevation="1" height="100%" rounded width="100%">
      <v-row align="center" justify="center">
        <v-col class="d-flex flex-wrap" >
          <v-card class="mx-auto mb-10 pb-3 justify-center" max-width="400" v-for="(patientDB,i) in patientDBs"
                  :key="i">
            <v-avatar class="ma-4" size="250">
              <img :src="patientDB.img"></v-avatar>
            <v-card-title class="justify-center">{{ patientDB.lastname }} {{ patientDB.firstname }}</v-card-title>
            <v-card-subtitle class="text-center font-weight-medium" style="font-size:1rem">{{ patientDB.date }}
            </v-card-subtitle>
            <v-card-text class="text-center font-weight-medium">{{ patientDB.email }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import PatientApiService from "../../src/core/services/patient-api-service"

export default {
  name: "patientDBs",

  data: () => ({
    id: '',
    lastname: '',
    firstname: '',
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
        lastname: patient.lastname,
        firstname: patient.firstname,
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