<template>
  <div class="beloeLayout myWhite" :style="{ backgroundImage:'url(' + mainStore.currentService.fonUrl + ')'}">
    <div :style="{backgroundColor:mainStore.currentService.colors.layoutBgColor}">
      <main class="mainContainer" :style="{ backgroundImage:'url(' + mainStore.currentService.cardBgUrl + ')' }" >
        <div class="mainContainerShadow" :style="{backgroundColor:mainStore.currentService.colors.mainBgColor }">
          <slot/>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
  const {mainStore, authStore} = useStore()
  // Server Side
  // initUser();

  // Client Side
  onBeforeMount(async() => {
  });

  // methods: {
  //   myFunction() {
  //     console.log('addsss')
  //     if (window.pageYOffset >= sticky) {
  //       console.log('add')
  //       navbar.classList.add("sticky")
  //     } else {
  //       console.log('remove')
  //       navbar.classList.remove("sticky");
  //     }
  //   }
  // },
  // mounted() {
  //   window.onscroll = function() {myFunction()};
  //   // Get the navbar
  //   const navbar = document.getElementById("navbar");
  //
  //   // Get the offset position of the navbar
  //   const sticky = navbar.offsetTop;
  //
  //   // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  //
  // }

</script>

<style scoped>
  .loaderBox{
    /*position: fixed;*/
    /*top:15%;*/
    /*left: 48%;*/
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:black
  }
  img{
    width:100px;
  }

  /* Page content */
  .content {
    padding: 16px;
  }

  /* The sticky class is added to the navbar with JS when it reaches its scroll position */
  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
  }

  /* Add some top padding to the page content to prevent sudden quick movement (as the navigation bar gets a new position at the top of the page (position:fixed and top:0) */
  .sticky + .content {
    padding-top: 60px;
  }
  /*.beloeLayout {*/
  /*background-size: cover;*/
  /*background-size: contain;*/
  /*background-size: 400% auto;*/
  /*background-size: 12px;*/
  /*background-size: auto;*/
  /*background-size: 3em 25%;*/
  /*background-size: auto 6px;*/
  /*background-size: auto auto;*/
  /*background-size: auto, auto;*/
  /*background-size: auto 1300px;*/
  /*background-size: 400% auto;*/

  /*background-size: 6px, auto, contain;*/
  /*background-size: inherit;*/
  /*background-size: initial;      */
  /*min-height: 1300px;*/
  /*background-attachment:fixed;*/
  /*background-position: center top;*/
  /*}*/

  .beloeLayout {
    /*background-image: url("/imgB/space-triangle.webp");*/
    background-size: cover;
    background-attachment:fixed;
    background-position: center top;
    padding-top:72px;
  }
  .mainContainer {
    background-size: cover;
    background-attachment:fixed;
    background-position: center top;
    max-width:1240px;
    /*min-height:93vh;*/
    margin:0 auto ;
  }
  .mainContainerShadow {
    padding: 20px;
    min-height:calc(100vh - 72px);
  }
  .upButton img{
    width:100%;
  }
  @media only screen and (max-width: 1200px) {
    .beloeLayout {
      background-size: auto 1200px;
      /*padding-top:72px;*/
    }
    .mainContainer {
      background-size: auto 1200px;
    }
  }
  @media only screen and (max-width: 768px) {
    .mainContainerShadow {
      padding: 0 10px;
    }
    img{
      width:50px;
    }

  }
</style>
