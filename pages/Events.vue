<template>
  <section>
    <div class="frontContainer">
      <div class="symbolContainer">
        <div class="symbolIcon">
          <p class="fc">events</p>
          <img style="width: 100%" alt="logo" src="/img/gradient-logo2.webp"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data(){
      return{
      }
    },
    watch: {
    },

  }
</script>


<style scoped>
  .frontContainer{
    height:93vh;
  }
  .symbolContainer{
    padding-top:50px;
    display: flex;
    justify-content: center;
  }
  .symbolIcon{
    width:200px;
    animation: appear 0.3s ease-in-out ;
    /*transform: scale(1.5);*/
    /*transform:translateX(-92%);*/
    /*transition:transform 3s;*/
  }
  @keyframes appear {
    from{
      opacity:0;
      transform: scale(2);
      /*transform: rotate(180deg) scale(1.5);*/
    }
    to {
      transform: scale(1);
      opacity:1;
    }
  }


  @media (max-width: 750px) {

  }
  @media (max-width: 400px) {
  }
</style>
