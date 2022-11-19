<template>
  <section class="containerr pr">
    <div class="profileImg">
      <img :src="authStore.user.photoURL||'/img/user.png'" alt="photoImg" style="width:100%"/>
    </div>
    <div class="profileBody">
      <div>name:<input v-model.trim="name" type="text" :placeholder="authStore.user.displayName" class="wInput p5 m10"/></div>
      <div>photo:<input type="file" @change="handleChangeFile" class="wInput p5 m10"/></div>
      <span v-if="imgFile">file size: {{size}} Kb</span>
      <progress :value="mainStore.progress" max="100" class="progress"></progress>
      <button @click="submitCh" :disabled="!authStore.user.displayName&&!imgFile" class="myBtn cb px-3 w80">
        save
      </button>
      <span class="hover mt20 cy" @click="isFormOpen=!isFormOpen">change email or password?</span>
      <p @click="sendVerificationEmail" class="hover cy">sent verification email</p>
      <div v-if="isFormOpen">
        email:<input v-model.trim="form.email" type="text" :placeholder="authStore.user.email" class="wInput p5 m10"/>
        password:<input v-model.trim="form.password" type="text"  class="wInput p5 m10"/>
        <button @click="changeEmail(form.email)" class="myBtn cb px-3 w100">
          changeEmail
        </button>
        <button @click="changePassword(form.password)" class="myBtn cb px-3 w100 ml20">
          changePassw
        </button>
      </div>
    </div>
    <button @click="logoutFB()" class="logoutBtn fz16 w80">
      logout
    </button>
    <button @click="del()" class="delBtn cr">
      delete account
    </button>
  </section>
</template>

<script setup>
  const {mainStore, authStore} = useStore()
  const name = ref(null)
  const imgFile = ref(null)
  const isFormOpen = ref(false)
  const form = reactive({
    email: "",
    password: "",
  });
  const size = computed(()=>{
    return (imgFile?.value?.size/1024).toFixed(2)
  })
  function handleChangeFile(e) {
    if (e.target.files[0]){
      authStore.user.photoURL = URL.createObjectURL(e.target.files[0]);
      imgFile.value = e.target.files[0];
    }
  }
  function submitCh() {
    profileChange({name:name.value, imgFile:imgFile.value})
  }
  function del() {
    const ok = confirm('delete account permanently?')
    if (ok) {
      delUser()
    }
  }


</script>



<style scoped>
  .progress{
    width:250px;
    padding:3px;
    margin:10px 0;
  }
  .containerr{
    display: flex;
    align-items: center;
    /*flex-direction: column;*/
    font-size: 12px;
  }
  .profileImg{
    width:200px;
    border-radius: 50%;
    overflow: hidden;
    border:1px solid grey;
    margin-right: 20px;
  }
  .profileBody{
    display: flex;
    flex-flow: column;
  }
  .logoutBtn{
    position: absolute;
    top: 0;
    right: 0;
  }
  .delBtn{
    position: absolute;
    bottom: 0;
    right: 0;
  }
  @media only screen and (max-width: 768px) {

  }

</style>

