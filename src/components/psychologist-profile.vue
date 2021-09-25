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
              <v-card-title class="ml-5" style="font-size:2em">Perfil del psicologo</v-card-title>
              <v-text-field v-model="name" :rules="nameRules" label="Nombres y apellidos"
                            class="ml-10 mr-10" required></v-text-field>
              <v-text-field v-model="birthdate" :rules="birthdateRules" label="Fecha de nacimiento"
                            class="ml-10 mr-10" required></v-text-field>
              <v-text-field v-model="dni" :rules="dniRules" label="Numero de DNI"
                            class="ml-10 mr-10" required></v-text-field>
              <v-text-field v-model="email" :rules="emailRules" label="Correo electrónico"
                            class="ml-10 mr-10" required></v-text-field>
              <v-text-field v-model="cpsp" :rules="cpspRules" label="Codigo de CMP/CPSP"
                            class="ml-10 mr-10" required></v-text-field>
              <v-text-field v-model="studies" :rules="studieslRules" label="Formacion"
                            class="ml-10 mr-10" required></v-text-field>
              <v-text-field v-model="aboutme" :rules="aboutmeRules" label="Sobre mi"
                            class="ml-10 mr-10" required></v-text-field>
              <v-card-actions class="justify-center">
                <v-btn color="primary" text large>Guardar cambios</v-btn>
                <v-btn color="#BBDEFB" elevation="2" large>Editar perfil</v-btn>
                <v-btn color="error" text large>Cancelar</v-btn>
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

</style>