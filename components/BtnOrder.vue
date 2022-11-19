<template>
  <router-link class="buyBtn" to="to" tag="a" v-if="to">
    {{title}}
  </router-link>
  <button class="buyBtn" v-else>
    {{title}}
  </button>
</template>

<script>
  import {defineComponent} from "vue";

  export default defineComponent( {
    props:['title','to'],
    methods: {
    },
  })
</script>

<style scoped>
  .buyBtn{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #F8CC2D;
    border-radius: 20px;
    color:black;
    text-decoration: none;
    border-style: none;
    font-size: 16px;
  }
  .buyBtn:hover{
    box-shadow: 0 0 15px rgba(255,255,255,0.7);
    cursor: pointer;
  }
  @media only screen and (max-width: 768px) {
  }

</style>

