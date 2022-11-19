<template>
  <div class="upButton hover" :class="{'hide':scrollPosition<=200}">
    <img
      src="/img/upW.png"
      alt="up button"
      @click="up"
    />
  </div>
</template>

<script>
  export default {
    data(){
      return{
        scrollPosition:0
      }
    },
    methods: {
      up(){
        window.scrollTo({top: 0, behavior: 'smooth'});
      },
    },
    mounted() {
      window.addEventListener('scroll', () => {
        this.scrollPosition = window.scrollY;
      })
    }
  }
</script>

<style scoped>
  .upButton{
    position: fixed;
    bottom:50px;
    right:20px;
    width:40px;
    height:40px;
  }
  .hide{
    display: none;
  }
  .upButton img{
    width:100%;
  }
  @media only screen and (max-width: 768px) {
  }

</style>

