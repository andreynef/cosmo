<template>
  <section>
    <div class="frontContainer p30">
<!--      <div class="symbolContainer">-->
<!--        <div class="symbolIcon">-->
<!--          <p class="fc">training</p>-->
<!--          <img style="width: 100%" alt="logo" src="/imgB/gradient-logo2.webp"/>-->
<!--        </div>-->
<!--      </div>-->
      <MusicPlayerB :tracks="tracks" />
    </div>
  </section>
</template>

<script>
  export default {

    data(){
      return{
        tracks: [
          {
            name: "Le ",
            artist: "Mantra ",
            source: "/audio/Le Mantra du Coeur (128 kbps).mp3",
          },
        ],

      }
    },
    watch: {
    },

  }
</script>


<style scoped>
  .frontContainer{
    height:100vh;
  }
</style>
