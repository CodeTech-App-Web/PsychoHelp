<template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-card elevation="10">
              <v-img lazy-src="../assets/psychologist1.jpg" max-height="370" max-width="370"
                     src="../assets/psychologist1.jpg"></v-img>
            </v-card>
            <v-card class="mt-2" elevation="10">
              <v-card-title class="justify-center" style="font-size:2em">Nombre de psicologo</v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-card elevation="10">
              <v-card-title class="ml-5" style="font-size:2em">Perfil del usuario</v-card-title>
              <v-row class="mb-2">
                <v-col cols="12" md="6">
                  <v-card-title class="ml-10 mr-10 mb-2" >Name</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">Maria Vargas Quispe</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Birth Day</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">2001-28-04</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">DNI</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">12345678</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Phone</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">963258741</v-card-subtitle>
                </v-col>
                <v-divider inset vertical></v-divider>
                <v-col cols="12" md="6">
                  <v-card-title class="ml-10 mr-10 mb-2">Registered E-mail</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">usuario1@gmail.com</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Gender</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">Male</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Session Type</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">Individual</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">CMP</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">963258741</v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12">
                  <v-card-title class="ml-10 mr-10 mb-2">Specialization</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">Trastorno por estrés postraumático", "Conflictos de pareja", "Ansiedad</v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12">
                  <v-card-title class="ml-10 mr-10 mb-2">Formation</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">Maestría en Psicología Clínica - Universidad Cesar Vallejo", "Licenciatura en Psicología - Universidad Cesar Vallejo</v-card-subtitle>
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
export default {
  name: "psychologist-profile"
}
</script>

<style scoped>
.dateProfile{
  margin-left: 40px;
}
</style>