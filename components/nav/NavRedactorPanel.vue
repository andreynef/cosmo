<template>
  <div class="infoContainer myWhite">
    <span :class="['infoTabItem', { active: authStore.user.mode === 'user'}]" class="hover" @click="authStore.user.mode = 'user'">user</span>
    <span :class="['infoTabItem', { active: authStore.user.mode === 'redactor'}]" class="hover" @click="authStore.user.mode = 'redactor'">redactor</span>
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
    font-size: 18px;
  }
  .infoTabItem{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:15px;
    border-bottom: 1px solid transparent ;
  }
  .infoTabItem.active{
    color: #e4c87e!important;
    border-bottom: 1px solid #e4c87e ;
  }

  @media only screen and (max-width: 768px) {
  }

</style>

