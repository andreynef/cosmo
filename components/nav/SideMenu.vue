<template>
  <section class="container myWhite" :style="'background-color:'+mainStore.currentService.colors.navbarBgColor">
    <router-link v-for="item in cNavItemsArr" :to="item.linkName" class="menuItemMob hoverLight mb10" @click="isOpen=false">
      {{item.title}}
    </router-link>
  </section>
</template>

<script setup>
  const {mainStore, authStore} = useStore()
  const props = defineProps(['cNavItemsArr','isOpen'])
  function logout(){
    // this.$store.dispatch('logout')
    // this.$emit('update:isOpen',false)
  }

</script>


<style scoped>
  .menuItemMob{
    color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    font-size: 20px;
    /*margin-bottom:10px;*/
  }

  .container{
    width:200px;
    height:100vh;
    padding:40px 20px 20px 40px;
    border-right:1px solid rgba(255,255,255,0.2);
    display: flex;
    flex-flow: column;

  }
  @media only screen and (max-width: 768px) {

  }

</style>

