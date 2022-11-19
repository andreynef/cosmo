<template>
  <ul class="container myWhite" :style="'background-color:'+mainStore.currentService.colors.cardBgColor">
    <li class="myGrey noItems" v-if="!mainStore.beloeInfo.diaryList.length">no diary items</li>
<!--    form-->
    <li class="item pr">
      <input type="text" class="inputDate" placeholder="date" v-model='formDate' v-on:keyup.enter="(ev) => {ev.target.blur();addItem()}" required/>
<!--      <input type="text" class="inputComment" placeholder="comment" v-model="formText"  v-on:keyup.enter="(ev) => {ev.target.blur();addItem()}" required>-->
      <textarea class="inputComment" placeholder="comment" v-model="formText"  v-on:keyup.enter="(ev) => {ev.target.blur();addItem()}" required/>
      <img class="arrowDown hover" alt="arrowD" src="/img/svg/arrowGrey.svg" @click="dayDown"/>
    </li>
<!--    list-->
    <li class="item pr" v-for="item in mainStore.beloeInfo.diaryList" :key="item.id" :item="item">
      <span class="myGrey inputDate" >{{item.date}}</span>
      <input type="text" class="inputComment" v-model="item.text" v-on:keyup.enter="(ev) => {ev.target.blur();update()}" v-if="item.text.length<=118">
      <textarea class="inputComment" v-model="item.text" v-on:keyup.enter="(ev) => {ev.target.blur();update()}" v-if="item.text.length>118"/>
      <button @click="deleteDiaryItem(item.id)" class="delBox">x</button>
    </li>
  </ul>
</template>
<script setup>
  import generateRandomId from '~/helpers/generateRandomId';
  const {mainStore, authStore} = useStore()
  const formText = ref('')
  const formDate = ref(new Date().toLocaleString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' }))
  function addItem() {
    const itemObj = {
      date:this.formDate,
      text:this.formText,
      id:generateRandomId()
    }
    mainStore.addDiaryItem({itemObj})
    formText.value = ''
    this.update()
  }
  function update(){
    updateFB({
      path:'diaryList',
      data:this.mainStore.beloeInfo.diaryList
    });
  }
  function deleteDiaryItem(id){
    mainStore.deleteDiaryItem({id});
    // mainStore.showMsg( { text:'item deleted', type:'success'});
    this.update();
  }
  function dayDown(){
    const date = new Date();
    date.setDate(date.getDate() - 1);
    formDate.value = date.toLocaleString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }

  definePageMeta({
    // layout: "default",
    middleware: ["auth-middleware"],
  });
  useHead({
    title:'Diary',
  })

</script>


<style scoped>
  .container{
    width:100%;
    padding: 5px;
    display: flex;
    flex-flow: column;
    background-color: rgba(0,0,0,0.7);
    box-shadow: 0 0 15px rgba(0,0,0,0.95);

  }
  .inputComment{
    color: rgba(255, 255, 255, 0.7);
    background-color: transparent;
    border-left:1px solid rgba(255, 255, 255, 0.05);
    padding: 0 10px;
    flex-grow: 1;
    font-size: 14px;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
  }
  .inputDate{
    color: rgba(255, 255, 255, 0.7);
    background-color: transparent;
    margin-right:20px;
    width: 80px;
    font-size: 14px;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    padding-left: 10px;
  }
  .item {
    font-size: 14px;
    margin-bottom:5px;
    border: 1px solid rgba(255,255,255,0.05);
    display: flex;
  }

  .delBox{
    position: absolute;
    right:0;
    top:0;
    color:red;
    background-color: transparent;
    width:20px;
    height:20px;
    font-size: 10px;
    border:none;
  }
  .delBox:hover{
    color: #42d69c;
    cursor: pointer;
  }
  .noItems{
    margin:0 auto;
    padding:5px;
    font-size: 12px;
  }
  .arrowUp{
    position: absolute;
    top:3px;
    left:79px;
  }
  .arrowDown{
    position: absolute;
    top:12px;
    left:85px;
    width:15px;
    height:15px;
    transform: rotate(180deg);
  }
  @media only screen and (max-width: 768px) {
    .container{
      width:95%;
      margin:0 auto;
      padding: 10px!important;
    }

    .addInput{
      color: rgba(255, 255, 255, 0.7);
      background-color: transparent;
      font-size: 16px;
      margin-bottom: 20px;
      width:100%;
    }
    .addInputDate{
      color: rgba(255, 255, 255, 0.7);
      background-color: transparent;
      font-size: 16px;
      margin-bottom: 20px;
      width:50%;
    }

  }

</style>
