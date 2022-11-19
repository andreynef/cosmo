import {defineStore} from "pinia";
export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: {
      id:null,
      isA:null,
      isK:null,
      isAk:null,
      isAdmin:null,
      email:null,
      emailVerified:null,
      isAnonymous:null,
      displayName:'Гость',
      phoneNumber:null,
      photoURL:'/img/userW.png',
      mode:'user',
    },
  }),
  getters: {
  },
  actions:{
    setMode(mode){
      this.user.mode = mode
    },
    setUser(user){
      this.user.id = user?.uid
      this.user.isA = user?.uid === useRuntimeConfig().fbAId
      this.user.isK = user?.uid === useRuntimeConfig().fbKId
      this.user.isAK = user?.uid === useRuntimeConfig().fbKId || user?.uid === useRuntimeConfig().fbAId
      this.user.isAdmin = user?.isAdmin
      this.user.email = user?.email
      this.user.displayName = user?.displayName
      this.user.emailVerified = user?.emailVerified
      this.user.isAnonymous = user?.isAnonymous
      this.user.phoneNumber = user?.phoneNumber
      this.user.photoURL = user?.photoURL
      if(user.uid === useRuntimeConfig().fbAId){
        this.user.mode = 'redactor'
      }
    },
  }
})
