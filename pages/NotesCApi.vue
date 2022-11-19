<template>
  <section class="container">
    <div class="bookmarksMainContainer" :style="'background-color:'+mainStore.currentService?.colors?.tabBgColor">
<!--&lt;!&ndash;      1 столбик&ndash;&gt;-->
      <ul class="bookmarksContainer hideMob pr" :style=" 'color:'+mainStore.currentService?.colors?.tabColorText">
        <div class="tabItemDots hover" @click="isPanelTabOpen=!isPanelTabOpen">
          ...
        </div>
        <li
          v-for="item in cTabs"
          :key="item"
          :class="['bookmarkBtn', { active: currentTab === item}]"
          @click="currentTab = item"
        >
          {{ item }}
        </li>
        <li v-if="!cList.length" class="grey fz12 fc">no catalog</li>
        <li class="servContainer" v-if="isPanelTabOpen && (mainStore.current.infoName!=='public' || authStore.user.mode === 'redactor')">
          <div class="btnsContainer">
            <button @click="addCatalog">add catalog</button>
            <button class="ml10" @click="deleteTab" size="x-small" color="red" rounded variant="text" >del</button>
            <button @click="moveLeft(cTabItem,cList)"  size="x-small" color="grey" variant="text">&#11014;</button>
            <button @click="moveRight(cTabItem,cList)"  size="x-small" color="grey" variant="text">&#11015;</button>
          </div>
          <input
            type="text"
            v-model="newCatalogTitle"
            v-on:keyup.enter="(ev) => {changeCatalogName();ev.target.blur()}"
            @focus="newCatalogTitle=currentTab"
            placeholder="изменить название"
            v-if="cTabItem"
            class="tabInput pl5"
            required
          >
          <button class="ml10" @click="update"
                 v-if="currentTab!=='Дневник'" size="x-small" color="yellow" rounded variant="text"
          >save</button>
        </li>
<!--        <li class="btnsContainer mt20 mb20" v-if="isPublic && cTabs.length">-->
<!--          <v-btn @click="copyPublicNotesToLocal" size="x-small" color="yellow" rounded variant="contained" >copy this catalog to my list</v-btn>-->
<!--        </li>-->
      </ul >
      <!--      2 столбик-->
      <ul class="bookmarksSubContainer hideMob pr" v-if="cTabItem" >
        <li
          v-for="item in cSubTabList"
          :key="item.name"
          :class="['bookmarkSubBtn', { active: currentSubTab === item.name}]"
          @click="currentSubTab=item.name"
          :style="'color:'+mainStore.currentService?.colors?.tabColorText"
        >
          <LazyMyImg url="/img/tape.png"  class="mr10" size="30" round="true" v-if="item.fileNameAudio"/>
          <LazyMyImg :url="item.imgUrlThumb||item.imgUrl||'/img/cosmo.png'" class="mr10" size="30" round="true" v-else/>
<!--          <img :src="item.imgUrl" alt="kjj" class="subImg"/>-->
          {{ item.name }}
        </li>
        <li v-if="!cSubTabList.length" class="grey fz12 fc">no notes</li>
        <div class="tabItemDots hover" @click="isPanelSubTabOpen=!isPanelSubTabOpen">
          ...
        </div>
        <li class="servContainer" v-if="isPanelSubTabOpen && (mainStore.current.infoName!=='public' || authStore.user.mode === 'redactor')">
          <div class="btnsContainer" >
            <button @click="addNote">add note</button>
            <button class="ml10" @click="deleteSub" v-if="cSubTabItem" >del</button>
            <button @click="moveLeft(cSubTabItem,cSubTabList)" v-if="cSubTabItem" >&#11014;</button>
            <button @click="moveRight(cSubTabItem,cSubTabList)" v-if="cSubTabItem" >&#11015;</button>
          </div>
          <input
            type="text"
            v-model="newNoteName"
            v-on:keyup.enter="(ev) => {changeNoteName();ev.target.blur()}"
            @focus="(()=>{newNoteName=currentSubTab})"
            placeholder="изменить название"
            class="tabInput pl5"
            v-if="cSubTabItem "
            required
          >
          <button class="ml10" @click="updateFB({path:'notesList', data:mainStore.currentInfo.notesList})"
                 size="x-small" color="yellow" rounded variant="text" v-if="cSubTabList.length"
          >save</button>
        </li>
      </ul>
    </div>

<!--    мобильная версия -->

<!--    <select class="select hideDesk  myWhite pl5" name="catalog" v-model="currentTab">-->
<!--      <option class="option" :value="item" v-for="item in cTabsMob" :key="item">{{item}}</option>-->
<!--    </select>-->
<!--    <select class="select hideDesk myWhite pl5" name="catalog" v-model="currentSubTab">-->
<!--      <option class="option" :value="item.name" v-for="item in cSubTabList" :key="item.name">{{item.name}}</option>-->
<!--    </select>-->
    <div class="zametki hideDesk hover" v-if="authStore.user.isA" @click="zametkiClick">
      <img src="/img/notes2.png" style="width:100%" alt="zametki"/>
    </div>
    <div fluid class="hideDesk card mb20">
      <div align="center" justify="center">
        <div
          class="d-flex"
          cols="12"
          sm="6"
        >
          <select
            v-model="mainStore.notes.currentTab"
            :items="cTabs"
            label="Catalog"
          ></select>
        </div>
        <div
          class="d-flex"
          cols="12"
          sm="6"
          v-if="cTabItem"
        >
          <select
            v-model="mainStore.notes.currentSubTab"
            :items="cSubTabs"
            label="Note"
          ></select>
        </div>
      </div>
      <div class="fc mt10" v-if="mainStore.current.infoName==='public'">
        <button @click="copyPublicNotesToLocal" >copy this catalog to my list</button>
      </div>
    </div>
<!--    2 half    -->

    <div class="bodyContainer">
      <NotesItem
        :item="cSubTabItem"
        :list="cSubTabList"
        :curr-tab="currentTab"
        :curr-sub-tab="currentSubTab"
        v-if="cSubTabItem"
      />
      <br/>
    </div>
  </section>
</template>

<script setup>
  import generateRandomId from '~/helpers/generateRandomId';
  import {onMounted} from "../.nuxt/imports";
  const {mainStore, authStore} = useStore()
  const props = defineProps(['list'])
  const newNoteName = ref(null)
  const newCatalogTitle = ref(null)
  const isPanelTabOpen = ref(false)
  const isPanelSubTabOpen = ref(false)
  const dialog = ref(false)
  const currentTab= ref('')
  const currentSubTab = ref('')
  const cList = computed(()=>{
    if(props.list){
      return props.list
    }else return mainStore?.currentInfo?.notesList ??[]
  })
  const cTabs= computed(()=> {
    return cList?.value.map(item=>item.title) ?? [];
  })
  const cSubTabs= computed(()=> {
    const catalog = cList?.value.find(item=>item.title===currentTab.value)
    return catalog?.items?.map(item=>item.name) ?? [];
  })
  const cSubTabList= computed(()=>{
    const catalog = cList?.value.find(item=>item.title === currentTab.value)
    return catalog?.items??[];
  })
  const cTabItem= computed(()=>cList?.value.find(item=>item.title === currentTab.value))
  const cSubTabItem= computed(()=>cSubTabList?.value.find(item=>item.name === currentSubTab.value))

  onMounted(()=>{
    currentTab.value = cTabs.value[0]
  })
  mainStore.$subscribe((mutation, state) => {
    if(state.public.notesList || state.beloeInfo.notesList){
      console.log('public or beloeInfo notesList changed. Setting currentTab [0]')
      currentTab.value = cTabs.value[0]
    }
    if(state.current.infoName ){
      console.log('current.infoName changed. Setting currentTab and currentSubTab [0]')
      currentTab.value = cTabs.value[0]
      currentSubTab.value = cSubTabs.value[0]
    }
  })
  watch(currentTab, () => {
    if(!currentTab){
      currentTab.value = cTabs.value[0]
    }else if(currentTab.value === 'Заметки'){
      currentSubTab.value = '---VUE---';
    }else {
      currentSubTab.value = cSubTabs.value[0]
      newCatalogTitle.value = currentTab.value
    }
  })

  function copyPublicNotesToLocal(){
    mainStore.copyPublicNotesToLocal({tabItem:cTabItem})
    mainStore.setCurrentInfoName('beloeInfo')
    updateFB({path:'notesList', data:mainStore.beloeInfo.notesList});
    mainStore.showMsg({ text:'copied', type:'success'});
  }

  function update(){
    if(newCatalogTitle){
      changeCatalogName()
    }else if(this.newNoteName){
      changeNoteName()
    }else{
      updateFB({path:'notesList', data:mainStore.currentInfo.notesList})
    }
  }

  function changeCatalogName(){
    const newList = cList.value.map(item=>{
      if(item.title===currentTab.value){
        return {...item, title:newCatalogTitle.value}
      }else return item
    })
    mainStore.setLvl({
      data:newList,
      lvl1:'notesList',
    })
    updateFB({path:'notesList', data:newList});
    currentTab.value = newCatalogTitle.value
  }

  function changeNoteName(){
    const newList = cList.value.map(item=>{
      if(item.title===currentTab.value){
        const newItems = item.items.map(item2=> {
          if (item2.name === currentSubTab.value) {
            return {
              ...item2,
              name:newNoteName.value
            }
          }else return item2
        })
        return {
          ...item,
          items:newItems
        }
      }else return item
    })
    mainStore.setLvl({
      data:newList,
      lvl1:'notesList',
    })
    updateFB({path:'notesList', data:newList});
    currentSubTab.value =newNoteName.value
  }

  function addCatalog() {
    const title = prompt('Название каталога')
    const item = {title, id:generateRandomId(), items:[]}
    if (title) {
      mainStore.addCatalog({item:item, listName:'notesList'})
      // updateFB({path:'notesList', data:cList});
      currentTab.value = title;
      console.log(currentTab.value)
    }
  }
  function addNote() {
    const name = prompt('Название заметки')
    const itemObj = {name, imgUrl:'/img/cosmo.png', text:'', id:generateRandomId(),}
    if (name) {
      mainStore.addNote({itemObj, tab:this.currentTab, listName:'notesList'})
      updateFB({path:'notesList', data:cList});
      currentSubTab.value = name;
    }
  }
  function deleteTab() {
    const ok = confirm('delete '+currentTab.value+' ?')
    if(ok){
      mainStore.deleteCatalog( {
        tab: currentTab.value,
        info: mainStore.current.infoName,
        listName: 'notesList'
      })
      if(cTabs.value[cTabs.value.length-1]!==0){
        currentTab.value = cTabs.value[cTabs.value.length-1] ||'';//сдвинуть таб посл стр
      }
      updateFB({path:'notesList', data:cList});
      dialog.value = false
      // const storage = getStorage();
      // const user = getAuth().currentUser
      // const root = this.$store.getters.current.infoName==='public'?'public':user.email
      // const storageRef = ref(storage, root + '/images/' + this.currentTab);
      // deleteObject(storageRef).then(() => {
      //   console.log('file deleted')
      // }).catch((error) => {
      //   console.log('file delete error')
      // });
    }
  }
  function deleteSub(){
    const ok = confirm('delete '+currentSubTab.value+' ?')
    if(ok){
      //удаление в ФБ сторе
      const storage = getStorage();
      // const user = getAuth().currentUser
      const root = mainStore.current.infoName==='public'?'public':authStore.user.email
      const tabObj = cList.value.find(item=>item.title === this.currentTab).items.find(item=>item.name === currentSubTab.value)
      const urlPdf = root + '/pdf/' + currentTab.value+'/'+ currentSubTab.value + "/" + tabObj?.fileNamePdf
      const urlAudio = root + '/audio/' + currentTab.value+'/'+ currentSubTab.value + "/" + tabObj?.fileNameAudio
      const urlImg = root + '/images/' + currentTab.value+'/'+ currentSubTab.value + "/" + tabObj?.fileNameImg
      const urlImgThumb = root + '/images/' + currentTab.value+'/'+ currentSubTab.value + "/thumb-" + tabObj?.fileNameImg
      const urlImgMedium = root + '/images/' + currentTab.value+'/'+ currentSubTab.value + "/medium-" + tabObj?.fileNameImg
      const storageRef1 = ref(storage, urlImg);
      const storageRef2 = ref(storage, urlImgMedium);
      const storageRef3 = ref(storage, urlImgThumb);
      const storageRefPdf = ref(storage, urlPdf);
      const storageRefAudio = ref(storage, urlAudio);
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
      deleteObject(storageRefPdf).then(() => {
        console.log('file deleted')
      }).catch((error) => {
        console.log('file delete error')
      });
      deleteObject(storageRefAudio).then(() => {
        console.log('file deleted')
      }).catch((error) => {
        console.log('file delete error')
      });
      //удаление в стейте
      mainStore.deleteNote( {
        subTab:currentSubTab.value,
        tab:currentTab.value,
        listName:'notesList'
      })
      if(cSubTabs.value[cSubTabs.value.length-1]!==0){
        currentSubTab.value = cSubTabs.value[cSubTabs.value.length-1] ||'';//сдвинуть таб посл стр
      }
      updateFB({path:'notesList', data:cList});
      this.dialog=false
    }
  }
  function tabClick(tab){
    currentTab.value = tab;
    // this.currentSubTab = this.cSubTabs[0]//перенес в вачер ибо еще мобилка
  }
  function subTabClick(tab){
    currentSubTab.value = tab;
  }
  function zametkiClick(){
    currentTab.value = 'Заметки';
  }
  function moveLeft(val,array){
    // console.log(val,array)
    let index = array.indexOf(val);
    array.splice(index,1)
    array.splice(index-1, 0, val)
    return array;
  }
  function moveRight(val,array){
    let index = array.indexOf(val);
    array.splice(index,1)
    array.splice(index+1, 0, val)
    return array;
  }

</script>

<script>
  export default {
  //   methods:{
  //     copyPublicNotesToLocal(){
  //       this.$store.commit('copyPublicNotesToLocal',{tabItem:this.cTabItem})
  //       // mainStore.setCurrentInfoName( 'beloeInfo')
  //       this.$store.dispatch('updateFB',{path:'notesList', data:this.$store.state.cosmoModule.beloeInfo.notesList,});
  //       // mainStore.showMsg( { text:'copied', type:'success'});
  //     },
  //     update(){
  //       if(this.newCatalogTitle){
  //         this.changeCatalogName()
  //       }else if(this.newNoteName){
  //         this.changeNoteName()
  //       }else{
  //         this.$store.dispatch('updateFB',{path:'notesList', data:this.$store.getters.currentInfo.notesList})
  //       }
  //     },
  //     changeCatalogName(){
  //         const newList = this.cList.map(item=>{
  //           if(item.title===currentTab.value){
  //             return {...item, title:this.newCatalogTitle}
  //           }else return item
  //         })
  //         this.$store.commit('setLvl',{
  //           data:newList,
  //           lvl1:'notesList',
  //         })
  //       this.$store.dispatch('updateFB',{path:'notesList', data:newList});
  //       currentTab.value = this.newCatalogTitle
  //     },
  //     changeNoteName(){
  //       const newList = this.cList.map(item=>{
  //           if(item.title===this.currentTab){
  //             const newItems = item.items.map(item2=> {
  //               if (item2.name === currentSubTab.value) {
  //                 return {
  //                   ...item2,
  //                   name:this.newNoteName
  //                 }
  //               }else return item2
  //             })
  //             return {
  //               ...item,
  //               items:newItems
  //             }
  //           }else return item
  //         })
  //       this.$store.commit('setLvl',{
  //         data:newList,
  //         lvl1:'notesList',
  //       })
  //       this.$store.dispatch('updateFB',{path:'notesList', data:newList});
  //       this.currentSubTab = this.newNoteName
  //     },
  //     addCatalog() {
  //       const title = prompt('Название каталога')
  //       const item = {
  //         title,
  //         id:generateRandomId(),
  //         items:[]
  //       }
  //       if (title) {
  //         this.$store.commit('addCatalog', {
  //           item,
  //           listName:'notesList'
  //         })
  //         this.$store.dispatch('updateFB',{path:'notesList', data:this.cList});
  //         this.currentTab = title;
  //         console.log(this.currentTab)
  //       }
  //     },
  //     addNote() {
  //       const name = prompt('Название заметки')
  //       const itemObj = {
  //         name,
  //         imgUrl:'/img/cosmo.png',
  //         text:'',
  //         id:generateRandomId(),
  //       }
  //       if (name) {
  //         this.$store.commit('addNote', {
  //           itemObj,
  //           tab:this.currentTab,
  //           listName:'notesList'
  //         })
  //         this.$store.dispatch('updateFB',{path:'notesList', data:this.cList});
  //         this.currentSubTab = name;
  //       }
  //     },
  //     deleteTab() {
  //       const ok = confirm('delete '+this.currentTab+' ?')
  //       if(ok){
  //       this.$store.commit('deleteCatalog', {
  //         tab: this.currentTab,
  //         info: this.$store.getters.current.infoName,
  //         listName: 'notesList'
  //       })
  //       if(this.cTabs[this.cTabs.length-1]!==0){
  //         this.currentTab = this.cTabs[this.cTabs.length-1] ||'';//сдвинуть таб посл стр
  //       }
  //       this.$store.dispatch('updateFB', {path: 'notesList', data: this.cList});
  //       this.dialog = false
  //       // const storage = getStorage();
  //       // const user = getAuth().currentUser
  //       // const root = this.$store.getters.current.infoName==='public'?'public':user.email
  //       // const storageRef = ref(storage, root + '/images/' + this.currentTab);
  //       // deleteObject(storageRef).then(() => {
  //       //   console.log('file deleted')
  //       // }).catch((error) => {
  //       //   console.log('file delete error')
  //       // });
  //     }
  //     },
  //     deleteSub(){
  //       const ok = confirm('delete '+this.currentSubTab+' ?')
  //       if(ok){
  //         //удаление в ФБ сторе
  //         const storage = getStorage();
  //         const user = getAuth().currentUser
  //         const root = this.$store.getters.current.infoName==='public'?'public':user.email
  //         const tabObj = this.cList.find(item=>item.title === this.currentTab).items.find(item=>item.name === this.currentSubTab)
  //         const urlPdf = root + '/pdf/' + this.currentTab+'/'+ this.currentSubTab + "/" + tabObj.fileNamePdf
  //         const urlAudio = root + '/audio/' + this.currentTab+'/'+ this.currentSubTab + "/" + tabObj.fileNameAudio
  //         const urlImg = root + '/images/' + this.currentTab+'/'+ this.currentSubTab + "/" + tabObj.fileNameImg
  //         const urlImgThumb = root + '/images/' + this.currentTab+'/'+ this.currentSubTab + "/thumb-" + tabObj.fileNameImg
  //         const urlImgMedium = root + '/images/' + this.currentTab+'/'+ this.currentSubTab + "/medium-" + tabObj.fileNameImg
  //         const storageRef1 = ref(storage, urlImg);
  //         const storageRef2 = ref(storage, urlImgMedium);
  //         const storageRef3 = ref(storage, urlImgThumb);
  //         const storageRefPdf = ref(storage, urlPdf);
  //         const storageRefAudio = ref(storage, urlAudio);
  //         deleteObject(storageRef1).then(() => {
  //           console.log('file 1 deleted')
  //         }).catch((error) => {
  //           console.log('file 1 delete error')
  //         });
  //         deleteObject(storageRef2).then(() => {
  //           console.log('file 2 deleted')
  //         }).catch((error) => {
  //           console.log('file 2 delete error')
  //         });
  //         deleteObject(storageRef3).then(() => {
  //           console.log('file 3 deleted')
  //         }).catch((error) => {
  //           console.log('file 3 delete error')
  //         });
  //         deleteObject(storageRefPdf).then(() => {
  //           console.log('file deleted')
  //         }).catch((error) => {
  //           console.log('file delete error')
  //         });
  //         deleteObject(storageRefAudio).then(() => {
  //           console.log('file deleted')
  //         }).catch((error) => {
  //           console.log('file delete error')
  //         });
  //         //удаление в стейте
  //         this.$store.commit('deleteNote', {
  //           subTab:this.currentSubTab,
  //           tab:this.currentTab,
  //           listName:'notesList'
  //         })
  //         // let lastSubTab
  //         // if(this.cSubTabList.length>0){
  //         //   lastSubTab = this.cSubTabList[this.cSubTabList.length-1].name
  //         // }else lastSubTab = ''
  //         if(this.cSubTabs[this.cSubTabs.length-1]!==0){
  //           this.currentSubTab = this.cSubTabs[this.cSubTabs.length-1] ||'';//сдвинуть таб посл стр
  //         }
  //         this.$store.dispatch('updateFB',{path:'notesList', data:this.cList});
  //       this.dialog=false
  //       // const storage = getStorage();
  //         // const user = getAuth().currentUser
  //         // const root = this.$store.getters.current.infoName==='public'?'public':user.email
  //         // const storageRef = ref(storage, root + '/images/' + this.currentTab+'/' + this.currentSubTab +'/'+this.cSubTabItem.imgUrl);
  //         // const storageRef2 = ref(storage, root + '/images/' + this.currentTab+'/' + this.currentSubTab +'/'+this.cSubTabItem.imgUrlThumb);
  //         // const storageRef3 = ref(storage, root + '/images/' + this.currentTab+'/' + this.currentSubTab +'/'+this.cSubTabItem.imgUrlMedium);
  //         // deleteObject(storageRef).then(() => {
  //         //   console.log('file deleted')
  //         // }).catch((error) => {
  //         //   console.log('file delete error')
  //         // });
  //         // deleteObject(storageRef2).then(() => {
  //         //   console.log('file deleted')
  //         // }).catch((error) => {
  //         //   console.log('file delete error')
  //         // });
  //         // deleteObject(storageRef3).then(() => {
  //         //   console.log('file deleted')
  //         // }).catch((error) => {
  //         //   console.log('file delete error')
  //         // });
  //       }
  //     },
  //     tabClick(tab){
  //       this.currentTab = tab;
  //       // this.currentSubTab = this.cSubTabs[0]//перенес в вачер ибо еще мобилка
  //     },
  //     subTabClick(tab){
  //       this.currentSubTab = tab;
  //     },
  //     zametkiClick(){
  //       this.currentTab = 'Заметки';
  //     },
  //     moveLeft(val,array){
  //       // console.log(val,array)
  //       let index = array.indexOf(val);
  //       array.splice(Notes,1)
  //       array.splice(Notes-1, 0, val)
  //       return array;
  //     },
  //     moveRight(val,array){
  //       let index = array.indexOf(val);
  //       array.splice(Notes,1)
  //       array.splice(Notes+1, 0, val)
  //       return array;
  //     },
  //
  //   },
    watch:{
      '$store.getters.beloeInfo.notesList.length':{
        handler(){
        },
        immediate:false,
      },
    }
  };
</script>

<style scoped>
  .selected{
    color:red;
  }
  .container{
    display: flex;
    /*justify-content: space-between;*/
    /*margin-top:50px;*/
    /*border: 0 solid rgba(255, 255, 255, 0) !important;*/
    /*min-height: 100vh;*/
    /*border-radius: 15px;*/
    /*padding: 20px;*/
    /*background-size: cover;*/
    /*background-attachment:fixed;*/

    /*max-width:1240px;*/
    /*margin:0 auto ;*/
    /*background-position: center top;*/
  }
  .bookmarksMainContainer{
    /*padding: 20px;*/
    box-shadow: 0 0 15px rgba(0,0,0,0.95);
    display: flex;
    /*flex-wrap: wrap;*/
    border-radius: 10px;
  }
  .bookmarksContainer{
    width: 270px;
    min-height: 100%;
    /*background-color: rgba(65,27,60,0.9);*/
    /*border-top-left-radius: 15px;*/
    /*border-right: 1px solid rgba(255, 255, 255, 0.1);*/
    padding: 20px 0 20px 10px;
  }
  .bookmarksSubContainer{
    width: 270px;
    padding: 20px;
    background-color: rgba(0,0,0,0.5);
  }
  .bodyContainer{
    flex-grow: 1;
    margin-left: 20px;
    flex-flow: column;
  }
  .zametki{
    position: absolute;
    top:100px;
    right:20px;
    width:30px;
  }
  .select{
    width:200px;
    margin: 20px auto;
    border:1px solid grey;
  }
  .option{
    background-color: transparent;
    color: #2b2118;
  }
  .btnsContainer{
    display: flex;
    justify-content: space-around;
  }
  .servContainer{
    margin-top:40px;
    display: flex;
    flex-flow: column;
    align-items: center;
  }
  .tabInput{
    background-color: transparent;
    border:1px solid rgba(255, 255, 255, 0.3);
    color:rgba(255, 255, 255, 0.9);
    margin: 20px 0;
  }
  .tabItemDots{
    position: absolute;
    right:5px;
    bottom:0;
    transform: rotate(90deg);
    margin-bottom:10px;
  }

  .addBtn{
    font-size: 20px;
    color:rgba(255,255,255, 0.9);
    background-color: rgba(0, 0, 0, 0.5);
    display: block;
    align-self: center;
    border-radius: 5px;
    margin-right: 10px;
  }
  .addBtn:hover{
    background-color: rgba(0, 0, 0, 0.9);
  }
  .bookmarkBtn,.bookmarkBtnDiary {
    padding-left: 10px;
    border: 1px solid rgba(255, 255, 255, 0);
    cursor: pointer;
    /*background-color: rgba(0, 0, 0, 0.9);*/
    /*color:rgba(0,0,0, 0.8);*/
    /*color:rgba(255, 255, 255, 0.8);*/
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  .bookmarkSubBtn {
    /*padding: 0 7px;*/
    border: 1px solid rgba(255, 255, 255, 0);
    cursor: pointer;
    /*background-color: rgba(0, 0, 0, 0.9);*/
    color:rgba(255, 255, 255, 0.8);
    margin-bottom: 5px;
    display: flex;
    align-items: center;
  }
  .bookmarkBtn.active {
    /*border-color:lightgoldenrodyellow;*/
    /*color:rgba(0, 0, 0, 0.9) !important;*/
    background-color: rgba(0,0,0,0.5);
    /*color: #F8CC2D!important;*/
    /*font-size: 24px;*/
  }
  .bookmarkBtnDiary.active {
    color: #F8CC2D!important;
  }
  .bookmarkSubBtn.active {
    /*border-color:lightgoldenrodyellow;*/
    /*color:rgba(0, 0, 0, 0.9) !important;*/
    /*background-color: lightgoldenrodyellow;*/
    color: #F8CC2D!important;
    /*font-size: 24px;*/
  }
  .bookmarkBtn:hover, .bookmarkSubBtn:hover {
    /*border-color:lightgoldenrodyellow;*/
    /*color: #F8CC2D!important;*/
    /*transform: scale(1.01);*/

  }
  /*.bookmarkBtn.radius,.bookmarkSubBtn.radius {*/
  /*  border-top-left-radius: 5px;*/
  /*}*/


  .cosmobg{
    /*background-image: url("/img/cosmobg.jpg");*/
    /*background-size: cover;*/
    /*min-height: 100vh;*/
    /*background-attachment:fixed;*/
  }

  .delBtn{
    background-color: transparent;
    color: red;
    position: absolute;
    top:10px;
    right:10px;
    border: none;
    font-size: 15px;
  }
  .delBtn:hover{
    color: #42d69c;
    cursor: pointer;
  }
  .hideDesk{
    display: none;
  }
  .hideMob{
    display: unset;
  }

  @media only screen and (max-width: 850px) { /* это будет показано при разрешении монитора до 930 пикселей */
    .hideDesk{
      display: unset;
    }
    .hideMob{
      display: none;
    }
    .container{
      flex-flow: column;
    }
    .bookmarksMainContainer{
      padding: 0;
    }
    .container{
      padding: 0;
    }
    .bodyContainer{
      margin-left: 0;
    }

    /*.bookmarksContainer{*/
    /*  border-top-left-radius: unset;*/
    /*  border-bottom-left-radius: unset;*/
    /*  display: flex;*/
    /*  flex-wrap: wrap;*/
    /*  justify-content: space-around;*/
    /*  padding-top:20px;*/
    /*}*/
    .bookmarkBtn.radius {
      border-top-left-radius: unset;
    }

  }
</style>
