<template>
  <v-row>
    <v-col cols="2">
      <v-img max-width="250" src="https://cdn.vuetifyjs.com/images/john.jpg" alt="user"></v-img>
      <v-divider inset vertical></v-divider>
      <v-sheet rounded="lg">
        <v-list>
          <v-list-item v-for="item in items" :key="item.text" router :to="item.route">
            <v-list-item-content>
              <v-list-item-title>
                {{item.text}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>
    <v-col>
      <v-carousel cycle height="20vh" hide-delimiter-background show-arrows-on-hover rounded = "lg">
        <template v-slot:prev="{ on, attrs }">
          <v-btn color="success" v-bind="attrs" v-on="on">Previous slide</v-btn>
        </template>
        <template v-slot:next="{ on, attrs }">
          <v-btn color="info" v-bind="attrs" v-on="on">Next slide</v-btn>
        </template>
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="text-h2">
                {{ slide }} Slide
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <v-divider inset vertical></v-divider>
      <v-sheet min-height="60vh" rounded="lg">
      </v-sheet>
    </v-col>
    <v-col cols="2">
      <v-subheader> Psicologos </v-subheader>
      <!--CARDS PSICÓLOGOS-->
      <v-card class="mx-auto" >
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
      <v-divider inset vertical></v-divider>
      <v-card class="mx-auto" >
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
      'First',
      'Second',
      'Third',
      'Fourth',
      'Fifth',
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