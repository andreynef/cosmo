<template>
  <section class="p20">
    <div class="frontContainer">
      <div class="symbolContainer">
        <div class="symbolIcon">
          <img style="width: 100%" alt="logo" src="/img/gradient-logo2.webp"/>
        </div>
      </div>

      <div class="titleContainer">
        <h1 class="title">
          <span>School of self-development</span>
          <span style="color:#F8CC2D">"White Mirror"</span>
        </h1>
        <div class="subTitle">Learn to manage energy, well-being and destiny.</div>
      </div>
    </div>

<!--    <div class="block">-->
<!--      <div class="blockImg">-->
<!--        <img alt="founder" src="/imgB/IMG_1462.webp" style="width:100%"/>-->
<!--      </div>-->
<!--      <div class="blockText">-->
<!--        <h2 class="blockTitle">About the school</h2>-->
<!--        <p style="text-align: center">Founder Valentin Voronin</p>-->
<!--        <p>We use Reiki, Cosmoenergetics, Qigong, Yogic and Taoist practices. All practices have their-->
<!--          certain functions and applications.</p>-->
<!--        <p>For instance, Cosmoenergy being one of the most effective and advanced-->
<!--          technologies in the world, allows subtle positive changes in a person and has been used for years in other types of practices.</p>-->
<!--        <p>Our practices help people realize their own vision of the world and themselves. It makes them understand that the distortions we hide-->
<!--          from ourselves are our problems and solutions at the same time. The importance lies not only in techniques, but in the person himself.-->
<!--          If he is aware and able to observe himself, then there will be true progress.</p>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="videoContainer">-->
<!--      <iframe style="margin:0 auto" width="560" height="315" src="https://www.youtube.com/embed/SYKV4vDlcSQ?start=20" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
<!--    </div>-->

<!--    <div class="fc mt20">-->
<!--      <router-link to="/about" style="text-decoration: none">-->
<!--        <v-btn size="x-large" color="yellow">-->
<!--          about-->
<!--        </v-btn>-->
<!--      </router-link>-->
<!--    </div>-->
    <div>
      <h2 style="font-size: 30px; text-align: center">School directions</h2>
      <p style=" text-align: center" >The school provides training and services in several areas:</p>
    </div>
    <div class="block" style="margin-top: 50px;">
      <div class="blockImg">
        <img alt="noroot" src="/imgB/noroot.webp" style="width:100%"/>
      </div>
      <div class="blockText">
        <h2 class="blockTitle">Cleansing sessions</h2>
        <p class="fc">Personal consultations and sessions to purify Your energy from Valentin Voronin</p>
      </div>
    </div>
    <div class="block reverse">
      <div class="blockImg">
        <img alt="retreats" src="/imgB/3.webp" style="width:100%"/>
      </div>
      <div class="blockText">
        <h2 class="blockTitle">Retreats</h2>
        <p class="fc">We conduct regular retreats in sacred places of power with training in cosmoenergetics,
          Reiki and other techniques of working with the energy body
        </p>
      </div>
    </div>
    <div class="block">
      <div class="blockImg">
        <img alt="cosmo" src="/imgB/1.webp" style="width:100%"/>
      </div>
      <div class="blockText">
        <h2 class="blockTitle">Cosmoenergy</h2>
        <p class="fc">Attunement to cosmoenergetics at seminars and retreats</p>
      </div>
    </div>
    <div class="block reverse">
      <div class="blockImg">
        <img alt="reiki" src="/imgB/4.webp" style="width:100%"/>
      </div>
      <div class="blockText">
        <h2 class="blockTitle">Reiki</h2>
        <p class="fc">Reiki level I,II,III online trainings and initiations</p>
      </div>
    </div>
    <div class="block">
      <div class="blockImg">
        <img alt="med" src="/imgB/3.jpeg" style="width:100%"/>
      </div>
      <div class="blockText">
        <h2 class="blockTitle">Meditations</h2>
        <p class="fc">Live online meditations 2 times a week on the Russian YouTube Channel and every Monday on the English YouTube channel</p>
      </div>
    </div>
    <div style="margin-top: 50px">
      <p style=" text-align: center">Don't know where to start?</p>
      <p style=" text-align: center">Start your training with the online course "New Power Transfers".!:
      </p>
      <div class="fc mt20">
        <router-link to="/service" style="text-decoration: none">
          <button class="b p5">
            service
          </button>
        </router-link>
      </div>
    </div>
    <div style="margin-top: 50px">
      <p style=" text-align: center">Any questions?</p>
      <p style=" text-align: center">We're ready to assist. Leave your contacts and our managers will contact you back shortly.</p>

      <form @submit.prevent="onSubmit">
        <!-- Email input -->
        <div class="mb-6">
          <input
            type="text"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="name"
            v-model="form.name"
          />
        </div>

        <!-- Password input -->
        <div class="mb-6">
          <input
            type="password"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="lastName"
            v-model="form.lastName"
          />
        </div>
        <!-- Password input -->
        <div class="mb-6">
          <input
            type="text"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="watsapp"
            v-model="form.watsapp"
          />
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          <span >send request</span>
        </button>
      </form>
    </div>

  </section>
</template>

<script>
  export default {
    data(){
      return{
        form:{
          name:'',
          lastName:'',
          watsapp:'',
        }
      }
    },
    methods:{
      toSubmit(){
        console.log('send request')
      }
    },
  }
</script>


<style scoped>
  .frontContainer{
    height:100vh;
  }
  .symbolContainer{
    padding-top:50px;
    display: flex;
    justify-content: center;
  }
  .symbolIcon{
    width:200px;
    animation: appear 2s ease-in-out;
    /*transform: scale(1.5);*/
    /*transform:translateX(-92%);*/
    /*transition:transform 3s;*/
  }
  .titleContainer{
    display: flex;
    flex-flow: column;
    align-items: center;
    /*padding: 150px 20px;*/
    margin-top:150px;
  }
  .title{
    font-size: 40px;
    display: flex;
    flex-flow: column;
    align-items: center;
  }
  .subTitle{
    font-size: 20px;
  }
  .videoContainer{
    display: flex;
    justify-content: center;
  }
  .block{
    display: flex;
    /*justify-content: space-between;*/
    margin-bottom: 20px;
  }
  .reverse{
    flex-flow: row-reverse;
  }
  .blockImg{
    width:50%;
  }
  .blockText{
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding:20px;
    width:50%;
  }
  .blockTitle{
    font-size: 36px;
    text-align: center;
  }
  @keyframes appear {
    from{
      opacity:0;
      transform: scale(2);
      /*transform: rotate(180deg) scale(1.5);*/
    }
    to {
      transform: scale(1);
      opacity:1;
    }
  }
  @media (max-width: 750px) {
    .block{
      /*display: flex;*/
      flex-flow: column;
      justify-content: space-between;
      align-items: center;
    }
    .blockImg{
      width:100%;
    }
    .blockText{
      display: flex;
      flex-flow: column;
      justify-content: center;
      padding:20px;
      width:100%;
    }
  }
  @media (max-width: 400px) {
    .titleContainer{
      padding: 20px;
    }
    .title{
      font-size: 24px;
    }
    .subTitle{
      font-size: 14px;
    }
    .block{
      justify-content: center;
    }
  }
</style>
