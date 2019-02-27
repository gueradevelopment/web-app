<template>
  <v-container id="container" fluid>
    <v-layout align-center justify-center column fill-height>

      <img id="logo-picture"
        src="@/assets/logo_name_g.svg">

      <h2 id="text-description" class="mt-5">
        {{descriptionText}}
      </h2>

      <v-card v-if="login==true" min-width="400" class="mt-5">
        <v-card-text>
          <v-form>
            <v-text-field prepend-icon="email" color="#545C59" name="email" label="Email" type="text"></v-text-field>
            <v-text-field prepend-icon="lock" color="#545C59" name="password" label="Password" id="password" type="password"></v-text-field>
          </v-form>
        </v-card-text>
        
        <v-layout align-center justify-center column>
          <v-spacer></v-spacer>
          <v-btn class="mb-3">Login</v-btn>
        </v-layout>
      </v-card>

      <v-card v-if="login==false" min-width="400" class="mt-5">
        <v-card-text>
          <v-form>
            <v-text-field prepend-icon="person" color="#545C59" name="name" label="Name" type="text"></v-text-field>
            <v-text-field prepend-icon="email" color="#545C59" name="email" label="Email" type="text"></v-text-field>
            <v-text-field prepend-icon="lock" color="#545C59" name="password" label="Password" id="password" type="password"></v-text-field>
            <v-text-field prepend-icon="lock" color="#545C59" name="password" label="Repeat password" id="passwordRep" type="password"></v-text-field>
          </v-form>
        </v-card-text>
        
        <v-layout align-center justify-center column>
          <v-spacer></v-spacer>
          <v-btn class="mb-3">Sign up</v-btn>
        </v-layout>
      </v-card>

      <span class="mt-5 pointer" @click="changeMethod">{{changeText}}</span>

    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Login extends Vue {
  descriptionText: string;
  changeText: string;
  login: boolean;

  logContinue = "Log in to continue to Guera";
  signContinue = "Sign up to continue to Guera";
  logChange = "Sign up for an account";
  signChange = "Log in to an account";

  constructor() {
    super();
    this.login = true;
    this.descriptionText = this.logContinue;
    this.changeText = this.logChange;
  }

  changeMethod() {
    if(this.login) {
      this.login = false;
      this.descriptionText = this.signContinue;
      this.changeText = this.signChange;
    }
    else {
      this.login = true;
      this.descriptionText = this.logContinue;
      this.changeText = this.logChange;
    }
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

</style>
