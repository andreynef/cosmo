import { defineStore } from 'pinia'
import {child, get, getDatabase, ref, update} from "firebase/database";
// import {useAuthStore} from "~/stores/authStore";
// import {getAuth} from "firebase/auth";
export const useMainStore = defineStore('mainStore', {
  state: () => ({
    public: {
      lastUpdate:'',
      notesList:[],
      diagramsList:[],
      service:null,
    },
    beloeInfo: {
      lastUpdate:'',
      notesList:[],
      diagramsList:[],
      diaryList:[],
      service:null,
    },
    defaultService:{
      colors:{
        layoutBgColor:'transparent',
        cardBgColor:'#514331',
        mainBgColor:'transparent',
        tabBgColor:'#514331',
        tabColorText:'rgba(255, 255, 255, 0.8)',
        textAreaBgColor:'#e7d3be',
        textAreaTextColor:'black',
        navbarBgColor:'#230f20',
        navbarTextColor:'rgba(255, 255, 255, 0.8)',
      },
      fontFamily: 'Calibri',
      fontSize: 16,
      fonUrl: '/img/space.jpg',
      cardBgUrl:'/img/cosmobg.jpg',
      mainBgUrl:'/img/space-triangle.webp',
    },
    current:{
      infoName:'public',
      // userSeenId:null,
      // userData:null,
    },
    usersShort: null,
    userData: null,
    is:{
      fullMode:false
    },
    msg:{
      fb:{
        text:'',
        type:'',
        isOpen:false
      },
      local:{
        text:'',
        type:'',
        isOpen:false
      }
    },
    isLoading:false,
    api:null,
    backupBeloeInfo:null,
    progress:null,
  }),
  getters: {
    currentInfo:(state)=>state[state.current.infoName],
    currentService:(state)=> {
      if(!state[state.current.infoName].service)  {
        return state.defaultService
      }else return state[state.current.infoName].service
    },
  },
  actions:{
    dor(state){
      console.log('dor')
    },
    showMsg({text,type}){
      this.msg.local.isOpen = true;
      this.msg.local.text = text;
      this.msg.local.type = type;
      setTimeout(() => {
        this.msg.local.isOpen = false
        this.msg.local.text = '';
        this.msg.local.type = '';
      }, 5000);
    },
    showMsgFB({text}){
      console.log( 'text',text)
      this.msg.fb.isOpen = true;
      this.msg.fb.text = text;
      setTimeout(() => {
        this.msg.fb.isOpen = false
        this.msg.fb.text = '';
      }, 3000);
    },
    testShit(comingShit){
      console.log(comingShit)
      this.public.lastUpdate = comingShit
      this.public.notesList = comingShit
      this.public.diagramsList = comingShit
    },
    async updatePublicFromStore(){
      try{
        const { clientDatabase } = useFirebase()
        const updates = {};
        updates[`/public/test`] = 'test nuxt from store';
        console.log('updated')
        update(ref(clientDatabase), updates);
      }catch(error){
        console.log('catch error')
        throw error
      }
    },
    async testFetch(){
      console.log('fetching start',this.api)
      await useFetch('https://reqres.in/api/users')
        .then(data => {
          console.log('data:',data)
          this.api=data.data
        })
        .catch(error => console.log(error.msg))
      // console.log('fetched',this.api)
    },
    doc(state){
      console.log('doc')
      // this.dispatch('updateFBRoot',{
      //   path:'usersShort',
      //   data: {
      //     P2xTySL3BpeYw2BwjSCIqZJXOtL2:{
      //       displayName:'Andrey',
      //       email:'andreynef@yandex.ru',
      //       isAdmin:true,
      //       id:'P2xTySL3BpeYw2BwjSCIqZJXOtL2'
      //     },
      //     L8GuxoqQkhXbWsplFVwDdttNLqB2:{
      //       displayName:'Konstantin',
      //       email:'nefkon@yandex.ru',
      //       isAdmin:false,
      //       id:'L8GuxoqQkhXbWsplFVwDdttNLqB2'
      //     },
      //     LVfGqswrVcUkR036guA0Y6vpfl42:{
      //       displayName:'Andrey',
      //       email:'andreynef@gmail.com',
      //       isAdmin:false,
      //       id:'LVfGqswrVcUkR036guA0Y6vpfl42'
      //     },
      //   }
      // });
    },
    setInfo({infoName,data} ){
      // console.log('setting info',infoName, data)
      this[infoName].lastUpdate = data?.lastUpdate||''
      this[infoName].notesList = data?.notesList||[]
      this[infoName].diagramsList = data?.diagramsList||[]
      this[infoName].diaryList = data?.diaryList||[]
      this[infoName].service = data.service || this.defaultService
      // this[infoName].service.fontFamily = data?.service?.fontFamily
      // this[infoName].service?.fontSize = data?.service?.fontSize
      // this[infoName].service?.fonUrl = data?.service?.fonUrl
      // this[infoName].service?.cardBgUrl = data?.service?.cardBgUrl
      // this[infoName].service?.mainBgUrl = data?.service?.mainBgUrl
      // this[infoName].service?.fontFamily = data?.service?.fontFamily
      // this[infoName].service?.fontFamily = data?.service?.fontFamily
      // this[infoName].service?.colors?.layoutBgColor = data?.service?.colors?.layoutBgColor
      // this[infoName].service?.colors?.cardBgColor = data?.service?.colors?.cardBgColor
      // this[infoName].service?.colors?.mainBgColor = data?.service?.colors?.mainBgColor
      // this[infoName].service?.colors?.tabBgColor = data?.service?.colors?.tabBgColor
      // this[infoName].service?.colors?.tabColorText = data?.service?.colors?.tabColorText
      // this[infoName].service?.colors?.textAreaBgColor = data?.service?.colors?.textAreaBgColor
      // this[infoName].service?.colors?.textAreaTextColor = data?.service?.colors?.textAreaTextColor
      // this[infoName].service?.colors?.navbarBgColor = data?.service?.colors?.navbarBgColor
    },
    resetBeloeInfo(){
      this.beloeInfo = {
        lastUpdate:'',
        notesList:[],
        diagramsList:[],
        diaryList:[],
        service:[]
        // service:{
        //   colors:{
        //     layoutBgColor:'#411B3CE6',
        //     cardBgColor:'#411B3CE6',
        //     mainBgColor:'rgba(0,0,0, 0.5)',
        //     tabBgColor:'#411B3CE6',
        //     tabColorText:'rgba(255, 255, 255, 0.8)',
        //     textAreaBgColor:'#E1BEE7',
        //     textAreaTextColor:'black',
        //     navbarBgColor:'#330041',
        //     navbarTextColor:'rgba(255, 255, 255, 0.8)',
        //   },
        //   fontFamily: 'Calibri',
        //   fontSize: 16,
        //   fonUrl: '/img/space.jpg',
        //   cardBgUrl:'/img/cosmobg.jpg',
        //   mainBgUrl:'/img/space-triangle.webp',
        // },
      }
    },
    setCurrentInfoName(infoName){
      this.current.infoName = infoName
    },
    copyPublicNotesToLocal({tabItem}){
      this.beloeInfo.notesList = [
        ...this.beloeInfo.notesList,
        tabItem
      ]
    },
    copyPublicDiagramsToLocal({tabItem}){
      this.beloeInfo.diagramsList = [
        ...this.beloeInfo.diagramsList,
        tabItem
      ]
    },
    markAsOnlyPicture({tab,subTab}) {
      this.beloeInfo.notesList = this.beloeInfo.notesList.map(item => {
        if(item.title===tab){
          return {
            ...item,
            items: item.items.map(item2=>{
              if(item2.name===subTab){
                return {
                  ...item2,
                  isOnlyPicture: !item2.isOnlyPicture
                }
              }else return item2
            })
          }
        }else return item
      })
    },
    setLvl({ data,lvl1,lvl2,lvl3,lvl4 }){
      if(lvl1 && lvl2 && lvl3 && lvl4){
        this[this.current.infoName][lvl1][lvl2][lvl3][lvl4] = data
      }
      if(lvl1 && lvl2 && lvl3 && !lvl4){
        this[this.current.infoName][lvl1][lvl2][lvl3] = data
      }
      if(lvl1 && lvl2 && !lvl3 && !lvl4){
        this[this.current.infoName][lvl1][lvl2]= data
      }
      if(lvl1 && !lvl2 && !lvl3 && !lvl4){
        this[this.current.infoName][lvl1]= data
      }
      if(!lvl1 && !lvl2 && !lvl3 && !lvl4){
        alert('no lvls')
      }
    },
    addNote({itemObj, tab, listName}){
      const tabObj = this[this.current.infoName][listName].find(item=>item.title === tab)
      if(!tabObj.items){
        tabObj.items = [itemObj]
      }else tabObj.items.push(itemObj)
    },
    deleteNote( {subTab,tab,listName}){
      const tabObj = this[this.current.infoName][listName].find(item=>item.title === tab)
      tabObj.items = tabObj.items.filter(item=>item.name!==subTab)
    },
    addCatalog({ item,listName }){
      console.log(item,listName)
      this[this.current.infoName][listName].push(item)
    },
    deleteCatalog( {tab,listName}){
      this[this.current.infoName][listName] = this[this.current.infoName][listName].filter(item=>item.title!==tab)
    },
    addDiaryItem( {itemObj}){
      if(this.beloeInfo.diaryList.length){
        this.beloeInfo.diaryList.unshift(itemObj)
      }else this.beloeInfo.diaryList = [itemObj]
    },
    deleteDiaryItem( {id}){
      this.beloeInfo.diaryList = this.beloeInfo.diaryList.filter(item=>item.id!==id)
    },
    addPlanItem( { item }) {
      this.beloeInfo.dailyPlanList.push(item)
    },
    deleteTableItem( {id}){
      this.beloeInfo.tableList = this.beloeInfo.tableList.filter(item=>item.id!==id)
    },
    setList({data,listName}){
      this[this.current.infoName][listName]= data;
    },
    addCosmoTableItem({itemObj}){
      this.beloeInfo.tableList.push(itemObj)
    },
    // setUsersShort(users){
    //   console.log('setting users short',users)
    //   this.usersShort = users
    // },
    setUserData(data){
      console.log('setting user data',data)
      this.current.userData = data
    },
  }
})






