<template>
  <div>
    <v-app-bar app color=#03A9F4>
      <!--Drawer Icon-->
      <v-app-bar-nav-icon align="right" @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <v-btn plain color="white" class="text-sm-h4 text-md-h4 text-lg-h5 font-weight-medium" text to="/">
        PSYCHOHELP
      </v-btn>
      <v-container class="py-0 fill-height">
        <v-spacer></v-spacer>
        <v-responsive class="flex xl12" max-width="300">
          <v-text-field background-color=#BDBDBD dense flat hide-details rounded solo-inverted ></v-text-field>
        </v-responsive>
      </v-container>
      <v-btn icon depressed to="/patientProfile">
        <v-avatar right color=#BDBDBD size="50">
          <v-icon color="white" size="40">mdi-account-circle</v-icon>
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <!--Drawer despegable-->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">Usuario</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset vertical></v-divider>

          <v-list-item v-for="item in items" :key="item" link :to=item.route>

            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ item.text }}
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "AppBar-Patient",
  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
    items: [
      {text:'Mi Perfil', icon:'mdi-account', route:'/patientprofile'},
      {text:'Citas', icon:'mdi-calendar-range', route:'/citas'},
      {text:'Metodo de Pago', icon:'mdi-credit-card', route:'/metododepago'},
      {text:'Bitacora', icon:'mdi-account-search', route:'/bitacora'},
      {text:'Cerrar Sesion', icon:'mdi-logout', route:'/'},
    ],
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false
    }
  }
}
</script>
