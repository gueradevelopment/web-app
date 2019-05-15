<template>
  <v-container id="container" fluid>
    <v-layout align-center justify-center column fill-height>
      <img id="logo-picture" src="@/assets/logo_name_g.svg" />

      <h2 id="text-description" class="mt-5">
        {{ descriptionText }}
      </h2>

      <v-card min-width="400" min-height="200" class="mt-5">
        <v-container fill-height>
          <v-layout align-center justify-center row wrap>
            <v-flex class="text-xs-center">
              <v-btn
                @click="loginGoogle"
                class="mb-3 mt-3"
                outline
                color="indigo"
              >
                <img class="icon" src="@/assets/google.png" />
                Login with Google
              </v-btn>
              <v-spacer></v-spacer>
            </v-flex>
          </v-layout>
          <v-layout align-center justify-center row wrap>
            <v-flex class="text-xs-center">
              <v-btn
                @click="popupLogin"
                class="mb-3 mt-3"
                outline
                color="indigo"
              >
                <img class="icon" src="@/assets/solid.png" />
                Login with Solid
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

  logContinue = 'Please, log in to continue to Guera';

  constructor() {
    super();
    this.login = true;
    this.descriptionText = this.logContinue;
  }

  loginGoogle() {
    window.location.href = `${process.env.VUE_APP_AUTH_HOST}/auth/google/login`;
  }

  async popupLogin() {
    let session = await solid.auth.currentSession();
    let popupUri = 'https://fornesarturo.solid.community/common/popup.html';
    if (!session) session = await solid.auth.popupLogin({ popupUri });
    window.location.href = 'http://localhost:8080/#/';
  }
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'Sky Sans';
  src: url('./../assets/SkySans.ttf') format('truetype');
}

$l-green-pal: #a7e2d2;
$d-green-pal: #545c59;
$l-purple-pal: #837581;
$d-purple-pal: #7b5e6b;
$pink-pal: #eeb5ab;
$l-green-pal-grey: #98bab1;
$pink-pal-grey: #cea098;
$bg-color: $l-green-pal;

#text-description {
  font-family: 'Sky Sans';
  color: #4d4d4d;
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
