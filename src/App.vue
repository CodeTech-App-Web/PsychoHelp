<template>
  <v-app id="inspire">
    <v-app-bar app color=#2196F3>
      <!--Drawer Icon-->
      <v-app-bar-nav-icon color="white" align="right" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn plain class="text-h4" color="white" to="/homepage">PSYCHOHELP</v-btn>
      <v-container class="py-0 fill-height">
        <v-spacer></v-spacer>
        <v-responsive max-width="200">
          <v-text-field background-color="grey lighten-1" dense flat hide-details rounded solo-inverted ></v-text-field>
        </v-responsive>
      </v-container>
      <v-btn icon depressed to="/perfil">
        <v-avatar right color="grey darken-1" size="40" >
          <v-icon dark>mdi-account-circle</v-icon>
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
          <v-list-item v-for="item in items" :key="item" link router to="item.route">
            <v-list-item-icon>
             <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ item.text }} <v-divider></v-divider> </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-3">
    <v-container fluid>
      <router-view/>
    </v-container>
  </v-main>

  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
    items: [
      {text:'Mi Perfil', icon:'mdi-account', route:'/perfil'},
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

<!--  <v-btn plain to="/home" color="white">Home</v-btn> |
      <v-btn plain to="/homepage" color="white">Casita</v-btn> |
      <v-btn plain to="/about" color="white">About</v-btn>-->