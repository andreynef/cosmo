<template>
  <div class="layout myWhite" :style="{ backgroundImage:'url(' + mainStore.currentService.fonUrl + ')'}" >
    <div :style="{backgroundColor:mainStore.currentService.colors.layoutBgColor}">
      <main class="mainContainer" :style="{ backgroundImage:'url(' + mainStore.currentService.cardBgUrl + ')' }" >
        <div class="mainContainerShadow" :style="{backgroundColor:mainStore.currentService.colors.mainBgColor }">
          <span class="fz20">test-three-layout</span>
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
    max-width:1240px;
    /*min-height:93vh;*/
    margin:0 auto ;
  }
  .mainContainerShadow {
    padding: 20px;
    min-height:calc(100vh - 72px);
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
  }
</style>
