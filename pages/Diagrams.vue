<template>
  <section>
    <span v-if="!cList.length" class="grey fz12 fc">no diagrams</span>
    <div class="tabsContainer">
      <span v-if="!cList.length" class="grey fz14 fc hover myBtn px-3 cb" @click="addCatalog">add first diagram catalog</span>
      <div :class="['tabItem', { active: currentTab === item}]" v-for="item in cTabs" :key="item" @click="currentTab=item">
        {{item}}
      </div>
      <div class="tabItemDots hover" @click="isCatalogPanelOpen=!isCatalogPanelOpen" v-if="currentTab && (!isPublic || isRedactor)">
        ...
      </div>
    </div>
    <div class="panelContainer" v-if="isCatalogPanelOpen">
      <div
        class="panel"
        :style="'background-color:'+ mainStore.currentInfo.service.colors.cardBgColor"
        v-if="!isPublic || isRedactor"
      >
        <div class="fc" v-if="cTabItem">
          <div>
            <button @click="addCatalog" class="myBtn cb px-3 mr20">+</button>
            <button @click="deleteTab" class="cr mr20">del</button>
            <button @click="moveLeft(cTabItem,cList)" class="myBtn cb px-3 mr20" style="transform: rotate(90deg)">&#11015;</button>
            <button @click="moveRight(cTabItem,cList)" class="myBtn cb px-3 mr20" style="transform: rotate(90deg)">&#11014;</button>
            <input
              type="text"
              v-model="newCatalogTitle"
              v-on:keyup.enter="(ev) => {changeCatalogTitle();ev.target.blur()}"
              @focus="(()=>{newCatalogTitle=cTabItem.title})"
              placeholder="изменить каталог"
              class="input myWhite"
              style="text-align:center;width:150px"
              v-if="cTabItem"
              required
            >
            <button @click="update" class="myBtn cb px-3 mr20">save</button>
          </div>
          <button @click="isCatalogPanelOpen=false" class="">x</button>
        </div>
      </div>
    </div>
    <ul class="listContainer">
      <DiagramItem
        v-for="item in cTabList"
        :key="item.id"
        :item="item"
        :curr-tab="currentTab"
        :list="cTabList"
        :index="cTabList.indexOf(item)"
      />
    </ul>
    <div class="fc">
      <button
        @click="isDiagramPanelOpen=!isDiagramPanelOpen"
        class="myBtn cb px-3 mb20"
        v-if="!isPublic && cList.length"
      >
        {{isDiagramPanelOpen?'close form':'open form'}}
      </button>
      <div v-if="isPublic && cTabs.length">
        <button @click="copyPublicDiagramsToLocal" >copy this catalog to my diagrams</button>
      </div>
    </div>
    <UploadPanelImage
      v-if="isDiagramPanelOpen"
      v-model:is-panel-open="isDiagramPanelOpen"
      :list="cList"
      :curr-tab="currentTab"
      list-name="diagramsList"
      :path="'images/diagrams/'+currentTab"
    />
  </section>

</template>

<script>
  import generateRandomId from "@/helpers/generateRandomId";

  export default{
    setup() {
      const {authStore,mainStore} = useStore()
      definePageMeta({
        // layout: "test-three-layout",
        middleware: ["auth-middleware"],
      })
      useHead({
        title:'Diagrams',
      })
      return {mainStore, authStore}
    },
    props:['list'],
    data(){
      return{
        currentTab: null,
        currentSubTab: null,
        itemName:null,
        newCatalogTitle:null,
        newNoteName:null,
        dialog:false,
        isDiagramFilter:false,
        isCatalogPanelOpen:false,
        isDiagramPanelOpen:false,
      }
    },
    computed:{
      isRedactor(){
        return this.authStore?.user.mode === 'redactor'
      },
      isPublic(){
        return this.mainStore?.current?.infoName==='public'
      },
      cList(){
        if(this.list){
          return this.list
        }
        if(this.mainStore?.currentInfo){
          return this.mainStore.currentInfo.diagramsList
        }else return []
      },
      cTabs() {
        const filteredArr = this.cList.filter(item=>item.isDiagram)||[]
        return filteredArr.map(item=>item.title)||[];
      },
      cTabList(){
        if(this.cList.length && this.currentTab){
          const obj1lvl = this.cList.find(item=>item.title === this.currentTab)
          if(obj1lvl){
            return obj1lvl.items||[]
          }
        }else return []
      },
      cTabItem(){
        if(this.cList.length && this.currentTab){
          return this.cList.find(item=>item.title === this.currentTab)
        }
      },
    },
    methods:{
      copyPublicDiagramsToLocal(){
        const item = {
          ...this.cTabItem,
          isDiagram:true,
        }
        this.mainStore.copyPublicDiagramsToLocal({tabItem:item})
        this.mainStore.setCurrentInfoName('beloeInfo')
        updateFB({
          path:'diagramsList',
          data:this.mainStore.beloeInfo.diagramsList,
        });
        this.mainStore.showMsg({ text:'copied', type:'success'});
      },
      // setTabToK(){
      //   const item = {
      //     ...this.cTabItem,
      //     isDiagram:true,
      //   }
      //   this.mainStore.copyPublicDiagramsToLocal({tabItem:item})
      //   // this.mainStore.setCurrentInfoName('beloeInfo')
      //   updateFBK({
      //     path:'diagramsList',
      //     data:this.mainStore.beloeInfoK.diagramsList,
      //   });
      //   this.mainStore.showMsg({ text:'copied', type:'success'});
      // },
      changeCatalogTitle(){
        const newList = this.cList.map(item=>{
          if(item.title===this.currentTab){
            return {
              ...item,
              title:this.newCatalogTitle
            }
          }else return item
        })

        this.mainStore.setLvl({
          data:newList,
          lvl1:'diagramsList',
        })
        this.currentTab=this.newCatalogTitle
        updateFB({
          path:'diagramsList',
          data:this.cList
        });
      },
      update(){
        if(this.newCatalogTitle){
          this.changeCatalogTitle()
        }else if(this.newNoteName){
          this.changeNoteName()
        }else{
          updateFB({path:'diagramsList', data:this.cList})
        }
      },
      changeNoteName(){
        const newList = this.cList.map(item=>{
          if(item.title===this.currentTab){
            const newItems = item.items.map(item2=> {
              if (item2.name === this.currentSubTab) {
                return {
                  ...item2,
                  name:this.newNoteName
                }
              }else return item2
            })
            return {
              ...item,
              items:newItems
            }
          }else return item
        })
        this.mainStore.setLvl({
          data:newList,
          lvl1:'diagramsList',
        })
        this.currentSubTab=this.newNoteName
        updateFB({
          path:'diagramsList',
          data:newList
        });
      },
      addCatalog() {
        const title = prompt('Название каталога')
        const item = {
          title,
          id:generateRandomId(),
          items:[],
          isDiagram:true,
        }
        if (title) {
          this.mainStore.addCatalog({
            item,
            listName:'diagramsList'
          })
          this.currentTab = title;
          updateFB({
            path:'diagramsList',
            data:this.cList
          });
        }else{
          // this.currentTab = this.cTabs[0] ||'';
        }
      },
      deleteTab() {
        const ok = confirm('delete '+this.currentTab+' ?')
        if(ok){

          //удаление в ФБ сторе
          const storage = getStorage();
          // const user = getAuth().currentUser
          const root = this.mainStore.current.infoName==='public'?'public':authStore.user.email
          const tabObj = this.cList.find(item=>item.title === this.currentTab)
          const filesPathsArr = tabObj&&tabObj.items?tabObj.items.map(item=>root + '/images/diagrams/' + this.currentTab+'/'+ item.fileName):[]
          filesPathsArr.forEach(function(name) {//хз как удалить папку, поэтому удалять кажд файл отдельно (3 картинки = 9 раз ибо кажд еще по 3)
            const storageRef1 = ref(storage, name);
            const storageRef2 = ref(storage, name+'-medium');
            const storageRef3 = ref(storage, name+'-thumb');
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
          });
          //удаление в стейте

          this.mainStore.deleteCatalog( {
            tab: this.currentTab,
            info: this.mainStore.current.infoName,
            listName: 'diagramsList'
          })
          //напрямую изм стора
          // this.mainStore[this.mainStore.current.infoName].diagramsList = this.mainStore[this.mainStore.current.infoName].diagramsList.filter(item=>item.title!==this.currentTab)
          if(this.cTabs[this.cTabs.length-1]!==0){
            this.currentTab = this.cTabs[this.cTabs.length-1] ||'';//сдвинуть таб посл стр
          }
          updateFB( {
            path: 'diagramsList',
            data: this.cList
          });
          this.dialog = false
        }
      },
      tabClick(tab){
        this.currentTab = tab;
      },
      moveLeft(val,array){
        // console.log(val,array)
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

    },
    mounted() {
      this.currentTab = this.cTabs[0]
    },
    watch:{
      'mainStore.current.infoName':{
        handler(){
          this.currentTab = this.cTabs[0]
        },
        immediate:false,
      },
      'mainStore.beloeInfo.diagramsList.length':{
        handler(){
          this.currentTab = this.cTabs[0]
        },
        immediate:false,
      },
      currentTab:{
        handler(){
          this.isDiagramPanelOpen = false
          this.isCatalogPanelOpen = false
        },
        immediate:false,
      },
    },
  }
</script>

<style scoped>
  .tabsContainer{
    display: flex;
    justify-content: center;
    flex-flow:wrap;
    padding: 20px;
  }
  .tabItemDots{
    transform: rotate(90deg);
    margin-bottom:10px;
  }
  .tabItem{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:15px;
    margin-bottom:10px;
    font-size: 18px;
  }
  .tabItem.active{
    color: #F8CC2D!important;
    border-bottom: 1px solid #F8CC2D ;
    font-size: 20px;
  }
  .tabItem:hover{
    color: white;
    cursor: pointer;
  }
  .listContainer{
    display: flex;
    flex-flow:wrap;
    justify-content: space-evenly;
  }
  .panelContainer{
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .panel{
    /*width:200px;*/
    padding: 10px;
  }
  @media only screen and (max-width: 850px) {
    .input{
      margin-top: 20px;
    }

  }
</style>
