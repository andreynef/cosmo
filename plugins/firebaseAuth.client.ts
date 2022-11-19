// https://www.youtube.com/watch?v=NoJa7FKqmhU&ab_channel=RazorCXTechnologies
import { initializeApp } from "firebase/app";
import { initUser } from "~/composables/useFirebase";
// import {getAuth} from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig  = useRuntimeConfig().public.fbConfig
  initializeApp(firebaseConfig);
  useStore()
  console.log('plugin, firebase initialized')

  // nuxtApp.provide('firebase', (name) => `firebase initialized!`)
  // console.log(nuxtApp.$firebase()) // Prints "Hello name!"
  // initUser();
  // console.log('user initialized')
  // const auth = getAuth();
  // nuxtApp.vueApp.provide('auth',auth)
  // nuxtApp.provide('auth',auth)
  // nuxtApp.provide('ass','ass indeed')
});

