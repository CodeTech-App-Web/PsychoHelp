<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-sheet rounded="lg">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 sm12>
                <v-card>
                  <v-card-title class="text-lg-subtitle-2">¿Ya tienes psicólogo? Búscalo por su nombre</v-card-title>
                  <v-card-actions>
                    <v-text-field v-model="search" label="Search Name" outlined v-on:input="getPsychologistByName()"></v-text-field>
                  </v-card-actions>
                  <v-card-title>Filtrar por</v-card-title>
                  <v-divider></v-divider>
                  <v-card-title class="text-lg-subtitle-1">Género</v-card-title>
                  <v-card-text>
                    <v-radio-group v-model="genre">
                      <v-radio label="Masculino" value="Masculino" v-on:click="getPsychologistsByFilter(genre, sessionType)"></v-radio>
                      <v-radio label="Femenino" value="Femenino" v-on:click="getPsychologistsByFilter(genre, sessionType)"></v-radio>
                    </v-radio-group>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-title class="text-lg-subtitle-1">Tipo de Sesión</v-card-title>
                  <v-card-text>
                  <v-radio-group v-model="sessionType">
                    <v-radio label="Individual" value="Individual" v-on:click="getPsychologistsByFilter(genre, sessionType)"></v-radio>
                    <v-radio label="De Pareja" value="Pareja" v-on:click="getPsychologistsByFilter(genre, sessionType)"></v-radio>
                  </v-radio-group>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                  <v-btn class="mr-4" @click="clear()" block>Clear</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-sheet>
      </v-col>
      <!--LISTA DE PSICOLOGOS-->
      <v-col>
        <v-sheet rounded="lg">
      <v-container>
        <v-row>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex v-for="psychologist in psychologists" :key="psychologist.id" xs12 sm4>
                <v-card min-height="350" class="mx-auto">
                  <v-col align="center">
                    <v-avatar width="100" height="100">
                      <v-img :src="psychologist.img"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-card-title class="justify-center font-weight-bold text-lg-h6">{{psychologist.name}}</v-card-title>
                  <v-card-subtitle class="text-center">{{psychologist.email}}</v-card-subtitle>
                  <v-card-actions>
                    <v-container>
                      <v-row dense>
                        <v-col align="center">
                          <v-btn class="text-lg-overline mb-5" text @click="psychologistDialog(psychologist)">Ver Perfil</v-btn>
                        </v-col>
                        <v-col align="center">
                          <v-btn>Agendar Cita</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-row>
      </v-container>
        </v-sheet>
      </v-col>
    </v-row>
    <template>
      <!--DIALOG INFO PSICOLOGO SELECCIONADO-->
      <v-dialog v-model="dialog" width="600" v-if="selectedPsychologist!=null" persistent>
        <v-card>
          <v-col align="center">
            <v-avatar width="100" height="100">
              <v-img :src="selectedPsychologist.img"></v-img>
            </v-avatar>
          </v-col>
          <v-card-title class="justify-center">{{ selectedPsychologist.name }}</v-card-title>
          <v-card-subtitle class="text-center">CMP: 215863</v-card-subtitle>
          <v-card-text class="text-justify">{{ selectedPsychologist.about }}</v-card-text>
          <v-container>
            <v-layout>
              <v-flex>
                <v-card>
                  <v-card-title class="blue--text text--darken-2">Áreas de Atención</v-card-title>
                  <v-card-text>
                  <v-flex v-for="specialization in selectedPsychologist.specialization" :key="specialization">
                    {{specialization}}
                  </v-flex>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container>
            <v-layout>
              <v-flex>
                <v-card>
                  <v-card-title class="blue--text text--darken-2">Formación Académica</v-card-title>
                  <v-card-text>
                    <v-flex v-for="formation in selectedPsychologist.formation" :key="formation">
                      {{formation}}
                    </v-flex>
                  </v-card-text>
                </v-card>
                <v-flex class="mt-2 text-end">
                <v-btn @click.stop="dialog=false">Salir</v-btn>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <!--Fin del Dialog-->
    </template>
  </v-container>
</template>

<script>
import PsychologistsApiService from "../../core/services/psychologists-api.service"
import { validationMixin } from 'vuelidate'
export default {
  name: "list-psychologists",
  mixins: [validationMixin],
  data: ()=> ({
    psychologists: [],
    dialog: false,
    selectedPsychologist: null,
    selected: [],
    genre: null,
    sessionType: null,
    search: ""
  }),

  created() {
    this.retrievePsychologists();
    this.dialog = false;
  },

  methods:{
    retrievePsychologists(){
      PsychologistsApiService.getAll()
      .then(response => {
        this.psychologists = response.data;
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    },

    psychologistDialog(psychologist){
      console.log('psychologistDialog psychologist:', psychologist);
      this.selectedPsychologist = psychologist;
      this.dialog = true;
    },

    getPsychologistsByFilter(genre, sessionType){
      if(genre!=null && sessionType===null) {
        PsychologistsApiService.findByGenre(genre)
            .then(response => {
              this.psychologists = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
      }
      if(genre===null && sessionType!=null){
        PsychologistsApiService.findBySessionType(sessionType)
            .then(response => {
              this.psychologists = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
      }
      if(genre!=null && sessionType!=null){
        PsychologistsApiService.findByGenreAndSessionType(genre,sessionType)
            .then(response => {
              this.psychologists = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
      }
    },

    getPsychologistByName(){
        PsychologistsApiService.findByName(this.search)
            .then(response => {
              this.psychologists = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
    },


    clear () {
      this.retrievePsychologists();
      this.genre=null;
      this.sessionType=null;
    }

  }


}
</script>

<style scoped>

</style>