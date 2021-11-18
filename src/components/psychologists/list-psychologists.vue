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
                          <v-btn @click="appointmentDialog(psychologist)">Agendar Cita</v-btn>
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
          <v-card-subtitle class="text-center">{{ selectedPsychologist.cmp}}</v-card-subtitle>
          <v-card-text class="text-justify">{{ selectedPsychologist.about }}</v-card-text>
          <v-container>
            <v-layout>
              <v-flex>
                <v-card>
                  <v-card-title class="blue--text text--darken-2">Áreas de Atención</v-card-title>
                  <v-card-text>
<!--                    {{ selectedPsychologist.specialization }}-->
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
    <template>
      <v-dialog v-model="dialogAppointment" v-if="selectedAppointment!=null" width="400" persistent >
        <v-card>
          <v-card-title class="justify-center">Elige un horario a tu preferencia</v-card-title>
          <v-card-subtitle class="text-center">Horarios disponibles</v-card-subtitle>
          <v-card-title>{{selectedAppointment.name}}</v-card-title>
          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-card elevation="5">
                  <v-card-subtitle class="text-center">Turno mañana</v-card-subtitle>
                  <v-chip-group active-class="primary--text" column class="ml-7">
                    <div v-for="schedule in schedules" :key="schedule" >
                      <v-chip v-if="schedule.id < 6" @click="scheduleDialog(schedule)">
                        {{ schedule.time }}
                      </v-chip>
                    </div>
                  </v-chip-group>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card elevation="5">
                  <v-card-subtitle class="text-center">Turno Tarde</v-card-subtitle>
                  <v-chip-group  active-class="primary--text" column class="ml-7">
                    <div v-for="schedule in schedules" :key="schedule" align="center" >
                      <v-chip  v-if="schedule.id >= 6" @click="scheduleDialog(schedule)">
                        {{ schedule.time }}
                      </v-chip>
                    </div>
                  </v-chip-group>
                </v-card>
              </v-col>
            </v-row>
            <v-flex class="mt-2 text-end">
              <v-btn @click.stop="dialogAppointment=false">Cancelar</v-btn>
            </v-flex>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogSelected" v-if="selectedSchedule!=null" width="500">
        <v-card>
          <v-card-title class="justify-center">Detalles de tu cita</v-card-title>
          <v-card-subtitle class="text-left text-subtitle-1 text--primary text-uppercase font-weight-bold mt-2">Terapeuta: {{selectedAppointment.name}}</v-card-subtitle>
          <v-card-subtitle class="text-left text-subtitle-1 text--primary text-uppercase font-weight-bold">Horario: {{selectedSchedule.time}}</v-card-subtitle>
          <v-card-subtitle class="text-left text-subtitle-1 text--primary text-uppercase font-weight-bold">Paciente: {{loginData.lastName}}</v-card-subtitle>
          <v-card-subtitle class="text-left text-subtitle-1 text--primary text-uppercase font-weight-bold">Teléfono: {{loginData.phone}}</v-card-subtitle>
          <v-card-subtitle class="text-left text-subtitle-1 text--primary text-uppercase font-weight-bold">E-mail: {{loginData.email}}</v-card-subtitle>
          <v-card-actions>
            <v-row>
              <v-col>
                <v-btn block color="primary" rounded @click="programme(userId, selectedAppointment.id, selectedSchedule.id)">Agendar cita</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-container>
</template>

<script>
import PsychologistsApiService from "../../core/services/psychologists-api.service"
import { validationMixin } from 'vuelidate'
import PatientApiService from "../../core/services/patient-api-service";
export default {
  name: "list-psychologists",
  mixins: [validationMixin],
  data: ()=> ({
    psychologists: [],
    schedules: [],
    loginData: [],
    userId: 0,
    scheduleId: 0,
    dialog: false,
    toggle_exclusive: undefined,
    dialogAppointment: false,
    dialogSelected: false,
    selectedPsychologist: null,
    selectedAppointment: null,
    selectedSchedule: null,
    selected: [],
    genre: null,
    sessionType: null,
    search: "",
  }),

  async created() {
    this.userId = this.$route.params.id;
    try {
      const response = await PatientApiService.getById(this.userId);
      this.loginData = response.data;
    }
    catch (e)
    {
      console.error(e);
    }

    this.retrievePsychologists();
    this.dialog = false;
    this.dialogAppointment = false;
    this.dialogSelected = false;
  },

  methods:{

    async programme(id, idPsycho, idSchedule) {
      try {
        await this.$router.push({name: 'checkout', params: {id: id, idPsycho: idPsycho, idSchedule: idSchedule}})
      } catch (e)
      {
        console.error(e)
      }
    },

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

    retrievePsychoSchedules(id) {
      PsychologistsApiService.getScheduleFromPsycho(id)
          .then(response => {
            this.schedules = response.data;
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

    appointmentDialog(psycho){
      this.selectedAppointment = psycho;
      this.retrievePsychoSchedules(this.selectedAppointment.id);
      this.dialogAppointment = true;
    },

    scheduleDialog(schedule){
      this.selectedSchedule = schedule;
      this.dialogSelected = true;
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