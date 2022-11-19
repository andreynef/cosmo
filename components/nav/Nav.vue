<template>
  <nav id="navbar" class="navContainer" :class="{'sticky':scrollPosition>=0}" :style="'background-color:' + mainStore.currentService?.colors?.navbarBgColor">
    <div class="menu hideDesk" @click="isSideMenuOpen=!isSideMenuOpen">&equiv;</div>
    <NavRedactorPanel class="redactorContainer" v-if="authStore.user.isA"/>
    <nuxt-link to="/" v-else>
      <img alt="logo" src="/img/Logo_White_Mirror.png" class="beloeLogo hideMob" />
    </nuxt-link>
    <nuxt-link v-for="item of cNavItemsArr" :to="item.linkName" class="menuItem hoverLight hideMob mr20" exact-active-class="active">
      {{item.title}}
    </nuxt-link>
    <NavUserBlock/>
    <!--    side left-->
    <div class="shade" v-if="isSideMenuOpen"/>
    <div class="sideMenu card " :class="{'open': isSideMenuOpen}">
      <NavSideMenu :c-nav-items-arr="cNavItemsArr" v-model:is-open="isSideMenuOpen" v-if="isSideMenuOpen" v-click-outside="()=>isSideMenuOpen=false" />
    </div>
  </nav>
</template>

<script setup>
  const {mainStore, authStore} = useStore()
  const cNavItemsArr = computed(()=>{
      if (authStore.user.isA &&authStore.user.mode==='redactor') {//авторизованный A
        return [
          {title: 'Notes', linkName: '/notes'},
          {title: 'Diagrams', linkName: '/diagrams'},
          {title: 'Diary', linkName: '/diary'},
          {title: 'Users', linkName: '/users'},
          {title: 'Test', linkName: '/test/page1'},
          {title: 'Test2', linkName: '/test/page2'},
          {title: 'Iphone', linkName: '/iphone'},
          {title: 'Animal', linkName: '/animal'},
        ]
      } else if (authStore.user.id && mainStore.current.infoName==='public') {//авторизованный
        return [
          {title: 'Home', linkName: '/'},
          {title: 'About', linkName: '/about'},
          {title: 'Service', linkName: '/service'},
          {title: 'Training', linkName: '/training'},
        ]
      } else if (authStore.user.id && authStore.user.mode==='user') {//авторизованный
        return [
          {title: 'Notes', linkName: '/notes'},
          {title: 'Diagrams', linkName: '/diagrams'},
          {title: 'Diary', linkName: '/diary'},
        ]
      } else {//гость
        // this.$route.path[0]
        // // this.$router.currentRoute.value.path
        return [
          {title: 'Home', linkName: '/'},
          {title: 'About', linkName: '/about'},
          {title: 'Service', linkName: '/service'},
          {title: 'Training', linkName: '/training'},
          {title: 'Feedback', linkName: '/feedback'},
        ]
      }
    }
  )
const scrollPosition = ref(0)
onMounted(()=>{
  window.addEventListener('scroll', () => {
    scrollPosition.value = window.scrollY;
  });
})
</script>

<script>

  export default{
      data: () => ({
      dropdown: null,
      isMenuOpen: false,
      isSideMenuOpen: false,
      isMenuOpenByButton: false,//фикс закрывания сразу
    }),
  }

</script>
<style scoped>
  /*@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');*/
  /* Page content */
  .content {
    /*padding: 16px;*/
  }

  /* The sticky class is added to the navbar with JS when it reaches its scroll position */
  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
  }

  /* Add some top padding to the page content to prevent sudden quick movement (as the navigation bar gets a new position at the top of the page (position:fixed and top:0) */
  .sticky + .content {
    padding-top: 60px;
  }

  .navContainer {
    /*position: sticky;*/
    /*top:0;*/
    /*left:0;*/
    padding: 20px;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.7);
    /*padding: 20px 0;*/
    border-bottom:1px solid rgba(255, 255, 255, 0.1);
    /*box-shadow: 0 0 10px rgba(0,0,0,0.95);*/
    min-height: 72px;
  }
  .redactorContainer{
    position: absolute;
    top:20px;
    left:20px;
    /*display: flex;*/
    /*align-items: center;*/
    /*padding: 0 20px;*/
    /*background-color: rgba(0, 0, 0, 0.8);*/
    /*box-shadow: 0 0 15px rgba(0,0,0,0.95);*/
    /*color: rgba(255, 255, 255, 0.8);*/
  }
  .cryptoLogo{
    font-family: 'Press Start 2P', cursive;
    font-size: 12px;
    position:absolute;
    top:30px;
    left:50px;
    color:rgba(255,255,255, 0.7);
  }
  .beloeLogo{
    position:absolute;
    top:7px;
    left:50px;
    width:250px;
  }
  .loaderCountdown{
    position: absolute;
    top:20px;
    left:180px;
    width:35px;
  }
  .switchContainer{
    font-size: 22px;
    position:absolute;
    top:20px;
    left:300px
  }
  .notesButton{
    position: absolute;
    top:20px;
    right:300px;
    width:40px;
  }
  .cosmoButton{
    position: absolute;
    top:20px;
    right:370px;
    width:40px;
  }
  .homeButton{
    position: absolute;
    top:20px;
    right:190px;
    width:32px;
  }
  .sideMenu{
    position:fixed;
    left:0;
    top:0;
    background-color: rgba(0,0,0,0.9);
    z-index:5;
    transform:translateX(-100%);
    transition:transform .2s;
  }

  .sideMenu.open{
    transform:translateX(0)
  }

  .timeContainer {
    position: absolute;
    top:15px;
    right:80px;
    /*z-index: 5;*/
    text-align: right;
    color:rgba(255, 255, 255, 0.6);
    font-family: "Tahoma";
    font-size: 12px;
    padding: 5px;
    transform:scale(1);
    transition:transform .2s;
  }
  .timeDrop{
    display:none;
  }
  .timeContainer:hover{
    cursor: pointer;
    transform:scale(2) translateX(-28%) translateY(28%);
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 10px;
  }
  .timeContainer:hover .timeDrop {
    display: unset;
  }
  .menu{
    position: absolute;
    top:20px;
    left:0;
    line-height: 40px;
    font-size: 60px;
    padding-left: 20px;
    color:rgba(255, 255, 255, 0.8);
  }
  .menu:hover{
    cursor:pointer;
  }
  .menuItem{
    color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    font-size: 20px;
    border-bottom: 1px solid transparent ;
  }
  .menuItemMob{
    color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    font-size: 20px;
    /*margin-bottom:10px;*/
  }

  .menuContainer{
    width:150px;
    position: absolute;
    top:70px;
    left:0;
    display: flex;
    flex-flow: column;
    padding: 20px;
    z-index: 100;
  }
  .logout{
    color:rgba(255, 255, 255, 0.4);
    font-size: 12px;
    margin-top: 20px;
  }
  .active{
    border-bottom:1px solid rgba(255, 255, 255, 0.9);
    color:rgba(255, 255, 255, 0.8);
  }
  .shade{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.7);
  }


  @media only screen and (max-width: 1200px) {
    .menuItem{
      font-size: 26px;
      margin-right:10px;
    }
    .beloeLogo{
      top:20px;
      left:20px;
      width:150px
    }
    .notesButton{
      top:25px;
      right:180px;
      width:25px;
    }
    .homeButton{
      top:20px;
      right:190px;
      width:32px;
    }
    .switchContainer{
      font-size: 18px;
      top:25px;
      left:280px
    }
  }
  @media only screen and (max-width: 768px) {
    .redactorContainer {
      display: none;
    }
    .menu {
      top: 15px;
    }
    .loaderCountdown{
      left:100px;
    }
    .navContainer{
      padding:0;
    }
    .timeContainer {
      right:20px;
    }
    .homeButton{
      right:230px;
    }
    /*.menuContainer{*/
    /*  left:unset;*/
    /*  right:0;*/
    /*}*/
    /*.menu{*/
    /*  left:unset;*/
    /*  right:20px;*/
    /*}*/
    .timeContainer {
      right:unset;
      text-align: right;
      left:20px;
    }
    .notesButton{
      top:25px;
      right:180px;
      width:25px;
    }
    .cosmoButton{
      top:25px;
      right:90px;
      width:25px;
    }
    .timeContainer{
      font-size: 10px;
    }

  }

</style>

