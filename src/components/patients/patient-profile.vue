<template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-card elevation="10" max-height="400" max-width="400">
              <v-img class="user " :src="profileData.img" max-height="400" max-width="400"></v-img>
            </v-card>
            <v-card class="mt-2" elevation="10">
              <v-card-title class="justify-center" style="font-size:2em">{{ profileData.firstname }}
                {{ profileData.lastname }}
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-card elevation="10">
              <v-card-title class="ml-5" style="font-size:2em">Perfil del usuario</v-card-title>
              <v-row class="mb-2">
                <v-col cols="12" md="6">
                  <v-card-title class="ml-10 mr-10 mb-2">Firstname</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{profileData.firstname }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Gender</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.gender }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">State</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.state }}</v-card-subtitle>
                </v-col>
                <v-divider inset vertical></v-divider>
                <v-col cols="12" md="6">
                  <v-card-title class="ml-10 mr-10 mb-2">Lastname</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{profileData.lastname }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Birth Day</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:1em">{{ profileData.date }}</v-card-subtitle>
                  <v-card-title class="ml-10 mr-10 mb-2">Phone</v-card-title>
                  <v-card-subtitle class="dateProfile" style="font-size:18px">{{ profileData.phone }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>

              <v-card-actions>
                <v-row>
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn class="ma-6" color="#BBDEFB" elevation="2" large v-bind="attrs" v-on="on">Editar perfil</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">Perfil del usuario</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" >
                              <v-text-field :rules="firtsRules" label="First name*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" >
                              <v-text-field :rules="lastRules" label="Last name*" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-file-input :rules="imgRules" accept="image/png, image/jpeg, image/bmp"
                                            placeholder="Elija una foto de perfil" prepend-icon="mdi-camera"
                                            label="Foto de perfil"></v-file-input>
                            </v-col>
                            <v-col cols="12" sm="6" >
                              <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field v-model="date" label="Birthday*" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-select :rules="genderRules" :items="['Masculine', 'Feminine', 'Not specified']" label="Gender*" required></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-select :items="['Single', 'Married', 'Divorced', 'Widower']" label="State"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-text-field :rules="phoneRules" label="Phone*" required></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small class="ml-3">*indicates required field</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog = false">Guardar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
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
    dialog: false,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    imgRules: [
      value => !value || value.size < 2000000 || 'La imagen de perfil debe pesar menos de 2 MB!',
    ],
    firtsRules: [
      v => !!v || 'Firts name es obligatorio',
    ],
    lastRules: [
      v => !!v || 'Last name es obligatorio',
    ],
    genderRules: [
      v => !!v || 'Gender es obligatorio',
    ],
    phoneRules: [
      v => !!v || 'Phone es obligatorio',
    ],
  }),
  async created() {
    this.userId = this.$route.params.id;
    try {
      const response = await PatientApiService.getAll();
      const response2 = await PatientApiService.getById(this.userId);
      this.patients = response.data;
      this.profileData = response2.data;
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped>
.dateProfile {
  margin-left: 40px;
}

.user {
  border-radius: 20%;
}
</style>