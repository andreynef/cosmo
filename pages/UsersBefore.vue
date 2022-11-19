<template>
  <section>
    <h2 class="blockTitle mb20">Users</h2>
    <ul>
      <li
        v-for="item in this.$store.getters.usersShort"
        :key="item.id"
        class="hover"
        :class="['tabItem', { active: userTabId === item.id}]"
        @click="userClick(item.id)"
      >
        <span class="myGrey label ">email: </span>
        <span class="boxEmail">{{item.email||'n/a'}}</span>
        <span class="ml20 myGrey label ">name: </span>
        <span class="boxName">{{item.displayName||'n/a'}}</span>
        <span class="ml20 myGrey label ">id: </span>
        <span class="boxId">{{item.id||'n/a'}}</span>
        <span class="ml20 myGrey label ">admin: </span>
        <span class="boxId">{{item.isAdmin}}</span>
      </li>
      <div class="img" v-if="!this.$store.getters.usersShort">
        <img src="/img/loading2.gif" alt="loading"  style="width:100%"/>
      </div>
    </ul>

    <section v-if="cBelInfo">
      <div class="fc"> {{cUserDataSize}} Mb</div>
      <h4 class="fc mt20">Notes</h4>
      <NotesComp v-if="cIdNotesList.length" :list="cIdNotesList"/>
      <div class="fc" v-else>no data</div>
      <h4 class="fc mt20">Diagrams</h4>
      <DiagramsComp v-if="cIdDiagramList.length" :list="cIdDiagramList"/>
      <div class="fc" v-else>no data</div>
    </section>
    <div class="fc" v-else>no data</div>
  </section>
</template>

<script>
// import {useStore} from "../composables/useStore";
//
// const {mainStore, authStore} = useStore()
  import {defineComponent} from "vue";
  export default defineComponent( {
      data() {
      return {
        userTabId:null,
      };
    },
    computed:{
      cUserDataSize(){
        return (new TextEncoder().encode(JSON.stringify(this.$store.getters.current.userData)).length /1048576).toFixed(2)
      },
      cBelInfo(){
        if(this.$store.getters.current.userData&&this.$store.getters.current.userData.beloeInfo){
          return this.$store.getters.current.userData.beloeInfo
        }else return false
      },
      cList(){
        if(this.$store.getters.users&&this.$store.getters.users.length){
          // console.log(this.$store.getters.users[this.userTabId])
          // console.log(this.userTabId)
          return this.$store.getters.users[this.userTabId]
        }else return []
      },
      cIdDiagramList(){
        if(this.$store.getters.current.userData&&this.$store.getters.current.userData.beloeInfo){
          return this.$store.getters.current.userData.beloeInfo.diagramsList||[]
        }else return []
      },
      cIdNotesList(){
        if(this.$store.getters.current.userData&&this.$store.getters.current.userData.beloeInfo){
          return this.$store.getters.current.userData.beloeInfo.notesList||[]
        }else return []
      },
    },
    mounted(){
      this.$store.dispatch('loadUsersShort')
    },
    beforeUnmount(){
      this.$store.commit('resetUserData')
      this.$store.commit('setUserSeenId',{id:null})
    },
    methods: {
      userClick(id){
        this.userTabId = id;
        this.$store.commit('setUserSeenId',{id})
      },
    },

    watch:{
      userTabId:{
        handler(){
          this.$store.dispatch('loadUserData',{id:this.userTabId})
        },
        immediate: false
      },

    },
  })
</script>

<style scoped>
  .tabItem.active{
    color: #F8CC2D!important;
    /*border-bottom: 1px solid #F8CC2D ;*/
    /*font-size: 20px;*/
  }
  .blockTitle{
    font-size: 24px;
    text-align: center;
    color:rgba(255,255,255,0.6)
  }

  .img{
    width:70px;
    height:70px;
    /*border-radius: 50%;*/
  }
  .bookmarkBtn {
    padding: 7px 20px;
    border: 1px solid rgba(255, 255, 255, 0);
    cursor: pointer;
    /*background-color: rgba(0, 0, 0, 0.9);*/
    color:rgba(255, 255, 255, 0.8);
    margin-bottom: 5px;
    width:250px;
  }
  .bookmarkBtn.active {
    border-color:lightgoldenrodyellow;
    color:rgba(0, 0, 0, 0.9);
    background-color: lightgoldenrodyellow;
  }
  .bookmarkBtn.radius {
    border-top-left-radius: 5px;
  }

  .bookmarkBtn:hover {
    border-color:lightgoldenrodyellow;
  }
  .label{
    font-size: 10px;
  }
  .boxEmail{
    width: 200px;
    display: inline-block;
  }
  .boxName{
    width: 80px;
    display: inline-block;
  }
  .boxId{
    width: 250px;
    display: inline-block;
  }
  .boxSize{
    width: 100px;
    display: inline-block;
  }
  @media only screen and (max-width: 768px) {
    .container{
    }
  }

</style>
