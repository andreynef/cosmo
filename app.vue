
<template>
  <div>
    <Nav/>
    <nuxt-layout>
      <NuxtLoadingIndicator />
      <NuxtErrorBoundary>
        <nuxt-page/>
      </NuxtErrorBoundary>
    </nuxt-layout>
    <FooterB v-if="$route.name==='home'"/>
    <Msg/>
    <MsgFB/>
    <BtnUp/>
  </div>
</template>


<script setup>
  onBeforeMount(()=>{
    console.log('app onBeforeMount')
  })
  // onMounted(()=>{
  //   console.log('app onMounted')
  // })
  initUser()
  // const scrollPosition = ref(0)
  // onMounted(()=>{
  //   window.addEventListener('scroll', () => {
  //     scrollPosition.value = window.scrollY;
  //   });
  // })

</script>

<style scoped>
  /* Page content */
  .content {
    /*padding: 16px;*/
  }

  /* The sticky class is added to the navbar with JS when it reaches its scroll position */
  .sticky {
    position: fixed;
    top: 0;
  }

  /* Add some top padding to the page content to prevent sudden quick movement (as the navigation bar gets a new position at the top of the page (position:fixed and top:0) */
  .sticky + .content {
    padding-top: 72px;
  }
</style>
