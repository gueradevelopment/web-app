<template>
  <v-container id="container" fluid>
    <v-layout align-center justify-center column fill-height>

      <img id="logo-picture"
        src="@/assets/logo_name_g.svg">

      <h2 id="text-description" class="mt-5">
        {{descriptionText}}
      </h2>

      <v-card min-width="400" min-height="200" class="mt-5">   
        <v-container fill-height>
          <v-layout align-center justify-center row wrap >
            <v-flex class="text-xs-center">
              <v-btn @click="loginGoogle" class="mb-3 mt-3" outline color="indigo">
                <img class="icon" src="@/assets/google.png">
                Login with Google
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="loginGoogle" class="mb-3 mt-3" outline color="indigo">
                <img class="icon" src="@/assets/github.svg">
                Login with Github
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="loginGoogle" class="mb-3 mt-3" outline color="indigo">
                <img class="icon" src="@/assets/bitbucket.png">
                Login with Bitbucket
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>    
      </v-card>

    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Login extends Vue {
  descriptionText: string;
  login: boolean;

  logContinue = "Please, log in to continue to Guera";

  constructor() {
    super();
    this.login = true;
    this.descriptionText = this.logContinue;
  }

  loginGoogle() {
    window.location.href = `${process.env.VUE_APP_AUTH_HOST}/auth/google/login`
  }

  loginGithub() {
    window.location.href = `http://localhost:3000/auth/google/login`
  }

  loginBitbucket() {
    window.location.href = `http://localhost:3000/auth/google/login`
  }
}
</script>

<style scoped lang="scss">
@font-face {
    font-family: 'Sky Sans';
    src: url('./../assets/SkySans.ttf') format('truetype');
}

$l-green-pal: #A7E2D2;
$d-green-pal: #545C59;
$l-purple-pal: #837581;
$d-purple-pal: #7B5E6B;
$pink-pal: #EEB5AB;
$l-green-pal-grey: #98BAB1;
$pink-pal-grey: #CEA098;
$bg-color: $l-green-pal;

#text-description {
  font-family: 'Sky Sans';
  color: #4D4D4D;
}

#container {
  background-color: $bg-color;
}

#logo-picture {
  height: 70px;
}

.pointer {
  cursor: pointer;
}

.icon {
  height: 20px;
  margin-right: 8px;
}

</style>
