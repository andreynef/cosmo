<template>
    <section class="ffc card p20">
<!--      <h2 class="testPage">pages<pre>{{$router.path}}</pre></h2>-->
      <button @click="updatePublic" class="b p5 m5">updatePublic</button>
      <button @click="updatePublicFromStore" class="b p5 m5">updatePublicFromStore</button>
      <button @click="setUser" class="b p5 m5">setUser</button>
<!--      <pre>data:{{ data }}</pre>-->
      <button @click="showToast">show toast</button>
      <Msg/>
      <button @click="show = !show">Toggle</button>
      <Transition name="slide-fade">
        <p v-if="show">hello</p>
      </Transition>
      <button @click="showHelperPluginHello">show plugin helper log</button>
<!--      <div v-click-outside="onClickOutside">click outside</div>-->

    </section>
</template>

<script setup>
  import { useMainStore } from '@/stores/mainStore'
  import { useAuthStore } from '@/stores/authStore'
  const mainStore = useMainStore()
  const authStore = useAuthStore()
  const show = ref(true)
  useHead({
    title:'test2',
  })
  definePageMeta({
    layout: "test-two-layout",
    middleware: ["auth-middleware"],
  });
  const onClickOutside = (event)=> {
   console.log('click outside')
  }
  const updatePublicFromStore = () => {
    mainStore.updatePublicFromStore()
  }
  const showToast = () => {
    mainStore.showMsg({ text:'Successfully', type:'success'})
  }
  const showHelperPluginHello = () => {
    const nuxtApp = useNuxtApp()
    console.log(nuxtApp.$hello('nameeee')) // Prints "Hello name!"
  }
  const setUser = async() => {
    // const user = getAuth().currentUser
    await authStore.fbGetUser()
    // console.log(user)
  }

</script>

<style scoped>
  .testPage{
    position: absolute;
    bottom:0;
    left:0;
    font-size: 45px;
    padding: 10px;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
  .bounce-enter-active {
    animation: bounce-in .3s;
  }
  .bounce-leave-active {
    animation: bounce-in .3s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateY(-20px);
    opacity: 0;
  }

</style>
