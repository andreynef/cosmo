<template>
    <section class="p20">
      pages/test/page1
      <br/>
      {{input}}
      <br/>
      <input type="text" placeholder="type smth" v-model="input"/>
      <button @click="mainStore.testShit(input)" class="b mr20">testInput</button>
      <button @click="mainStore.testShit('shit')" class="b mr20">testShit</button>
      <button @click="mainStore.$reset()" class="b">reset</button>
      <br/>
      <button @click="log" class="b">log env</button>
      <br/>
      <button @click="mainStore.fetchInfo()" class="b">fetchInfo</button>
      <br/>
      authStore: {{authStore.user}}
      <br/>
<!--      <client-only><pre>{{mainStore.public}}</pre></client-only>-->
<!--      <pre>pre:{{ serverData }}</pre>-->
<!--      Page visits: {{ mainStore.api }}-->
<!--      Page visits: {{ apiInfo }}-->
      <input v-model.number="authStore.user.emailVerified" class="b"/>
      <button @click="authStore.user.emailVerified=2121" class="b">reset authStore.user.emailVerified</button>
      <br/>
<!--      <input type="text" placeholder="type smth" class="b" v-model="mainStore.notesTest.currentTab"/>-->
<!--      {{mainStore.notesTest.currentTab}}-->

    </section>
</template>

<script setup>
  const {mainStore,authStore} = useStore()
  const input = ref('')
  useHead({
    title:'test',
  })
  definePageMeta({
    layout: "test-layout",
    middleware: ["auth-middleware"],
  });
  // mainStore.$subscribe((mainStore)=>{
  //   console.log('fff')
  // }, { detached: true })
  watch(input, (newX) => {
    console.log(`x is ${newX}`)
  })

</script>

<style scoped>

</style>
