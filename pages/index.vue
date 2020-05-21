<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="10">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Вход</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert v-if="formError" type="error">
              Произошла ошибка
            </v-alert>
            <p>
              Для входа используйте <b>admin</b> в качестве логина и
              <b>admin</b> в качестве пароля.
            </p>

            <v-form v-if="!$store.state.authUser" @submit.prevent="login">
              <v-text-field
                label="Логин"
                name="login"
                type="text"
                v-model="formUsername"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Пароль"
                name="password"
                type="password"
                v-model="formPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Вход</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formError: null,
      formUsername: "",
      formPassword: ""
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          username: this.formUsername,
          password: this.formPassword
        });
        this.formUsername = "";
        this.formPassword = "";
        this.formError = null;
        this.$router.push("/main");
      } catch (error) {
        this.formError = error.message;
      }
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$router.push("/");
      } catch (error) {
        this.formError = error.message;
      }
    }
  }
};
</script>

<style></style>
