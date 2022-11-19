<template>
  <div class="layout myWhite" :style="{ backgroundImage:'url(' + mainStore.currentService.fonUrl + ')'}">
    <div :style="{backgroundColor:mainStore.currentService.colors.layoutBgColor}">
      <main class="mainContainer" :style="{ backgroundImage:'url(' + mainStore.currentService.cardBgUrl + ')' }" >
        <div class="mainContainerShadow" style="backgroundColor:rgba(0,0,0,0.8) ">
          <span class="fz20">test-layout</span>
          <slot/>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
  const {mainStore, authStore} = useStore()
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
  /*.layout {*/
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

  .layout {
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
    /*max-width:1240px;*/
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
    .layout {
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
