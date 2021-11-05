<template>
  <v-row>
    <v-col lg="2" v-if="$vuetify.breakpoint.mdAndDown===!true" >
      <v-img class="pat" contain :src="loginData.img"></v-img>
      <span class="mt-8 ml-3">User: {{loginData.lastname}}</span>
      <v-divider inset vertical></v-divider>
      <v-sheet elevation="8" class="pa-2" rounded="xl" color=white>
        <v-list>
          <v-list-item v-for="item in items" :key="item.text" router :to="item.route">
            <v-list-item-content>
              <v-list-item-title>
                {{item.text}}
              </v-list-item-title>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>

    <v-col justify="center" sm="12" md="10" lg="8">
      <v-carousel height="20vh"  hide-delimiter-background show-arrows-on-hover rounded = "lg">
        <v-carousel-item class="flex xl12" v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class= " carousel_text text-lg-h5 text-sm-h6 font-weight-medium">
                {{ slide }}
              </div>
              <v-btn color="white">Agenda Aquí</v-btn>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <v-divider inset vertical></v-divider>

      <!-- PUBLICATIONS !-->

      <v-card min-width="50vh" rounded="lg">
            <v-row v-for="publication in publications" :key="publication.id" class="py-4 mr-2">
              <v-col cols="12" md="4">
                <v-card class="pl-4" flat height="100%">
                  <v-img :src="publication.img"
                      :aspect-ratio="16 / 9"
                      max-height="90%"
                  ></v-img>
                </v-card>
              </v-col>
              <v-col class="ml-4">
                <div>
                  <v-btn @click="redirectToPublication(publication.id)" depressed color="primary">Publicaciones</v-btn>

                  <h3 class="text-lg-h5 font-weight-bold pt-3">
                    {{publication.title}}
                  </h3>

                  <p class="text-h6 font-weight-regular pt-3 text--secondary">
                    {{publication.description}}
                  </p>

                  <div class="d-flex align-center">
                    <v-avatar color="primary" size="36">
                      <v-icon dark>mdi-feather</v-icon>
                    </v-avatar>

                    <div class="pl-2">  23 09 2021</div>
                  </div>
                </div>
              </v-col>
            </v-row>
      </v-card>
    </v-col>
    <v-col sm="" lg="2">
      <v-divider inset vertical></v-divider>
      <!--CARDS PSICÓLOGOS-->
      <v-subheader>NUEVOS PSICOLOGOS</v-subheader>
      <v-row>
        <v-col  sm="4" md="2" lg="12" v-for="psychology in psychologists" :key="psychology">
          <v-card v-if="psychology.new" max-height="300" max-width="200" class="mx-auto mb-5" >
            <v-img aspect-ratio="14:9" height="150" width="200" class="white--text align-end" :src="psychology.img">
            </v-img>
            <v-card-subtitle class="pb-0">
              {{psychology.name}}
            </v-card-subtitle>
            <v-card-text class="text--primary">
              <div>{{ psychology.email}}</div>
            </v-card-text>
            <!-- BOTONES CARDS-->
            <v-card-actions>
              <v-btn color="primary" text>Mas...</v-btn>
              <v-btn color="primary" text>Agendar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>

import PublicationsApiService from "../../core/services/publications-api-service"
import PsychologistsApiService from "../../core/services/psychologists-api.service"
import PatientApiService from "../../core/services/patient-api-service"

export default {
  name: "homepage",
  data: () => ({

    publications: [],
    psychologists: [],
    loginData: [],
    userId: 0,
    colors: [
      '#03A9F4',
      '#03A9F4',
    ],
    slides: [
        'Hasta un 20% de descuento en el paquete de citas!!!',
        'Agenda con nuestros nuevos psicólogos!'
    ],
    buttons: [
        'Agenda aquí',

    ],
    items: [
      {text: 'Psicologos', route: '/dashboard_psycho'},
      {text: 'Centro de Ayuda', route: '/centro de ayuda'},
      {text: 'Guia', route: '/guia'}
    ],
    specialties: [
        'Terapias de pareja',
        'Autoestima',
        'Ansiedad'
    ]

  }),
  async created() {
    this.userId = this.$route.params.id;
    try {
      const response = await PublicationsApiService.getAll();
      const response2 = await PsychologistsApiService.getAll();
      const response3 = await PatientApiService.getById(this.userId);
      this.publications = response.data;
      this.psychologists = response2.data;
      this.loginData = response3.data;
    }
    catch (e)
    {
      console.error(e);
    }
  },

  methods: {
    redirectToPublication(publicationId) {
      this.$router.push({name:'patient-publication', params:{id: publicationId}})
    }
  }
}
</script>

<style scoped>
.pat {
  border-radius: 10%;
}

.carousel_text {
  color: white;

}

</style>