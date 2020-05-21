<template>
  <v-app>
    <v-app-bar
      v-if="$store.getters.isUserAuthenticated"
      :clipped-left="false"
      fixed
      app
    >
      <v-spacer></v-spacer>
      <v-btn
        v-if="$store.getters.isUserAuthenticated && !$store.state.offer"
        color="red darken-1"
        dark
        @click="logout"
        >Выйти</v-btn
      >
    </v-app-bar>
    <v-content>
      <v-container class="fill-height">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="false" app>
      <span>&copy; BlowAlone {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>
