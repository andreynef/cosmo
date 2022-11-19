<template>
  <div class="container" :class="{'open':mainStore.msg.fb.isOpen}">
    <img src="/img/check3.png" alt="done" style="width:100%">
  </div>
</template>

<script setup>
  // import {useStore} from "../composables/useStore";
  //
  const {mainStore, authStore} = useStore()
</script>


<style scoped>
  .container{
    width:30px;
  }
  .container.open{
  }
  @media only screen and (max-width: 768px) {

  }

</style>

