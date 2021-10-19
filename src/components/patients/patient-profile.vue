<template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-card elevation="10">
              <v-img class="user" :src="profileData.img" max-height="350" max-width="350"></v-img>
            </v-card>
            <v-card class="mt-2" elevation="10">
              <v-card-title class="justify-center" style="font-size:2em">{{profileData.firstname}} {{ profileData.lastname }}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-card elevation="10">
              <v-card-title class="ml-5" style="font-size:2em">Perfil del usuario</v-card-title>
              <v-row class="mb-2">
                <v-col cols="12" md="6">
                  <v-card-title class="ml-10 mr-10 mb-2" >Firstname</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.firstname }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Lastname</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.lastname }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Birth Day</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:1em">{{ profileData.date }}</v-card-subtitle>
                </v-col>
                <v-divider inset vertical></v-divider>
                <v-col cols="12" md="6">
                  <v-card-title class="ml-10 mr-10 mb-2">Gender</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.gender }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">State</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.state }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Phone</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.phone }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#BBDEFB" elevation="2" large>Editar perfil</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import PatientApiService from "../../core/services/patient-api-service"

export default {
  name: "patient-profile",
  data: () => ({
    patients: [],
    profileData: [],
    userId: 0,
  }),
  async created() {
    this.userId = this.$route.params.id;
    try {
      const response = await PatientApiService.getAll();
      const response2 = await PatientApiService.getById(this.userId);
      this.patients = response.data;
      this.profileData = response2.data;
    }
    catch (e)
    {
      console.error(e);
    }
  }
}
</script>

<style scoped>
.dateProfile{
  margin-left: 40px;
}
.user {
  border-radius: 20%;
}
</style>