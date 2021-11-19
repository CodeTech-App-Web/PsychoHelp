<template>
  <v-container fluid>
  <v-row>
    <v-col cols="2">
      <v-img class="psy" contain :src="loginData.img"></v-img>
      <v-card class="rounded-xl">
        <v-card-title class="mt-4">Bienvenido(a): {{loginData.name}}</v-card-title>
      </v-card>
      <v-spacer class="my-5"></v-spacer>
      <template>
        <v-btn block color="primary" rounded @click="dialog = !dialog">New Post</v-btn>
        <v-dialog v-model="dialog" max-width="800px">
          <v-flex class="mx-auto" v-if="formAdd">
            <v-card class="mb-3 pa-3">
              <v-form @submit.prevent="addPublication">
                <v-text-field label="To post" v-model="defaultPublication.title"></v-text-field>
                <v-textarea label="What do you want to publish?" v-model="defaultPublication.description"></v-textarea>
                <v-combobox multiple v-model="defaultPublication.tags" label="Tags" append-icon chips deletable-chips class="tag-input">
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
          <v-list-item v-for="item in items" :key="item.text" @click="redirectTo(item.route, userId)">
            <v-list-item-content >
              <v-list-item-title>
                {{item.text}}
                <v-divider></v-divider>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>


      <v-col lg="8">
        <v-carousel height="20vh"  hide-delimiter-background show-arrows-on-hover rounded = "lg">
          <v-carousel-item class="flex xl12" v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="carousel_text text-h5 font-weight-medium">
                  {{ slide }}
                  <v-btn color="white">Agenda Aquí</v-btn>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
        <v-divider inset vertical></v-divider>
        <!-- CONTENIDO PARA EDIT PUBLICACION -->
        <v-flex class="mx-auto" v-if="!formEdit">
          <v-card class="mb-3 pa-3">
            <v-form @submit.prevent="editPublication">
              <v-text-field label="To post" v-model="editedPublication.title"></v-text-field>
              <v-textarea label="What do you want to publish?" v-model="editedPublication.description"></v-textarea>
              <v-combobox multiple v-model="editedPublication.tags" label="Tags" append-icon chips deletable-chips class="tag-input">
              </v-combobox>
              <v-btn block color="primary" type="submit">Edit Published</v-btn>
            </v-form>
          </v-card>
        </v-flex>

        <v-divider inset vertical></v-divider>

        <v-flex class="mx-auto">
          <v-card class="mb-3" v-for="item in publications" :key="item">
              <v-row
                  align="center"
                  class="ml-4 mt-4"
                  no-gutters
              >
                <v-avatar size="40">
                  <img
                      alt="user"
                      src="https://laverdadnoticias.com/__export/1628114924332/sites/laverdad/img/2021/08/04/jin_de_bts_miente_sobre_su_edad.jpg_305319620.jpg"
                  >
                </v-avatar>
                <p class="ml-2 mt-4">Example Name</p>
              </v-row>
            <v-divider></v-divider>
            <v-card-title>{{item.title}}</v-card-title>
            <v-card-text>
              <p class="black--text">{{item.description}}</p>
              <v-chip-group>
              <v-chip v-for="tag in item.tags " :key="tag" color="primary" outlined>{{tag}}</v-chip>
              </v-chip-group>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="white" class="ml-0" @click="editChanges(item)">Edit</v-btn>
              <v-btn color="primary" @click="deletePost(item)">Delete</v-btn>
            </v-card-actions>
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



    <v-col lg="2">
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
              <div>{{ psychology.email }}</div>
            </v-card-text>
            <!-- BOTONES CARDS-->
            <v-card-actions>
              <v-btn color="primary" text @click="psychologistDialog(psychology)">More</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <template>
      <!--DIALOG INFO PSICOLOGO SELECCIONADO-->
      <v-dialog v-model="dialogInfo" width="400" v-if="selectedPsychologist!=null" persistent>
        <v-card>
          <v-col align="center">
            <v-avatar width="100" height="100">
              <v-img :src="selectedPsychologist.img"></v-img>
            </v-avatar>
          </v-col>
          <v-card-title class="justify-center">{{ selectedPsychologist.name }}</v-card-title>
          <v-card-subtitle class="text-center">CMP: {{ selectedPsychologist.cmp }}</v-card-subtitle>
          <v-card-text class="text-justify">{{ selectedPsychologist.about }}</v-card-text>
          <v-container>
            <v-layout>
              <v-flex>
                <v-flex class="mt-2 text-end">
                  <v-btn @click.stop="dialogInfo=false">Close</v-btn>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <!--Fin del Dialog-->
    </template>

  </v-row>
  </v-container>
</template>

<script>

import PublicationsApiService from "../../core/services/publications-api-service"
import PsychologistsApiService from "../../core/services/psychologists-api.service"

export default {
  name: "homepage-psychologist",
  data: () => ({
    items: [
      {text: 'Pacientes', route:'patientDBs'},
      {text:'Centro de Ayuda', route:'/centro de ayuda'},
      {text:'Guía', route:'/video-call'}
    ],
    colors: [
      'indigo',
      'warning',
      'pink darken-2',
      'red lighten-1',
      'deep-purple accent-4',
    ],
    slides: [
      'Hasta un 20% de descuento en el paquete de citas!!!',
      'Agenda con nuestros nuevos psicólogos!'
    ],
    publications: [],
    psychologists: [],
    loginData: [],
    snackbar: false,
    message: '',
    formAdd: true,
    formEdit: true,
    dialog: false,
    dialogInfo: false,
    selectedPsychologist: null,
    editedIndex: 0,
    deletedIndex: 0,
    userId: "",
    editedPublication:{
      id:0,
      title:'',
      description:'',
      tags:[],
      psychologistId: 0
    },
    defaultPublication:{
      id:0,
      title:'',
      description:'',
      tags:[],
      psychologistId: 0
    }

  }),

  async created() {
    this.userId = this.$route.params.id;
    try {
      const response = await PublicationsApiService.getAll();
      const response2 = await PsychologistsApiService.getAll();
      const response3 = await PsychologistsApiService.getById(this.userId);
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

    addPublication(){
      if(this.defaultPublication.title === '' || this.defaultPublication.description === '' || this.defaultPublication.tags === []) {
        this.snackbar = true
        this.message = 'Llena todos los campos'
      }
      else {
        this.publications.push(this.defaultPublication);
        PublicationsApiService.create(this.defaultPublication);
        this.snackbar = true;
        this.message = 'Added post';
        this.dialog = false;
      }

    },

    editChanges(item){
      this.formEdit = false;
      this.editedIndex = this.publications.indexOf(item);
      this.editedPublication = Object.assign({}, item);
    },

    editPublication(){
      this.formEdit = true;
      Object.assign(this.publications[this.editedIndex], this.editedPublication);
      PublicationsApiService.update(this.editedPublication.id, this.editedPublication);
      this.snackbar = true;
      this.message = 'Post edited successfully';
    },

    deletePost(item) {
      this.deletedIndex = this.publications.indexOf(item);
      PublicationsApiService.delete(item.id);
      this.publications.splice(this.deletedIndex, 1);
    },

    psychologistDialog(psychologist){
      console.log('psychologistDialog psychologist:', psychologist);
      this.selectedPsychologist = psychologist;
      this.dialogInfo = true;
    },

    redirectTo(router, id) {
      this.$router.push({name: router, params:{id: id}})
    }

  }
}
</script>

<style scoped>
.psy {
  border-radius: 10%;
}



</style>