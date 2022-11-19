<template>
  <section class="pr">
      <v-img
        :src="url"
        :lazy-src="urlblur"
        aspect-ratio="1"
        cover
        :width="size"
        :class="{round:round}"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey-lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
  </section>

</template>

<script>
  import {defineComponent} from "vue";
  export default defineComponent({
    props:['url','urlblur','size','round'],
    data() {
      return {
      };
    },
  })
</script>

<style scoped>
 .round{
   border-radius: 50%;
   border:1px solid rgba(255,255,255,0.1);
 }
</style>
