<template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-card elevation="10">
              <v-img :src="profileData.img" max-height="370" max-width="370"></v-img>
            </v-card>
            <v-card class="mt-2" elevation="10">
              <v-card-title class="justify-center" style="font-size:2em">{{ profileData.name }}</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-card elevation="10">
              <v-card-title class="ml-5" style="font-size:2em">Perfil del usuario</v-card-title>
              <v-row class="mb-2">
                <v-col cols="12" md="6">
                  <v-card-title class="ml-10 mr-10 mb-2" >Name</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.name }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Birth Day</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.age }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">DNI</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.dni }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Phone</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.phone }}</v-card-subtitle>
                </v-col>
                <v-divider inset vertical></v-divider>
                <v-col cols="12" md="6">
                  <v-card-title class="ml-10 mr-10 mb-2">Registered E-mail</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.email }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Gender</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.genre }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Session Type</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.sessionType }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">CMP</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.cmp }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12">
                  <v-card-title class="ml-10 mr-10 mb-2">Specialization</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.specialization }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12">
                  <v-card-title class="ml-10 mr-10 mb-2">Formation</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.formation }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12">
                  <v-card-title class="ml-10 mr-10 mb-2">About</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.about }}</v-card-subtitle>
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
import PsychologistsApiService from "../../core/services/psychologists-api.service";

export default {
  name: "psychologist-profile",
  data: () => ({
    psychologists: [],
    profileData: [],
    userId: 0,
  }),
  async created() {
    this.userId = this.$route.params.id;
    try {
      const response = await PsychologistsApiService.getAll();
      const response2 = await PsychologistsApiService.getById(this.userId);
      this.psychologists = response.data;
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
</style>