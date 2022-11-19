import {abortNavigation, navigateTo} from "nuxt/app";

export default defineNuxtRouteMiddleware((to,from) => {
  const {mainStore, authStore} = useStore()
  const user = authStore.user//если есть то юзер находится в системе
  console.log('middleware auth')
  // if(!user.id){
  //   console.log('!user.id:',!user.id)
  //   console.log('navigateTo /')
  //   return navigateTo('/')
  // }
  if(!user.id){
    return navigateTo('/')
  }
  if(!user.emailVerified && to.path!=='/account'){
    console.log('!user.emailVerified')
    mainStore.showMsg( { text:'Please verify your email', type:'warning'});
    // next('/login?message=login')//переход на страницу авторизации
    return abortNavigation()
  }
  if(to.path==='/resetpb'){
    console.log('resetpb')
    localStorage.removeItem('beloeInfo');
    localStorage.removeItem('public');
    mainStore.showMsg({text:'p and b reset',type:'success'});
    return navigateTo('/')
  }
  if(to.path==='/users'&&!user.isA){
    mainStore.showMsg( { text:'users page in only for A -_-', type:'warning'});
    return navigateTo('/')
  }
});
