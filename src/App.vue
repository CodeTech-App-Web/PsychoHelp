<template>
  <v-app>
    <v-app-bar app color=#03A9F4 class="white--text">
      <v-app-bar-title>
        <span class="display-1" >PSYCHOHELP</span>
        <v-divider inset vertical class="mx-1"></v-divider>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn plain to="/home" color="white">Home</v-btn> |
      <v-btn plain to="/homepage" color="white">Casita</v-btn> |
      <v-btn plain to="/about" color="white">About</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>


<style>
</style>
