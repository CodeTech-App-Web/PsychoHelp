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
    <v-col cols="8">
      <v-carousel height="20vh"  hide-delimiter-background show-arrows-on-hover rounded = "lg">
        <v-carousel-item class="flex xl12" v-for="(slide, i) in slides" :key="i">
          <v-img :src="slide.src" max-width="131vh" max-height="20vh"></v-img>
        </v-carousel-item>
      </v-carousel>
      <v-divider inset vertical></v-divider>
      <v-sheet min-height="60vh" rounded="lg">
            <v-row v-for="i in 4" :key="i" class="py-4">
              <v-col cols="12" md="4">
                <v-card class="pl-4" flat height="100%">
                  <v-img
                      src="https://cdn.pixabay.com/photo/2021/01/27/06/54/nova-scotia-duck-tolling-retriever-5953883_1280.jpg"
                      :aspect-ratio="16 / 9"
                      height="100%"
                  ></v-img>
                </v-card>
              </v-col>
              <v-col>
                <div>
                  <v-btn depressed color="primary">Publicaciones</v-btn>

                  <h3 class="text-lg-h5 font-weight-bold pt-3">
                    Ut enim blandit volutpat maecenas volutpat blandit
                  </h3>

                  <p class="text-h6 font-weight-regular pt-3 text--secondary">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>

                  <div class="d-flex align-center">
                    <v-avatar color="primary" size="36">
                      <v-icon dark>mdi-feather</v-icon>
                    </v-avatar>

                    <div class="pl-2">Luis Panta · 23 09 2021</div>
                  </div>
                </div>
              </v-col>
            </v-row>
      </v-sheet>
    </v-col>
    <v-col sm="" lg="2" >
      <v-divider inset vertical></v-divider>
      <!--CARDS PSICÓLOGOS-->
      <v-subheader>NUEVOS PSICOLOGOS</v-subheader>
      <v-row>
        <v-col sm="4" lg="12" v-for="i in 3" :key="i" >
          <v-card class="mx-auto mb-5" >
            <v-img class="white--text align-end" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
              <v-card-title>Juan Hidalgo</v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0">
              Juan Hidalgo Viscaya
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
export default {
  name: "homepage",
  data: () => ({
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
      {text: 'Psicologos', route:'/psicologos'},
      {text:'Centro de Ayuda', route:'/centro de ayuda'},
      {text:'Guia', route:'guia'}
    ]
  })
}
</script>

<style scoped>

</style>