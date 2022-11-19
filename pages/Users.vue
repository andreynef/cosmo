<template>
  <section class="mainContainer">
    <div class="leftContainer">
      <h2 class="blockTitle mb20">Users</h2>
      <ul>
        <li
          v-for="item in mainStore.usersShort"
          :key="item.id"
          class="card m5 p10 hover item pr"
          :class="['tabItem', { active: tabId === item.id}]"
          @click="userClick(item.id)"
        >
          <div class="imgBlock">
            <img :src="item.photoURL" alt="ava" v-if="item.photoURL"/>
            <img src="/img/user.png" alt="ava" v-else/>
          </div>
          <div class="bodyBlock ml10">
            <span class="myGrey fz10">name: </span>
            <span class="text">{{item.displayName||'n/a'}}</span>
            <br/>
            <span class="myGrey fz10 ">email: </span>
            <span class="text">{{item.email||'n/a'}}</span>
          </div>
          <span class="admin" v-if="item.isAdmin">admin </span>
        </li>
        <div class="img" v-if="!mainStore.usersShort">
          <img src="/img/loading2.gif" alt="loading"  style="width:100%"/>
        </div>
      </ul>
    </div>
    <div class="rightContainer pr" v-if="mainStore.userData?.beloeInfo">
      <div class="size"> size: {{cUserDataSize}} Mb</div>
      <button @click="resetPassword" class="resetPassword cy">
        send email to reset password
      </button>
      <button @click="makeAdmin" class="makeAdmin cy">
        make admin
      </button>
      <button @click="removeAdmin" class="removeAdmin cy">
        remove admin
      </button>
      <div class="">
        <span :class="['titem', { active: tabBookmark === 'notes'}]" class="hover" @click="tabBookmark = 'notes'">notes</span>
        <span :class="['titem', { active: tabBookmark === 'diagrams'}]" class="hover" @click="tabBookmark = 'diagrams'">diagrams</span>
      </div>
      <br/>
      <NotesPageCopy v-if="tabBookmark==='notes' && mainStore.userData.beloeInfo.notesList" :list="mainStore.userData.beloeInfo.notesList"/>
      <DiagramsPageCopy v-if="tabBookmark==='diagrams' && mainStore.userData.beloeInfo.diagramsList" :list="mainStore.userData.beloeInfo.diagramsList"/>
      <div class="fc" v-if="!mainStore.userData.beloeInfo.notesList">no notes</div>
      <div class="fc" v-if="!mainStore.userData?.beloeInfo.diagramsList">no diagrams</div>
    </div>
  </section>
</template>

<script setup>
import {onBeforeUnmount} from "../.nuxt/imports";

const {mainStore, authStore} = useStore()
let tabId = ref('')
let tabBookmark = ref('notes')
loadUsersShort()
mainStore.backupBeloeInfo = JSON.parse(JSON.stringify(mainStore?.beloeInfo)) //deep clone

const cUserDataSize=computed(()=>{
  return (new TextEncoder().encode(JSON.stringify(mainStore.userData)).length /1048576).toFixed(2)
})
onBeforeUnmount(()=>{
  mainStore.userData = null
  mainStore.beloeInfo.service = mainStore.backupBeloeInfo.service
  // this.$store.commit('setUserSeenId',{id:null})
})
function userClick(id){
  tabId.value = id;
  loadUserData(id)
}
function makeAdmin(){
  const id = tabId.value
  const obj = {...mainStore.usersShort[tabId.value],isAdmin:true}
  updateUserShort({id:id, obj:obj})
  mainStore.usersShort[tabId.value] = obj
}
function removeAdmin(){
  const id = tabId.value
  const obj = {...mainStore.usersShort[tabId.value], isAdmin:false}
  updateUserShort({id:id, obj:obj})
  mainStore.usersShort[tabId.value] = obj
}
function resetPassword(){
  const email = mainStore.usersShort[tabId.value].email
  sendResetPassword(email)
}
definePageMeta({
  layout: "users-layout",
  middleware: ["auth-middleware"],
});
useHead({
  title:'Users',
})

</script>

<style scoped>
  .mainContainer{
    display: flex;
  }
  .leftContainer{
    width:300px;
    padding: 10px;
    border-right: 1px solid rgba(255,255,255,0.6);
    min-height:87vh
  }
  .rightContainer{
    flex-grow: 1;
    display: flex;
    /*justify-content: center;*/
    flex-flow: column;
    align-items: center;
    padding: 20px;
  }
  .item{
    display: flex;
    align-items: center;
    border: 1px solid transparent ;
  }
  .item:hover{
    box-shadow: 0 0 5px rgba(255,255,255,0.6);
  }
  .item.active{
    border: 1px solid #e4c87e ;
  }
  .imgBlock{
    border-radius: 50%;
    overflow: hidden;
    width:50px;
  }
  .bodyBlock{
  }
  .text{
    font-size: 12px;
  }
  .admin{
    color: #e4c87e;
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 12px;
  }
  .size{
    position: absolute;
    top: 5px;
    left: 10px;
  }
  .resetPassword{
    position: absolute;
    top: 25px;
    left: 10px;
  }
  .makeAdmin{
    position: absolute;
    top: 45px;
    left: 10px;
  }
  .removeAdmin{
    position: absolute;
    top: 65px;
    left: 10px;
  }
  .blockTitle{
    font-size: 24px;
    text-align: center;
    color:rgba(255,255,255,0.6)
  }
  .titem{
    margin-bottom: 20px;
    margin-right: 20px;
    border:1px solid grey;
    padding:10px;
    display: inline-block;
  }
  .titem.active{
    color: #e4c87e!important;
    border:1px solid #e4c87e;
  }

  @media only screen and (max-width: 768px) {
    .container{
    }
  }

</style>
