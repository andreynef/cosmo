<template>
  <div>
      <section class="card p20">
        <div class="fc m20">
          <span :class="['item', { active: tab === 'profile'}]" class="hover" @click="tab = 'profile'">profile</span>
          <span :class="['item', { active: tab === 'view'}]" class="hover" @click="tab = 'view'">customization</span>
        </div>
        <div class="container">
          <AccountProfile v-if="tab==='profile'"/>
          <AccountCustomization v-if="tab==='view'"/>
        </div>
    </section>
  </div>
</template>

<script setup>
  let tab = ref('profile')
  definePageMeta({
    // layout: "profile-layout",
    middleware: ["auth-middleware"],
  });
  useHead({
    title:'Account',
  })

</script>

<style scoped>
  .container{
    padding: 20px;
    border:1px solid rgba(255,255,255,0.6);
    border-radius: 0.5rem;
  }
  .item{
    margin-bottom: 20px;
    margin-right: 20px;
    border:1px solid grey;
    padding:10px;
    display: inline-block;
  }
  .item.active{
    color: #e4c87e!important;
    border:1px solid #e4c87e;
  }

</style>
