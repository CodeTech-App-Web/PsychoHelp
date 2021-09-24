<template>
  <v-app>
    <AppBarPatient ></AppBarPatient>
    <v-main class="grey lighten-3">
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import AppBarPatient from './components/appbar-patient'

export default {
  components: {
    AppBarPatient},
  data: () => ({
    //
  })
}
</script>

<!--  <v-btn plain to="/home" color="white">Home</v-btn> |
      <v-btn plain to="/homepage" color="white">Casita</v-btn> |
      <v-btn plain to="/about" color="white">About</v-btn>-->