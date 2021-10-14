<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-sheet rounded="lg">
          <h>Filters</h>
        </v-sheet>
      </v-col>

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
      <!--Dialog-->
      <v-dialog v-model="dialog" width="800" v-if="selectedPsychologist!=null">
        <v-card>
          <v-card-title>{{selectedPsychologist.name}}</v-card-title>
          <v-card-text>{{ selectedPsychologist.about }}</v-card-text>
        </v-card>
      </v-dialog>
      <!--Fin del Dialog-->
    </template>
  </v-container>
</template>

<script>
import PsychologistsApiService from "../../src/core/services/psychologists-api.service"
export default {
  name: "list-psychologists",
  data: ()=> ({
    psychologists: [],
    dialog: false,
    selectedPsychologist: null,
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
    }

  }


}
</script>

<style scoped>

</style>