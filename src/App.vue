<template>
  <v-app>
    <AppBarPsycho v-if="verifyUserType"></AppBarPsycho>
    <AppBar v-else></AppBar>
    <v-main class="grey lighten-3">
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import AppBarPsycho from './components/appbar-psycho'
import AppBar from "./components/app-bar";

export default {
  components: {
    AppBar,
    AppBarPsycho
  },
  data: () => ({
    usertype: 0,
  }),
  computed: {
    verifyUserType() {
      let flag = false
      if (this.$route.name === 'psychologist-login' || this.$route.name === 'Login-Patient' ) {
        flag = false
      } else {
        flag = true
      }
      return flag
    }
  }
}
</script>
