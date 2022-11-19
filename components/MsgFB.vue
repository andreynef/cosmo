<template>
  <div class="container" :class="{'open':mainStore.msg.fb.isOpen}">
    <img src="/img/check3.png" alt="done" style="width:100%">
  </div>
</template>

<script setup>
  const {mainStore, authStore} = useStore()
</script>


<style scoped>
  .container{
    width:60px;
    position: fixed;
    top:9px;
    right:0;
    z-index: 1000;
    /*transition:opacity 0.5s;*/
    /*opacity:0,*/
    transform:translateX(100%);
    transition:transform .2s;
  }
  .container.open{
    /*opacity: 1;*/
    /*transition: opacity 0.5s;*/
    /*transition:transform 0.5s;*/
    transform:translateX(-15px)
  }
  @media only screen and (max-width: 768px) {

  }

</style>

