<template>
  <v-row>
    <v-col cols="2">
      <v-img class="psy" contain src="https://image.freepik.com/foto-gratis/empresaria-confiada-sonriente-que-presenta-brazos-cruzados_1262-20950.jpg"></v-img>
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
      <v-col cols="8" align-self="center">
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
              <v-chip class="ma-2 ml-0" color="primary" label>
                <v-icon left>
                  mdi-account-circle-outline
                </v-icon>
                {{item.title}}
              </v-chip>
              <p>{{item.description}}</p>
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




    <v-col cols="2" align-self="center">
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
      'First',
      'Second',
      'Third',
      'Fourth',
      'Fifth',
    ],
    publications: [
      {id: 1, title: 'John Leider', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrysum', tags: ['aaaa', 'bbbb'] },
      {id: 2, title: 'John Leider', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrysum', tags: ['aaaa', 'bbbb'] },
    ],
    title: '',
    description: '',
    snackbar: false,
    message: '',
    formAdd: true,
    indexPost: '',
    dialog: false,
    tags:[]
  }),
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