<template>
  <div class="fullClass">
    <v-sheet class="mt-4 ml-7 mr-7 fullClass" color=#03A9F4 rounded>
      <v-row>
        <v-col class="justify-center" cols="2">
          <v-sheet rounded class="ml-4" color=8BC6CD>
            <h2 class="ml-15 justify-center">Patient</h2>
          </v-sheet>
          <img class="mt-2 ml-4" width="93%" src="https://cd1.eju.tv/wp-content/uploads/2014/05/Las-caracteristicas-de-los-diferentes-tipos-de-rostros-2.jpg">
        </v-col>
        <v-col cols="10">
          <v-sheet rounded class="mr-4">
            <h2 class="ml-4 font-weight-regular">Datos de identificación</h2>
            <v-row>
              <v-col cols="6">
                <h4 class="ml-4 mt-3">Nombre Completo:</h4>
                <h4 class="ml-4 mt-2">Edad:</h4>
                <h4 class="ml-4 mt-2">Fecha de Nacimiento:</h4>
                <h4 class="ml-4 mt-2">Estado Civil:</h4>
              </v-col>
              <v-col cols="6">
                <h4 class="ml-4 mt-3">Ocupación:</h4>
                <h4 class="ml-4 mt-2">Dirección:</h4>
                <h4 class="ml-4 mt-2">Celular:</h4>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-sheet rounded class="ml-7 mr-7 mb-5">
            <v-row>
              <v-col cols="3">
                <h1 class="font-weight-regular Center mb-3">Historial</h1>
                <v-card hover class="mr-auto ml-auto mb-5" color=#03A9F4  width="50%" rounded>
                  <subtitle-1 class="Center">Sesión 1</subtitle-1>
                </v-card>
                <v-card hover class="mr-auto ml-auto mb-5" color=#03A9F4  width="50%" rounded>
                  <subtitle-1 class="Center">Sesión 2</subtitle-1>
                </v-card>
                <v-card hover class="mr-auto ml-auto mb-5" color=#03A9F4  width="50%" rounded>
                  <subtitle-1 class="Center">Sesión 3</subtitle-1>
                </v-card>
              </v-col>
              <v-col cols="9">
                  <v-card class="mr-8 mt-5" color=#03A9F4>
                    <v-divider inset vertical></v-divider>
                    <h3 class="ml-5 font-weight-regular">Sesión 1 - 01/05/2021</h3>
                    <v-card class="ml-5 mr-5 mb-5 mt-5">
                      <h4 class="ml-8 font-weight-regular">Motivo de la consulta</h4>
                    </v-card>
                    <v-card class="ml-5 mr-5 mb-5">
                      <h4 class="ml-8 font-weight-regular">Motivo de la consulta</h4>
                    </v-card>
                    <v-card class="ml-5 mr-5 mt-5">
                      <h4 class="ml-8 font-weight-regular">Motivo de la consulta</h4>
                      <h4 class="ml-8 font-weight-regular">Motivo de la consulta</h4>
                    </v-card>
                    <v-divider inset vertical></v-divider>
                  </v-card>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "psychologist-logbook",
  data: () => ({
    patients: [],
    userId: 0,
  }),
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

</style>