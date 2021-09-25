<template>
  <v-row>
    <v-col lg="2" v-if="$vuetify.breakpoint.mdAndDown===!true" >
      <v-img  max-width="250" src="https://cdn.vuetifyjs.com/images/john.jpg" alt="user"></v-img>
      <v-divider inset vertical></v-divider>
      <v-sheet rounded="lg">
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

    <v-col sm="12" md="10" lg="8">
      <v-carousel height="20vh"  hide-delimiter-background show-arrows-on-hover rounded = "lg">
        <v-carousel-item class="flex xl12" v-for="(slide, i) in slides" :key="i">
          <v-img :src="slide.src" max-width="131vh" max-height="20vh"></v-img>
        </v-carousel-item>
      </v-carousel>
      <v-divider inset vertical></v-divider>
      <v-sheet min-height="60vh" rounded="lg">
            <v-row v-for="publication in publications" :key="publication.id" class="py-4">
              <v-col cols="12" md="4">
                <v-card class="pl-4" flat height="100%">
                  <v-img :src="publication.img"
                      :aspect-ratio="16 / 9"
                      max-height="100%"
                  ></v-img>
                </v-card>
              </v-col>
              <v-col>
                <div>
                  <v-btn depressed color="primary">Publicaciones</v-btn>

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

                    <div class="pl-2"> Luis Panta · 23 09 2021</div>
                  </div>
                </div>
              </v-col>
            </v-row>
      </v-sheet>
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
              <div>Emprendedor</div>
              <div>Lorem Ipsun</div>
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

import PublicationsApiService from "../core/services/publications-api-service"
import PsychologistsApiService from "../core/services/psychologists-api.service"

export default {
  name: "homepage",
  data: () => ({

    publications: [],
    psychologists: [],
    colors: [
      'indigo',
      'warning',
      'pink darken-2',
      'red lighten-1',
      'deep-purple accent-4',
    ],
    slides: [
      {src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',},
      {src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',},
      {src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',},
      {src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',},
      {src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',},
    ],
    items: [
      {text: 'Psicologos', route: '/psicologos'},
      {text: 'Centro de Ayuda', route: '/centro de ayuda'},
      {text: 'Guia', route: 'guia'}
    ],

  }),
  async created() {
    try {
      const response = await PublicationsApiService.getAll();
      const response2 = await PsychologistsApiService.getAll();
      this.publications = response.data;
      this.psychologists = response2.data;
    }
    catch (e)
    {
      console.error(e);
    }
  }
}
</script>

<style scoped>

</style>