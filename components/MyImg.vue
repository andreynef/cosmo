<template>
  <div v-if="!url"
       :style="{width:size+'px',height:size+'px', backgroundImage:'url(' + urlblur + ')'}"
       class="cont"
       :class="{round:round}"
  >
  </div>
  <div v-else
       :style="{width:size+'px',height:size+'px'}"
       :class="{round:round}"
       class="cont"
  >
    <img :src="url" alt="img" class="img" :class="{round:round}"/>
  </div>
</template>

<script>
  export default{
    props:['url','urlblur','size','round'],
  }
</script>

<style scoped>
  .cont {
    background-size: cover;
    /*background-attachment: fixed;*/
    background-position: top;
    display:flex;
    align-items: center;
    justify-content: center;

  }
 .round{
   border-radius: 50%;
   border:1px solid transparent;
 }
</style>
