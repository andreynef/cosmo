<template>
    <footer class="footerContainer myWhite" :style="cStyle">
      <div class="part1">
        <div class="logoContainer">
          <img style="width:100%" alt="logosmall" src="/img/Logo_White_Mirror_small.png"/>
        </div>
        <div class="textContainer">
          <div class="iconItem">
            <a class="wa contactsIcons" href="https://wa.me/+6281338729588" target="_blank"
               rel="noopener noreferrer"/>
            <span>+6281338729588</span>
          </div>
          <div class="iconItem">
            <a class="email contactsIcons" title="info@beloezerkalo.ru" href="mailto:info@beloezerkalo.ru"/>
            <span>info@beloezerkalo.ru</span>
          </div>
        </div>

        <div class="iconsContainer">
          <span class="mr10">click to chat</span>
          <a class="wa contactsIcons" href="https://wa.me/+6281338729588" target="_blank"
             rel="noopener noreferrer"/>
          <a class="tg contactsIcons" href="https://telegram.me/Nefedjev" target="_blank"
             rel="noopener noreferrer"/>
        </div>
      </div>
      <div class="part2">
        <small class="tradermark">&copy; Beloe Zerkalo 2022 (<router-link tag="a" to="/service" style="color: rgba(255,255,255,0.8)">Public offer</router-link>)</small>
      </div>
    </footer>
</template>

<script>
  import {defineComponent} from "vue";

  export default defineComponent( {
    name:'FooterB',
    data: () => ({
    }),
    computed:{
      cStyle() {
        if(this.$store.getters.currentInfo ) {
          return 'background-color:' + this.$store.getters.currentInfo.service.colors.navbarBgColor
        }
      },
    }
  })
</script>

<style scoped>
  .footerContainer {
    /*margin-top: 3em;*/
    padding: 20px;
    /*color: rgba(255, 255, 255, 0.8);*/
    /*display: flex;*/
    /*text-align: center;*/
    /*justify-content: space-between;*/
  }
  .part1 {
    /*margin-top: 3em;*/
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    text-align: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .part2 {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .footerText:first-child {
    margin-right: 20px;
  }

  .footerLink:link {
    color: white;
  }

  .footerLink:visited {
    color: white;
  }
  .logoContainer{
    width:200px;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
  .textContainer {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: center;
    padding:20px;
  }
  .iconsContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  .tradermark{
    margin:0 auto;
  }
  .iconItem{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin:0 10px 10px 0;
  }

  .contactsIcons {
    height: 32px;
    width: 32px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 10px;
    transition: .2s;
    background-size: cover;
    opacity: 0.5;
  }

  .contactsIcons:hover {
    opacity: 1;
    transition: .2s;
  }

  .phoneNumber {
    /*background-image: url('/public/img/svg/telephone-phone-svgrepo-com (1).svg');*/
    composes: contactsIcons;
  }

  .email {
    /*background-image: url('/public/img/svg/at.svg');*/
    composes: contactsIcons;
    /*animation: rotate 5s infinite linear;*/
  }



  .wa {
    /*background-image: url('/public/img/svg/whatsapp.svg');*/
    composes: contactsIcons;
  }


  .tg {
    /*background-image: url('/public/img/svg/telegram.svg');*/
    composes: contactsIcons;
  }



  @keyframes rotate {
    from{
    }
    to {
      transform: rotate(360deg);
    }
  }
  @media (max-width: 750px) {
    .part1{
      /*margin-top: 3em;*/
      /*padding: 0 20px;*/
      /*color: rgba(255, 255, 255, 0.8);*/
      /*display: flex;*/
      /*text-align: center;*/
      justify-content: center;
    }
    .header {
      flex-direction: column-reverse;
    }
    .headerInner {
      margin-left:unset;
    }
  }

  @media (max-width: 480px) {
    .footerText {
      display: block;
    }

    .footerText:first-child {
      margin-right: 0;
      margin-bottom: 5px;
    }
  }

</style>

