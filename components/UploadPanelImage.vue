<template>
  <div class="ffc">
    <div class="p20 card" v-if="mainStore.current.infoName==='beloeInfo' || authStore.user.mode==='redactor'">
      <div class="fc" >
        <input
          type="text"
          v-model="newNoteName"
          placeholder="название диаграммы"
          class="tabInput pl5 myWhite"
          style="border:1px solid rgba(255,255,255,0.2)"
          required
        >
      </div>
      <div style="width:100px; margin:20px auto 20px auto">
        <img :src="url1 || 'img/cosmo.png'" style="width:100%" alt="note image">
      </div>
      <input
        type="file"
        @change="handleChangeFile"
        style="border:1px solid rgba(255,255,255,0.2); background-color:#fff;color:black"
      />
      <!--    <v-progress-linear-->
      <!--      :model-value="progress"-->
      <!--      height="10"-->
      <!--      striped-->
      <!--      color="lime"-->
      <!--      style="width:300px"-->
      <!--    ></v-progress-linear>-->
      <button @click="handleUploadFilePicture" class="myBtn cb px-3 m20" :disabled="!file ||!newNoteName">add diagram</button>
    </div>
  </div>
  <section>

  </section>
</template>

<script>
  import generateRandomId from "~/helpers/generateRandomId";
  import Resizer from "react-image-file-resizer";
  import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
  export default {
    props:['path','listName', 'currTab' ,'list','isPanelOpen'],
    setup() {
      const {mainStore, authStore} = useStore()
      return {mainStore, authStore}
    },
    data(){
      return{
        newNoteName:null,
        itemName:null,
        progress:null,
        url1:null,
        file:null,
        fileThumb:null,
        fileMedium:null,
        downloadUrlArr:[],
      }
    },
    computed:{
    },
    methods:{
      handleChangeFile(e) {
        // console.log(e.target.files)
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
      handleUploadFilePicture(e){
        const storage = getStorage();
        const metadata = {
          contentType: 'image/jpeg'
        };
        const root = this.mainStore.current.infoName==='public'?'public':this.authStore.user.email
        const storageRef = ref(storage, root + `/${this.path}/${this.file.name}`);
        const storageRefMedium = ref(storage, root + `/${this.path}/${this.file.name}-medium`);
        const storageRefThumb = ref(storage, root + `/${this.path}/${this.file.name}-thumb`);
        const uploadTask = uploadBytesResumable(storageRef, this.file, metadata);
        const uploadTaskMedium = uploadBytesResumable(storageRefMedium, this.fileMedium, metadata);
        const uploadTaskThumb = uploadBytesResumable(storageRefThumb, this.fileThumb, metadata);
        this.getDownloadURlAfterUpload(uploadTask)
        this.getDownloadURlAfterUpload(uploadTaskMedium)
        this.getDownloadURlAfterUpload(uploadTaskThumb)
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
                this.addImage()
              }
            });
          }
        );
      },
      addImage() {
        const itemObj = {
          name:this.newNoteName,
          imgUrlThumb: this.downloadUrlArr[0].url,
          imgUrlMedium: this.downloadUrlArr[1].url,
          imgUrl: this.downloadUrlArr[2].url,
          fileName: this.file.name,
          id:generateRandomId(),
        }
        this.mainStore.addNote({
          itemObj,
          tab:this.currTab,
          listName:this.listName,
        })
        updateFB({
          path:this.listName,
          data:this.list
        });
        // this.resetState()
        this.$emit('update:isPanelOpen', false)// = this.resetState()
      },
      resetState() {
        this.file = null;
        this.url1 = null;
        this.newNoteName = null;
        this.progress = null;
        this.fileThumb = null;
        this.fileMedium = null;
        this.downloadUrlArr = [];
      },
    },
  }
</script>

<style scoped>

</style>
