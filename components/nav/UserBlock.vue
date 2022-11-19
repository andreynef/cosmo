<template>
  <section class="userBox myWhite" >
<!--    <nuxt-link to="/settings" v-if="authStore.user.id" class="settings hideMob">-->
<!--      <img alt="logo" src="/img/service.png" style="width:20px"/>-->
<!--    </nuxt-link>-->
    <nuxt-link :to="authStore.user.id?'/account':'/login'" v-if="!authStore.user.id">
      <span class="mr10 hover">login</span>
    </nuxt-link>

    <InfoSwitcher v-if="authStore.user.id"/>
    <nuxt-link :to="authStore.user.id?'/account':'/login'" class="avatarBox mr10">
      <MyImg :url="authStore.user.photoURL" urlblur="/img/user.png" size="50" round="true"/>
    </nuxt-link>

    <nuxt-link :to="authStore.user.id?'/account':'/login'" class="username" >
      <span>{{authStore.user.displayName}}</span>
    </nuxt-link>
  </section>
</template>

<script setup>
  const {mainStore, authStore} = useStore()
</script>


<style scoped>
  .userBox {
    position: absolute;
    top:12px;
    right:40px;
    display: flex;
    align-items: center;
    justify-content: center;
    /*z-index: 0;*/
  }

  .avatarBox{
    align-items: center;
    text-align: center;
    display: flex;
    /*z-index: 1000;*/
    border-radius: 50%;
    border: 1px solid transparent;
  }
  .avatarBox:hover{
    cursor: pointer;
    border:1px solid #e4c87e;
  }
  .username {
    line-height: 50px;;
  }
  .username:hover {
    color: #e4c87e;
    cursor: pointer;
  }
  .settings {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  .settings:hover {
    cursor: pointer;
  }
  .sideUser{
    position:fixed;
    right:0;
    top:0;
    background-color: rgba(0,0,0,0.9);
    z-index:5;
    /*overflow-y:auto;*/
    /*will-change:transform;*/
    /*-webkit-backface-visibility:hidden;*/
    /*backface-visibility:hidden;*/
    /*-webkit-transform:translateX(-105%);*/
    transform:translateX(100%);
    transition:transform .2s;
  }

  .sideUser.open{
    /*-webkit-transform:translateX(0);*/
    transform:translateX(0)
  }
  .shade{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.7);
  }

  @media only screen and (max-width: 768px) {

  }

</style>

