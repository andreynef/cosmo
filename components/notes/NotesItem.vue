<template>
  <div class="cosmoItem myWhite pr" :class="{'fullModeCard':isFullModeCard}" :style="cStyleCard">
    <div :class="{'fullModeInnerWrapper':isFullModeCard}">
      <div class="cosmoItemHeader">
        <img src="/img/tape.png"
             class="img"
             alt="cosmoItemImg"
             v-if="item.fileNameAudio"
        />
        <img :src="item.imgUrl||'/img/cosmo.png'"
             class="img"
             @click="clickImage"
             alt="cosmoItemImg"
             :style="{width:item.isOnlyPicture?'100%':''}"
             v-else
        />
        <img alt="fm ico" src="/img/fullMode.png" class="fullModeIco hover" @click="clickFullModeBtn" v-if="!item.isOnlyPicture && item.text"/>
        <h3 class="cosmoItemTitle" v-if="!item.isOnlyPicture">
          {{item.name}}
        </h3>
<!--        <v-btn @click="download(item.fileUrl,item.name)" color="grey" size="x-small" class="ml20" v-if="item.fileUrl">скачать</v-btn>-->
        <a :href="item.fileUrl" v-if="item.fileUrl" target="_blank" style="text-decoration: none">
            <img alt="download" class="ml20 hover" src="/img/svg/download.svg" style="width:20px"/>
        </a>
        <div>
          <div :style="{backgroundImage:'url(' + item.imgUrl + ')'}" v-if="isFullModePic" class="divImgFullMode"/>
          <img src="https://grahb.com/wp-content/uploads/2020/05/menu-close.png"
               class="close hover" v-if="isFullModePic"
               @click="clickClose"
               alt="close"
          />
        </div>
        <MusicPlayerPlayButton :tracks="item.tracks" v-if="item.tracks" :key="componentKeyForForceRerender" class="ml20"/>
      </div>
      <div class="body" >
        <textarea
          v-model="item.text"
          class="cosmoTextArea"
          :class="{'fullModeTextArea':isFullModeCard}"
          :style="cStyleTextArea"
          v-if="!item.isOnlyPicture"
        />
<!--        <p class="p20" :style="cStyleTextArea" v-if="isPublic && !isRedactor && item.text">{{item.text}}</p>-->
        <div class="btnsContainer mt20" v-if="(!isPublic ||isRedactor)&&!item.isOnlyPicture">
          <button  @click="updateList"  class="myBtn cb px-3">
            save
          </button>
          <button @click="clickSettings" class="myBtn cb px-3 ml20" v-if="!isFullModeCard">{{isSettingsOpen?'close':'open'}} settings</button>
          <div v-if="isFullModeCard" class="ml20">
            <button @click="changeFontSize(-2)" class="myBtn cb px-3">-</button>
            {{cService.fontSize}}px
            <button @click="changeFontSize(2)" class="myBtn cb px-3">+</button>
          </div>
        </div>
        <button @click="markAsOnlyPicture" class="mark" v-if="mainStore.current.infoName !== 'public'">{{item.isOnlyPicture?'un':''}}mark as "only picture"</button>
      </div>
      <NotesSettings
        :item="item"
        :list="list"
        :curr-tab="currTab"
        :curr-sub-tab="currSubTab"
        v-if="isSettingsOpen"
      />
    </div>
  </div>
</template>

<script>
  import generateRandomId from '~/helpers/generateRandomId';
  // import axios from "axios";
  export default {
    setup() {
      const {mainStore, authStore} = useStore()
      return {mainStore, authStore}
    },
    props:['item','list','currTab','currSubTab'],
    data(){
      return{
        size:this.item.fontSize||16,
        isFullModeCard:false,
        isSettingsOpen:false,
        componentKeyForForceRerender: 0,
        isFullModePic:false,
        fontSizeBeforeFullMode:null,
      }
    },
    computed:{
      isRedactor(){
        return this.authStore.user.mode === 'redactor'
      },
      isPublic(){
        return this.mainStore.current.infoName==='public'
      },
      cStyleCard(){
        return 'background-color:'+this.mainStore.currentService.colors.cardBgColor+';'
      },
      cStyleTextArea(){
        const style1 = 'background-color:'+this.mainStore.currentService.colors.textAreaBgColor+';'
        const style2 = 'color:'+this.mainStore.currentService.colors.textAreaTextColor+';'
        const style3 = 'font-family:'+this.mainStore.currentService.fontFamily+';'
        const style4 = 'font-size:'+this.mainStore.currentService.fontSize+'px;'
        return style1+style2+style3+style4
      },
      cService(){
        if(this.mainStore.currentInfo){
          return this.mainStore.currentService
        }else return {}
      },
      cList(){
        if(this.mainStore.currentInfo){
          return this.mainStore.currentInfo.notesList
        }else return []
      },
    },
    methods:{
      clickImage(){
        this.isFullModePic=true;
        // const x=window.scrollX;
        // const y=window.scrollY;
        // window.onscroll=function(){window.scrollTo(x, y);};
        window.scrollTo({top: 0, behavior: 'smooth'});
      },
      console(){
        console.log(this.item)
      },
      clickClose(){
        this.isFullModePic=false;
        // window.onscroll=function(){};
        window.scrollTo({top: 0, behavior: 'smooth'});
      },
      clickFullModeBtn(ev){
        this.isFullModeCard=!this.isFullModeCard;
        this.isSettingsOpen=false;
        window.scrollTo({top: 0, behavior: 'smooth'});
      },
      clickSettings(){
        if(this.isSettingsOpen){
          window.scrollTo({top: 0, behavior: 'smooth'});
        }
        this.isSettingsOpen=!this.isSettingsOpen;
      },
      markAsOnlyPicture(){
        this.mainStore.markAsOnlyPicture({
          tab:this.currTab,
          subTab:this.currSubTab
        })
        updateFB({
          path:'notesList',
          data:this.mainStore.currentInfo.notesList}
          );
        // mainStore.showMsg( { text:'marked', type:'success'});
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.isSettingsOpen=false;
      },
      updateList(){
        updateFB({
          path:'notesList',
          data:this.cList
        });
      },
      download(url,name){
        axios({
          url: url,
          method: 'GET',
          responseType: 'blob'
        })
          .then((response) => {
            const url = window.URL
              .createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name+'.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
      },
      changeFontSize(number){
        const size =this.cService.fontSize+number
        this.mainStore.setLvl({
          data:size,
          lvl1:'service',
          lvl2:'fontSize'
        })
      },
      copyToTable(item){
        const itemObj = {
          name:item.name,
          imgUrl:item.imgUrl,
          block:this.currTab,
          id:generateRandomId(),
        }
        this.mainStore.addCosmoTableItem( {itemObj})
        updateFB({path:'tableList', data:this.mainStore.beloeInfo.tableList});
      },
    },
    beforeUnmount() {
      this.isSettingsOpen=false
    },

    watch:{
      'this.mainStore.current.infoName':{
        handler(){
          this.isSettingsOpen=false
          this.componentKeyForForceRerender=this.componentKeyForForceRerender+1
        },
        immediate:false,
      },
      isFullModeCard:{
        handler(){
          if(!this.fontSizeBeforeFullMode){
            this.fontSizeBeforeFullMode = this.mainStore.currentService.fontSize
            return
          }
          this.mainStore.setLvl({
            data:this.fontSizeBeforeFullMode,
            lvl1:'service',
            lvl2:'fontSize'
          })
        },
        immediate:false,
      },
      currTab:{
        handler(){
          this.componentKeyForForceRerender=this.componentKeyForForceRerender+1
          this.isSettingsOpen=false
          window.scrollTo({top: 0, behavior: 'smooth'});
        },
        immediate:false,
      },
      currSubTab:{
        handler(){
          this.componentKeyForForceRerender=this.componentKeyForForceRerender+1
          this.isSettingsOpen=false
          window.scrollTo({top: 0, behavior: 'smooth'});
        },
        immediate:false,
      },
    },
  };
</script>

<style scoped>
  .fullModeIco{
    width:30px;
    margin-left:20px;
    border-radius: 5px;
    position: absolute;
    top:10px;
    right:20px;
  }
  .img{
    cursor: pointer;
    width:100px;
    transform:scale(1);
    transition:transform .2s;
  }
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
    z-index: 1000;
  }
  .close{
    width: 60px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1001;
    margin:20px 20px 0 0 ;
  }
  .cosmoItem{
    box-shadow: 0 0 15px rgba(0,0,0,0.95);
    border-radius: 15px;
    padding: 20px;
  }
  .cosmoItem.fullModeCard{
    width: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    margin: 0;
    border-radius: 0;
    padding: 20px;
  }
  .fullModeInnerWrapper{
    max-width: 1200px;
    margin:0 auto;
  }
  .cosmoItemHeader{
    width:100%;
    display: flex;
    /*flex-flow: row;*/
    align-items: center;
  }
  .body{
    display:flex;
    flex-flow:column;
  }
  .cosmoTextArea{
    min-height: 50vh;
    padding: 10px;
    border-radius: 5px;
    list-style:none;
    margin: 10px 0;
  }
  .cosmoTextArea.fullModeTextArea{
    min-height: 65vh;
  }
  .cosmoItemTitle{
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 0 20px;
    padding: 0;
  }
  .btnsContainer{
   display:flex;
    flex-flow: wrap;
  }
  .srvBtn{
    margin-left: 20px;
    margin-bottom: 10px;
  }
  .mark{
    position: absolute;
    bottom:0;
    right:10px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.5);
  }
  .mark:hover{
    color: rgba(255, 255, 255, 0.7);
  }

  @media only screen and (max-width: 850px) { /* это будет показано при разрешении монитора до 930 пикселей */
    .cosmoItem{
      width:100%;
      margin: 0 auto;
    }
    .cosmoItemTitle{
      font-size: 14px;
      margin: 0 0 0 10px;
    }
    .cosmoTextArea{
      font-size: 14px;
    }
    .btnsContainer{
      align-items: center;
    }
  }

  /*@media (max-width: 930px) { !* это будет показано при разрешении монитора до 930 пикселей *!*/
  /*  .content-wrapper {padding: 0;} !* основное содержимое занимает всё пространство окна *!*/
  /*}*/

  /*@media (max-width: 930px) and (min-width: 470px) {  !* для разрешения экрана от 470 до 930 пикселей *!*/
  /*  aside {position: static; width: 100%; background: #ccc;} !* боковая колонка смещается согласно расположению в HTML и меняет фон *!*/
  /*}*/

  /*@media (max-width: 469px) { !* если максимальное разрешение экрана составит 469 пикселей *!*/
  /*  body {font: .9em/1em "Helvetica Neue",Arial,Helvetica,sans-serif;} !* меняется шрифт *!*/
  /*  aside {display: none;} !* боковая колонка исчезает *!*/
  /*}*/
</style>
