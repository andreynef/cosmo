<template>
  <div class="infoContainer">
    <span :class="['infoTabItem', { active: mainStore.current.infoName === 'public'}]" class="hover" @click="mainStore.current.infoName='public'">Public</span>
    <span :class="['infoTabItem', { active: mainStore.current.infoName === 'beloeInfo'}]" class="hover" @click="mainStore.current.infoName='beloeInfo'">My</span>
  </div>
</template>

<script setup>
  const {mainStore, authStore} = useStore()
</script>

<style scoped>
  .infoContainer{
    display: flex;
    /*justify-content: center;*/
    /*padding: 50px;*/
    /*font-size: 18px;*/
  }
  .infoTabItem{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:15px;
  }
  .infoTabItem.active{
    color: #e4c87e!important;
    border-bottom: 1px solid #e4c87e ;
  }

</style>

