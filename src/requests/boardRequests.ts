import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_PERSONAL_HOST,
  timeout: 1000,
});
