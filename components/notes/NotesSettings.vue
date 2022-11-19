<template>
  <div class="card p10 mt10">
    <div class="fc mb20">
      <span :class="['item', { active: currentTab === 'Цвет'}]" class="hover" @click="currentTab = 'Цвет'">Цвет</span>
      <span :class="['item', { active: currentTab === 'font'}]" class="hover" @click="currentTab = 'font'">Шрифт</span>
      <span :class="['item', { active: currentTab === 'Picture'}]" class="hover" @click="currentTab = 'Picture'">Picture</span>
      <span :class="['item', { active: currentTab === 'Audio'}]" class="hover" @click="currentTab = 'Audio'">Audio</span>
      <span :class="['item', { active: currentTab === 'Pdf'}]" class="hover" @click="currentTab = 'Pdf'">Pdf</span>
      <span :class="['item', { active: currentTab === 'Rare data'}]" class="hover" @click="currentTab = 'Rare data'" v-if="authStore.user.mode==='redactor'">Rare data</span>
    </div>
    <section v-if="currentTab==='Цвет'" >
      <div class="colorTabsContainer">
        <div :class="['colorTabItem', { active: colorTab === item}]" class="hover" v-for="item in Object.keys(cService.colors)" :key="item" @click="colorTab=item">
          <color-input v-model="cService.colors[item]" position="top"/>
          <span class="ml10">{{item}}</span>
          <!--          <span :class="['colorExample',{ active: colorTab === item}]" :style="'background-color:'+cService.colors[item] "/>-->
        </div>
      </div>
      <div class="d-flex justify-space-around mb20 mt20">
        current color: {{mainStore.currentService.colors[colorTab]}}
      </div>
      <div class="d-flex justify-space-around mb20 mt20">
        <!--            <div-->
        <!--              v-model="pickedColor"-->
        <!--            ></div>-->
      </div>
      <button @click="updateSettings" class="myBtn cb px-3 mr20">save settings</button>
      <button @click="reset" class="myBtn cb px-3 mr20">reset</button>
    </section>
    <section v-if="currentTab==='font'">
      <ul>
        <li
          class="font hover"
          :class="[{ active: pickedFontFamily === item}]"
          v-for="item in cFonts"
          :key="item"
          @click="pickedFontFamily=item"
        >
          {{item}}
        </li>
      </ul>
      <input
        type="text"
        v-model="manualFontFamily"
        :placeholder="'либо свой'"
        class="tabInput pl5 "
      >
      <button @click="changeFontSize(-2)" class="ml20 myBtn cb px-3">-</button>
      {{cService.fontSize}}px
      <button @click="changeFontSize(2)" class="myBtn cb px-3 mr20">+</button>
      <br/>
      <button @click="updateSettings"  class="myBtn cb px-3 mr20">save settings</button>
      <button @click="reset"  class="myBtn cb px-3 mr20">reset</button>
    </section>
    <section v-if="currentTab==='Picture'">
      <div class="pictureInputContainer">
        <div class="pictureBlockLeft">
          <img :src="item.imgUrl||'/img/cosmo.png'" style="width:100%" alt="note image">
        </div>
        <div class="pictureBlockRight">
          <input
            type="file"
            @change="handleChangeFilePicture"
            class="inputPicLink myWhite"
          />
          <progress :value="progress" max="100" class="progress"></progress>
        </div>
      </div>
      <button @click="handleUploadFilePicture" class="myBtn cb px-3 mr20" :disabled="!file">upload picture</button>
      <br/>
      <div>
        <span class="fc">OR</span>
        <span>insert link (leave empty for template):</span>
        <input type="text" class="inputPicLink myWhite" v-model="item.imgUrl" placeholder="here" v-on:keyup.enter="(ev) => {ev.target.blur();updateLink()}">
        <button @click="updateLink" class="myBtn cb px-3 m10" >set link</button>
      </div>
    </section>
    <section v-if="currentTab==='Audio'">
      <input
        type="file"
        @change="handleChangeFile"
      />
      <progress :value="progress" max="100" class="progress"></progress>
      <button @click="handleUploadFileAudio"  class="myBtn cb px-3 m10" :disabled="!file">upload audio</button>
    </section>
    <section v-if="currentTab==='Rare data'">
      <textarea
        v-model="computedTextAreaValue"
        class="rareTextArea"
      />
      <div class="fc"><button @click="saveRare" class="saveBtn hoverNegative">Save manual fixes</button></div>
    </section>
    <section v-if="currentTab==='Pdf'">
      <input
        type="file"
        @change="handleChangeFile"
      />
      <!--          <v-progress-linear-->
      <!--            :model-value="progress"-->
      <!--            height="10"-->
      <!--            striped-->
      <!--            color="lime"-->
      <!--          ></v-progress-linear>-->
      <button @click="handleUploadFilePdf" class="myBtn cb px-3 mr20" :disabled="!file">upload file</button>
    </section>
  </div>
</template>

<script>
  import ColorInput from 'vue-color-input'
  import {getAuth} from "firebase/auth";
  import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
  import Resizer from "react-image-file-resizer";
  export default {
    props:['item','list','currTab','currSubTab'],
    setup() {
      const {mainStore, authStore} = useStore()
      return {mainStore, authStore}
    },
    components:{ColorInput},
    data(){
      return{
        settingTab:'',
        manualFontFamily:'',
        size:16,
        localObj:{},
        pickedColor:'',
        pickedFontFamily:'',
        colorTab:null,
        previousColor:null,
        initialFont:null,
        initialSettingsObj:{},
        url1:null,
        file:null,
        fileThumb:null,
        fileMedium:null,
        progress:null,
        downloadUrlArr:[],
        currentTab:'Цвет'
      }
    },
    computed:{
      cService(){
        if(this.mainStore.currentInfo && this.mainStore.currentService){
          return this.mainStore.currentService
        }else return {}
      },
      cNotesList(){
        if(this.mainStore.currentInfo && this.mainStore.currentInfo.notesList){
          return this.mainStore.currentInfo.notesList
        }else return []
        // if(this.list){
        //   return this.list
        // }else return []
      },
      cFonts(){
        return ['Roboto','Arial','Comic Sans MS','Georgia','Lucida Console','Lucida Sans Unicode','Microsoft Sans Serif','Tahoma','Trebuchet MS','Verdana']
      },
      computedTextAreaValue:{
        get() {
          return JSON.stringify(this.item)
        },
        set(value) {
          // console.log('set', value)
          this.localObj = JSON.parse(value)
        }
      },
    },
    methods:{
      updateSettings(){
        updateFB({
          path:'service',
          data:this.cService
        });
      },
      reset(){
        this.mainStore.setLvl({
          data:JSON.parse(JSON.stringify(this.initialSettingsObj)),//deep clone
          lvl1:'service',
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
      updateLink(){
        this.mainStore.showMsg( { text:'data set', type:'success'});
       updateFB({
          path:'notesList',
          data:this.cNotesList
        });
      },
      handleChangeFilePicture(e) {
        console.log(e.target.files[0].name)
        if (e.target.files[0]){
          this.url1 = URL.createObjectURL(e.target.files[0]);
          this.file = e.target.files[0];
          Resizer.imageFileResizer(
            e.target.files[0],
            50,
            50,
            'JPEG',
            50,
            0,// Is the degree of clockwise rotation to apply to uploaded image.
            uri => {// Is the callBack function of the resized new image URI.
              // console.log('afteraa:',uri)
              this.fileThumb=uri
            },
            'file',//blob,file,base64(default)
            20,
            20,);

          Resizer.imageFileResizer(
            e.target.files[0],
            500,
            500,
            'JPEG',
            50,
            0,// Is the degree of clockwise rotation to apply to uploaded image.
            uri => {// Is the callBack function of the resized new image URI.
              // console.log('afteraa:',uri)
              this.fileMedium=uri
            },
            'file',//blob,file,base64(default)
            20,
            20,);
        }
      },
      handleChangeFile(e) {
        console.log(e.target.files[0].name)
        if (e.target.files[0]){
          this.url1 = URL.createObjectURL(e.target.files[0]);
          this.file = e.target.files[0];
        }
      },
      handleUploadFileAudio(e){//комменты оригинал с firebase
        const storage = getStorage();
        // Create the file metadata
        const metadata = {
          contentType: 'audio/mpeg'
        };
        const user = getAuth().currentUser
        const root = this.mainStore.current.infoName==='public'?'public':user.email
        const storageRef = ref(storage, root + '/audio/' + this.currTab +'/' + this.currSubTab +'/'+ this.file.name);
        const uploadTask = uploadBytesResumable(storageRef, this.file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            this.progress=progress;
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/object-not-found':
                console.log('File doesn\'t exist')
                break;
              case 'storage/unauthorized':
                console.log('User doesn\'t have permission to access the object')
                break;
              case 'storage/canceled':
                console.log('User canceled the upload')
                break;
              case 'storage/unknown':
                console.log('Unknown error occurred, inspect the server response')
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const newList = this.cNotesList.map(item=>{
                if(item.title===this.currTab){
                  const newItems = item.items.map(item2=> {
                    if (item2.name === this.currSubTab) {
                      return {
                        ...item2,
                        tracks: [
                          {
                            name: this.currSubTab,
                            artist: this.currTab,
                            source: downloadURL,
                          },
                        ],
                        fileNameAudio: this.file.name
                      }
                    }else return item2
                  })
                  return {
                    ...item,
                    items:newItems
                  }
                }else return item
              })
              this.mainStore.setList({
                data:newList,
                listName:'notesList',
              })
              this.mainStore.showMsg( { text:'data set', type:'success'});
              updateFB({
                path:'notesList',
                data:this.cNotesList
              });
              this.mainStore.showMsgFB({text: 'audio uploaded', type:'success'});
            });
          }
        );
      },
      handleUploadFilePdf(e){
        const storage = getStorage();
        // Create the file metadata
        const metadata = {
          contentType: 'application/pdf'
        };
        const user = getAuth().currentUser
        const root = this.mainStore.current.infoName==='public'?'public':user.email
        const storageRef = ref(storage, root + '/pdf/' + this.currTab +'/' + this.currSubTab +'/'+ this.file.name);
        const uploadTask = uploadBytesResumable(storageRef, this.file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            this.progress=progress;
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/object-not-found':
                console.log('File doesn\'t exist')
                break;
              case 'storage/unauthorized':
                console.log('User doesn\'t have permission to access the object')
                break;
              case 'storage/canceled':
                console.log('User canceled the upload')
                break;
              case 'storage/unknown':
                console.log('Unknown error occurred, inspect the server response')
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const newList = this.cNotesList.map(item=>{
                if(item.title===this.currTab){
                  const newItems = item.items.map(item2=> {
                    if (item2.name === this.currSubTab) {
                      return {
                        ...item2,
                        fileUrl: downloadURL,
                        fileNamePdf: this.file.name
                      }
                    }else return item2
                  })
                  return {
                    ...item,
                    items:newItems
                  }
                }else return item
              })
              this.mainStore.setList({
                data:newList,
                listName:'notesList',
              })
              this.mainStore.showMsg( { text:'data set', type:'success'});
              updateFB({
                path:'notesList',
                data:this.cNotesList
              });
              this.mainStore.showMsgFB({text: 'audio uploaded', type:'success'});
            });
          }
        );
      },
      handleUploadFilePicture(e){
        const storage = getStorage();
        const metadata = {
          contentType: 'image/jpeg'
        };
        const root = this.mainStore.current.infoName==='public'?'public':this.authStore.user.email
        const storageRef = ref(storage, root + '/images/' + this.currTab +'/' + this.currSubTab +'/'+ this.file.name);
        const storageRefThumb = ref(storage, root + '/images/' + this.currTab +'/' + this.currSubTab +'/'+ 'thumb-' + this.file.name);
        const storageRefMedium = ref(storage, root + '/images/' + this.currTab +'/' + this.currSubTab +'/'+ 'medium-' + this.file.name);
        const uploadTask = uploadBytesResumable(storageRef, this.file, metadata);
        const uploadTaskThumb = uploadBytesResumable(storageRefThumb, this.fileThumb, metadata);
        const uploadTaskMedium = uploadBytesResumable(storageRefMedium, this.fileMedium, metadata);
        this.getDownloadURlAfterUpload(uploadTask)
        this.getDownloadURlAfterUpload(uploadTaskThumb)
        this.getDownloadURlAfterUpload(uploadTaskMedium)
      },
      getDownloadURlAfterUpload(name){
        name.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            // console.log('Upload is ' + progress + '% done');
            this.progress=(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/object-not-found':
                console.log('File doesn\'t exist')
                break;
              case 'storage/unauthorized':
                console.log('User doesn\'t have permission to access the object')
                break;
              case 'storage/canceled':
                console.log('User canceled the upload')
                break;
              case 'storage/unknown':
                console.log('Unknown error occurred, inspect the server response')
                break;
            }
          },
          () => {
            getDownloadURL(name.snapshot.ref).then((downloadURL) => {
              console.log('totalBytes',name.snapshot.totalBytes)
              const arr = this.downloadUrlArr
              arr.push({
                totalBytes:name.snapshot.totalBytes,
                url:downloadURL
              })
              if(arr.length===3){//сортировка на всякий, чтоб было по возрстанию размер файлов
                arr.sort(function (a, b) {
                  if (a.totalBytes > b.totalBytes) {
                    return 1;
                  }
                  if (a.totalBytes < b.totalBytes) {
                    return -1;
                  }
                  return 0;
                });
                this.saveRare('pics')
              }
            });
          }
        );
      },
      saveRare(what){
        if(this.computedTextAreaValue.length!==0){
          const newList = this.cNotesList.map(item=>{
            if(item.title===this.currTab){
              const newItems = item.items.map(item2=> {
                if (item2.name === this.currSubTab) {
                  if(what==='pics'){
                    return {
                      ...item2,
                      imgUrlThumb: this.downloadUrlArr[0].url,
                      imgUrlMedium: this.downloadUrlArr[1].url,
                      imgUrl: this.downloadUrlArr[2].url,
                      fileNameImg: this.file.name
                    }
                  }else return this.localObj
                }else return item2
              })
              return {
                ...item,
                items:newItems
              }
            }else return item
          })
          // console.log(newList)
          this.mainStore.setList({
            data:newList,
            listName:'notesList',
          })
          this.mainStore.showMsg( { text:'data set', type:'success'});
          this.mainStore.showMsgFB( { text:'data set', type:'success'});
          updateFB({path:'notesList', data:this.cNotesList});
        }
      },
    },
    beforeMount(){
      this.colorTab = Object.keys(this.mainStore.currentService.colors)[0]
      this.previousColor = this.mainStore.currentService.colors[this.colorTab]
      this.initialFont = this.mainStore.currentService.fontFamily
      this.initialSettingsObj = JSON.parse(JSON.stringify(this.cService));//deep clone
    },

    watch:{
      pickedColor: {
        handler(){
          this.mainStore.setLvl({
            data:this.pickedColor,
            lvl1:'service',
            lvl2:'colors',
            lvl3:this.colorTab
          })
        },
        immediate:false,
      },
      pickedFontFamily:{
        handler(){
          this.mainStore.setLvl({
            data:this.pickedFontFamily,
            lvl1:'service',
            lvl2:'fontFamily'
          })
        },
        immediate:false,
      },
      manualFontFamily:{
        handler(){
          this.mainStore.setLvl({
            data:this.manualFontFamily,
            lvl1:'service',
            lvl2:'fontFamily'
          })
        },
        immediate:false,
      },
    },
  };
</script>

<style scoped>
  .container{
    display: flex;
    /*justify-content: center;*/
    /*padding: 50px;*/
    font-size: 18px;
  }
  .item{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:15px;
  }
  .progress{
    width:300px;
    padding:3px;
    margin:10px 0;
  }

  .item.active{
    color: #F8CC2D!important;
    border-bottom: 1px solid #F8CC2D ;
  }
  .font{
    display: inline-block;
    margin-right: 20px;
  }

  .font.active{
    color: #F8CC2D!important;
  }

  .colorTabsContainer{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .colorTabItem{
    display: flex;
    justify-content: center;
    align-items: center;
    margin:5px;
  }
  .colorTabItem.active{
    color: #F8CC2D!important;
  }
  .colorExample{
    border:1px solid grey;
    width:20px;
    height:20px;
    margin-left:10px;
  }
  .colorExample.active{
    border:1px solid #F8CC2D!important;
  }

  .rareTextArea{
    /*position: absolute;*/
    /*top:55px;*/
    /*left:0;*/
    /*z-index: 5;*/
    background-color: rgba(0,0,0, 0.7);
    color: rgba(255, 255, 255, 0.8);
    width:95%;
    min-height: 50vh;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    list-style:none;
    /*font-size: 16px;*/
    font-family: "Courier New";
    margin: 10px 0;
  }
  .saveBtn{
    color: black;
    background-color: rgba(255, 255, 255, 0.2);
    width:100px;
    margin-top: 10px;
    margin-right: 20px;
    color:rgba(255, 255, 255, 0.9);
  }
  .saveBtn:hover{
    cursor: pointer;
    box-shadow: 0 0 3px rgba(255, 255, 255, 1);
  }
  .tabInput{
    background-color: transparent;
    border:1px solid rgba(255, 255, 255, 0.3);
    color:rgba(255, 255, 255, 0.9);
    margin: 20px 0;
  }
  .inputPicLink{
    border:1px solid grey;
    padding:5px;
    /*margin-left: 20px;*/
    width:100%;
  }
  .pictureInputContainer{
    display: flex;
    align-items: center;
  }
  .pictureBlockLeft{
    width: 70px;
    margin-right: 10px;
  }
  .pictureBlockRight{
    width:100%;
  }


  @media only screen and (max-width: 850px) { /* это будет показано при разрешении монитора до 930 пикселей */

  }

</style>
