<template>
  <li class="diagramItem pr" :style="'background-color:'+ this.mainStore.currentService.colors.cardBgColor">
    <div class="diagramItemImg" v-show="!isPanelOpen" style="min-height:100px">
<!--      <img src='/img/loading2.gif' alt="img" class="img" v-if="!item.imgUrl" />-->
      <img :src="item.imgUrl||'/img/cosmo.png'" @click="clickImage" alt="img" class="img hover" loading="lazy"/>
    </div>
    <div :style="cStyle" v-show="isFullMode" class="divImgFullMode pr">
      <img src="/img/svg/close.svg" class="close hover"  @click="clickClose" alt="close"/>
      <img src="/img/svg/close.svg" class="closeLeft hover"  @click="clickClose" alt="close"/>
      <img src="/img/svg/arrow.svg" class="right hover" @click="clickNext(+1)" alt="right"/>
      <img src="/img/svg/arrow.svg" class="right rightD hover" @click="clickNext(+1)" alt="right"/>
      <img src="/img/svg/arrow.svg" class="left hover" @click="clickNext(-1)" alt="left"/>
      <span class="min hover" @click="picSwitched=!picSwitched" v-if="authStore.user.email!=='aknef@yandex.ru'">min</span>
      <button v-if="item.name==='Блоки частот'&&!pressedButton" class="button1" @click="pressedButton=1"/>
      <button v-if="item.name==='Блоки частот'&&!pressedButton" class="button2" @click="pressedButton=2"/>
      <button v-if="item.name==='Блоки частот'&&!pressedButton" class="button3" @click="pressedButton=3"/>
      <button v-if="item.name==='Блоки частот'&&!pressedButton" class="button4" @click="pressedButton=4"/>
      <button v-if="item.name==='Блоки частот'&&!pressedButton" class="button5" @click="pressedButton=5"/>
      <button v-if="item.name==='Блоки частот'&&!pressedButton" class="button6" @click="pressedButton=6"/>
<!--      <img src="https://st28.stblizko.ru/images/localized/001/347/231_original.jpg" class="right hover"  @click="clickRight" alt="close"/>-->
<!--      <img src="https://st28.stblizko.ru/images/localized/001/347/231_original.jpg" class="left hover"  @click="clickLeft" alt="close"/>-->
<!--      <input type="text" class="manualInput">-->
    </div>
    <div
      v-if="(!isPublic||isRedactor) && isPanelOpen"
      class="panel pr"
    >
      <div class="fc" v-if="item">
        <button @click="deleteSub" class="ml10 mr10 cr" >del</button>
        <button @click="moveLeft(item,list)"  class="myBtn cb px-3 mr20" style="transform: rotate(90deg)">&#11015;</button>
        <button @click="moveRight(item,list)" class="myBtn cb px-3" style="transform: rotate(90deg)">&#11014;</button>
<!--        <v-btn @click="isPanelOpen=false" size="x-small" color="grey" variant="text" class="x">x</v-btn>-->
      </div>
      <input
        type="text"
        v-model="item.name"
        v-on:keyup.enter="(ev) => {updateList();ev.target.blur()}"
        @focus="(()=>{})"
        placeholder="название"
        class="nameInput myWhite"
        style="text-align:center"
        v-if="item"
        required
      >
      <div class="fc mt10" v-if="item">
        <button @click="updateList()" v-if="!this.mainStore.msg.fb.isOpen" class="myBtn cb px-3">save</button>
        <button v-if="this.mainStore.msg.fb.isOpen">saved</button>
      </div>
    </div>
    <h3 class="diagramItemTitle hover" @click="isPanelOpen=!isPanelOpen">
      {{item.name}}
    </h3>
  </li>
</template>

<script>
  import {deleteObject, getStorage, ref} from "firebase/storage";
  import {getAuth} from "firebase/auth";
  export default {
    props:['item','list','currTab','index'],
    setup() {
      const {mainStore, authStore} = useStore()
      return {mainStore, authStore}
    },

    data(){
      return{
        // isSettingsOpen:false,
        componentKeyForForceRerender: 0,
        isFullMode:false,
        isPanelOpen:false,
        newNoteName:'',
        picSwitched:false,
        pressedButton:null,
        isMovingNumber:null,
      }
    },
    computed:{
      isRedactor(){
        return this.authStore.user.mode === 'redactor'
      },
      isPublic(){
        return this.mainStore.current.infoName==='public'
      },
      cStyle(){
        let url
        if(this.picSwitched){
          url = 'img/minutes2.jpg'
          return 'background-image:url(' + url + ')'
        }
        if(this.pressedButton){
          let name
          if(this.pressedButton===1){
            name ='Буддийский блок'
          }
          if(this.pressedButton===2){
            name ='Магический блок'
          }
          if(this.pressedButton===3){
            name ='Астрологические матрицы'
          }
          if(this.pressedButton===4){
            name ='Жемчужный блок'
          }
          if(this.pressedButton===5){
            name ='Божественная иерархия'
          }
          if(this.pressedButton===6){
            name ='Другие'
          }
          const url = this.list.find(item=>item.name===name).imgUrl
          return 'background-image:url(' + url + ')'
        }
        if(this.isMovingNumber!==0){
          url = this.list[this.index+this.isMovingNumber].imgUrl
          return 'background-image:url(' + url + ')'
        }
        return 'background-image:url(' + this.item.imgUrl + ')'
      }
    },
    methods:{
      clickImage(){
        this.isFullMode=true;
        // const x=window.scrollX;
        // const y=window.scrollY;
        // window.onscroll=function(){window.scrollTo(x, y);};
        window.scrollTo({top: 0, behavior: 'smooth'});
      },
      clickClose(){
        this.isFullMode=false;
        this.picSwitched=false;
        this.pressedButton=null;
        this.isMovingNumber=0
        // window.onscroll=function(){};
        window.scrollTo({top: 0, behavior: 'smooth'});
      },
      clickNext(n){
        const newNumber = this.isMovingNumber + n
        if((this.index + newNumber !==this.list.length)&&(this.index+1 + newNumber !==0)){
          this.isMovingNumber = newNumber
        }
      },
      updateList(){
        updateFB({
          path:'diagramsList',
          data:this.mainStore.currentInfo.diagramsList
        });
      },
      moveLeft(val,array){
        let index = array.indexOf(val);
        array.splice(index,1)
        array.splice(index-1, 0, val)
        return array;
      },
      moveRight(val,array){
        let index = array.indexOf(val);
        array.splice(index,1)
        array.splice(index+1, 0, val)
        return array;
      },
      deleteSub() {
        const ok = confirm('delete ' + this.item.name + ' ?')
        if (ok) {
          //удаление в ФБ сторе
          const storage = getStorage();
          const user = getAuth().currentUser
          const root = this.mainStore.current.infoName==='public'?'public':user.email
          const url = root + '/images/diagrams/' + this.currTab+'/'+ this.item.fileName
          const storageRef1 = ref(storage, url);
          const storageRef2 = ref(storage, url+'-medium');
          const storageRef3 = ref(storage, url+'-thumb');
          deleteObject(storageRef1).then(() => {
            console.log('file 1 deleted')
          }).catch((error) => {
            console.log('file 1 delete error')
          });
          deleteObject(storageRef2).then(() => {
            console.log('file 2 deleted')
          }).catch((error) => {
            console.log('file 2 delete error')
          });
          deleteObject(storageRef3).then(() => {
            console.log('file 3 deleted')
          }).catch((error) => {
            console.log('file 3 delete error')
          });
          //удаление в стейте
          this.mainStore.deleteNote( {
            subTab: this.item.name,
            tab: this.currTab,
            info: this.mainStore.current.infoName,
            listName: 'diagramsList'
          })
          this.updateList()
        }
      }

        },
  };
</script>

<style scoped>
  .divImgFullMode{
    /*background-size: 100%;*/
    background-position: center;
    background-color: white;
    /*background-repeat: no-repeat;*/
    background-size: contain;
    /*background-attachment: fixed;*/
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
  }
  .minImgFullMode{
    /*background-size: 100%;*/
    background-position: center;
    background-color: white;
    /*background-repeat: no-repeat;*/
    background-size: cover;
    /*background-attachment: fixed;*/
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
  }
  .panel{
    /*position: absolute;*/
    /*top:0;*/
    /*left:0;*/
    /*bottom:0;*/
    /*right:0;*/
    /*z-index: 100;*/
    height: 160px;
    padding-top:40px;
  }
  .x{
    position: absolute;
    top:5px;
    right:0;
    padding-top:5px;
  }
  .close{
    width: 60px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1001;
    margin:20px 20px 0 0 ;
  }
  .right,.left{
    width: 70px;
    position: fixed;
    top: 40%;
    z-index: 1001;
    margin:0 ;
  }
  .right{
    right: -10px;
    transform: rotate(90deg);
  }
  .left{
    left: 10px;
    transform: rotate(-90deg);
  }
  .rightD{
    top:80% !important;
    left: 10px!important;
  }
  .closeLeft{
    width: 60px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    margin:20px 0 0 20px;
  }
  .min{
    width: 60px;
    position: fixed;
    top: 100px;
    left: 0;
    z-index: 1001;
    margin:20px 0 0 20px;
    font-size: 40px;
    color:black;
  }
  .diagramItem{
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    width:160px;
    margin-bottom: 20px;
    box-shadow: 0 0 5px rgba(0,0,0,0.95);
    border-radius: 5px;
  }
  .diagramItem.fullModeWidth{
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    margin: 0;
    border-radius: 0;
    padding: 40px;
  }
 .diagramItemTitle{
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
    padding: 0;
    align-items: center;
    text-align: center;
  }
  .manualInput{
    width: 250px;
    position: fixed;
    bottom: 90px;
    left: 40%;
    z-index: 1000;
    font-size: 18px;
  }
  .img {
    width: 100%;
    border-radius: 5px;
    /*flex-flow: row;*/
    /*align-items: center;*/
  }
  .panelBtn{
    position: absolute;
    bottom: 5px;
    right: -15px;
    transform: rotate(90deg);
    font-size: 14px;
    line-height: 0;
  }
  .nameInput{
    border:1px solid rgba(255,255,255,0.2);
    width:100%;
    margin-top:10px;
  }

  .switch{
    width: 60px;
    position: absolute;
    top: 100px;
    left: 0;
    z-index: 1001;
    margin:20px 0 0 20px;
  }
  .button1,.button2,.button3,.button4,.button5,.button6{
    position: absolute;
    height:120px;
    width:120px;
    border:1px solid rgba(0,0,0,0.05);
    border-radius: 50%;
  }
  .button1{
    top:340px;
    left:100px;
  }
  .button2{
    top:200px;
    left:215px;
  }
  .button3{
    top:135px;
    left:370px;
  }
  .button4{
    top:135px;
    left:535px;
  }
  .button5{
    top:200px;
    left:680px;
  }
  .button6{
    top:340px;
    left:770px;
  }

  @media only screen and (max-width: 850px) {
    .diagramItem{
      width:70px;
      /*margin: 0 auto;*/
    }
    .diagramItemTitle{
      font-size: 12px;
    }
    .nameInput{
      font-size: 10px;
    }
    .panelBtn{
      position: absolute;
      top: 0;
      right: -15px;
      font-size: 10px;
    }


  }
</style>
