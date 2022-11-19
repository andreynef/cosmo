
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('hello', (name) => `Hello ${name} from plugin $hello!`)
  // console.log(nuxtApp.$hello('name')) // Prints "Hello name!"

});
