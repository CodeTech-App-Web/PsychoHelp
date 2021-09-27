<template>
  <v-row>
    <v-col cols="2">
      <v-img class="psy" contain src="https://i.pinimg.com/originals/29/ba/5e/29ba5e5aa2fc49070ae3caec4b3a1680.jpg"></v-img>
      <v-spacer class="my-5"></v-spacer>
      <template>
        <v-btn block color="primary" rounded
            @click="dialog = !dialog"
        >Nuevo Post</v-btn>
        <v-dialog v-model="dialog" max-width="800px">
          <v-flex class="mx-auto" v-if="formAdd">
            <v-card class="mb-3 pa-3">
              <v-form @submit.prevent="addPost">
                <v-text-field label="To post" v-model="title"></v-text-field>
                <v-textarea label="What do you want to publish?" v-model="description"></v-textarea>
                <v-combobox multiple v-model="tags" label="Tags" append-icon chips deletable-chips class="tag-input">
                </v-combobox>
                <v-btn block color=#BBDEFB type="submit">Add Published</v-btn>
              </v-form>
            </v-card>
          </v-flex>
        </v-dialog>
      </template>
      <v-divider inset vertical class="mx-4"></v-divider>
      <v-sheet elevation="8" class="pa-2" rounded="xl" color=white>
        <v-list shaped >
          <v-list-item v-for="item in items" :key="item.text" router :to="item.route">
            <v-list-item-content>
              <v-list-item-title>
                {{item.text}}
                <v-divider></v-divider>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>

    <v-container>
      <v-col>
        <v-carousel class="des" height="20vh"  hide-delimiter-background show-arrows-on-hover rounded = "lg">
          <v-carousel-item class="flex xl12" v-for="(slide, i) in slides" :key="i">
            <v-img :src="slide.src" max-width="131vh" max-height="20vh"></v-img>
          </v-carousel-item>
        </v-carousel>
        <v-divider inset vertical></v-divider>
        <!-- CONTENIDO PARA EDIT PUBLIACION -->
        <v-flex class="mx-auto" v-if="!formAdd">
          <v-card class="mb-3 pa-3">
            <v-form @submit.prevent="editPost">
              <v-text-field label="To post" v-model="title"></v-text-field>
              <v-textarea label="What do you want to publish?" v-model="description"></v-textarea>
              <v-combobox multiple v-model="tags" label="Tags" append-icon chips deletable-chips class="tag-input">
              </v-combobox>
              <v-btn block color=#757575 type="submit">Edit Published</v-btn>
            </v-form>
          </v-card>
        </v-flex>

        <v-divider inset vertical></v-divider>

        <v-flex class="mx-auto">
          <v-card class="mb-3" v-for="(item, index) in publications" :key="index">
            <v-card-text>
              <v-chip class="ma-2 ml-0" color=#03A9F4 label>
                <v-icon left>
                  mdi-account-circle-outline
                </v-icon>
                {{item.title}}
              </v-chip>
              <p class="black--text">{{item.description}}</p>
              <v-chip v-for="tag in item.tags " :key="tag" >{{tag}}</v-chip>
              <v-spacer class="my-3"></v-spacer>
                  <v-btn color=#BDBDBD class="ml-0" @click="edit(index)">Editar</v-btn>
                  <v-btn color="black white--text" @click="deletePost(item.id)">Eliminar</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>

      </v-col>

      <v-snackbar v-model="snackbar">
        {{ message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>

    </v-container>

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
  name: "homepage-psychologist",
  data: () => ({

    items: [
      {text: 'Calendario', route:'/psicologos'},
      {text:'Centro de Ayuda', route:'/centro de ayuda'},
      {text:'Guia', route:'guia'}
    ],
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
    publications: [],
    psychologists: [],
    title: '',
    description: '',
    snackbar: false,
    message: '',
    formAdd: true,
    indexPost: '',
    dialog: false,
    tags:[]
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
  },

  methods: {
    addPost() {
      if(this.title === '' || this.description === '' || this.tags === []) {
        this.snackbar = true
        this.message = 'Llena todos los campos'
      } else {
        this.publications.push ({
          id: Date.now(),
          title: this.title,
          description: this.description,
          tags: this.tags,
        })
        this.title = ''
        this.description = ''
        this.snackbar = true
        this.message = 'added post'
        this.tags = []
      }
    },

    deletePost(id) {
      this.publications = this.publications.filter(e => e.id !== id)
    },
    edit(index) {
      this.formAdd = false
      this.title = this.publications[index].title
      this.description = this.publications[index].description
      this.tags = this.publications[index].tags
      this.indexPost = index
    },
    editPost() {
      this.publications[this.indexPost].title = this.title
      this.publications[this.indexPost].description = this.description
      this.publications[this.indexPost].tags = this.tags
      this.formAdd = true
      this.title = ''
      this.description = ''
      this.tags = []
      this.snackbar = true
      this.message = 'Editaste la tarea'
    },

  }
}
</script>

<style scoped>
.psy {
  border-radius: 10%;
}

</style>