<template>
  <div class="flex h-screen w-full">
    <div class="m-auto">
      <section class="h-screen">
        <div class="container px-6 py-12 h-full">
          <form @submit.prevent="onSubmit">
            <!-- Name input -->
            <div class="mb-6" v-if="isRegister">
              <input
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Name/nickname"
                v-model="form.name"
              />
            </div>
            <!-- Email input -->
            <div class="mb-6">
              <input
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email address"
                v-model="form.email"
              />
            </div>

            <!-- Password input -->
            <div class="mb-6">
              <input
                type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Password"
                v-model="form.password"
              />
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-else-if="isRegister">Sign up</span>
              <span v-else>Sign in</span>
            </button>
            <p v-if="!isRegister">no account? <span class="register hover" @click="isRegister=true">register</span></p>
            <p v-if="!isRegister">forgot password? <span class="register hover" @click="sendResetPassword(form.email)">reset password</span></p>
            <p v-if="!isRegister">just wanna look around? <span class="register hover" @click="loginAsFake">login as fake user</span></p>
            <p v-if="isRegister"> <span class="hover" @click="isRegister=false">back to login</span></p>
          </form>
        </div>
      </section>
    </div>

  </div>
</template>

<script setup>
const {mainStore, authStore} = useStore()
const isLoading = ref(false);
const isRegister = ref(false);
const _error = ref(null);
const form = reactive({
  email: "",
  password: "",
  name:''
});

async function onSubmit() {
  if (isLoading.value) return;
  isLoading.value = true;
  if(isRegister.value){
    console.log('register')
    await createUser(form.email, form.password, form.name)
  }else {
    console.log('login')
    await loginFB(form.email, form.password)
  }
  isLoading.value = false;
}
async function loginAsFake() {
  if (isLoading.value) return;
  isLoading.value = true;
    console.log('login')
    await loginFB('aknef@yandex.ru', '111111')
  isLoading.value = false;
}
</script>
<script>
  export default {
    props:['isOpen'],
    data() {
      return {
        model:'switch to register',
        isRegisterForm:true,
        name: '',
        valid:false,
        password: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],

      };
    },
    methods: {
      // toSubmit(){
      //   this.$store.dispatch(
      //     this.model==='switch to login'?'register':'login',
      //     {
      //       email:this.email,
      //       password:this.password,
      //       name:this.name
      //     });
      //   this.$emit('update:isOpen',false)
      // },
      resetPassword(){
        if(this.email===''){
          return alert('enter email')
        }
        const ok = confirm('reset password?')
        if (ok) {
          this.$store.dispatch('resetPassword',{email:this.email})
        }
      },
    },
  };
</script>
<style scoped>
  .form{
    width:250px;
    height:100vh;
    padding:40px 10px 10px 10px;
  }
  .register {
    color:#e4c87e;
  }
  .register:hover {
    color: rgba(255, 255, 255, 0.7);
  }
  .loginBtn {
    border:none;
    /*width: 50px;*/
    /*height: 20px;*/
    background-color: #F8CC2D;
    border-radius: 5%;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
    padding:5px;
  }
  .loginBtn:hover {
    cursor: pointer;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
  }
  .input {
    background-color: rgba(255, 255, 255, 0.95);
  }
  .backLink{
    color: #F8CC2D;
    font-size: 12px;
    margin:0 auto;
  }
  .backLink:hover{
    cursor: pointer;
    border-bottom: 1px solid #F8CC2D;
  }
  @media only screen and (max-width: 768px) {

  }

</style>
