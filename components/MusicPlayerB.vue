<template>
  <section>
    <div class="wrapper">
      <div class="player">
        <div class="player__top">
          <div class="player-cover">
<!--            <transition-group :name="transitionName">-->
              <div class="player-cover__item"></div>
<!--            </transition-group>-->
          </div>
          <div class="player-controls">
            <div class="player-controls__item" @click="prevTrack" v-if="$route.matched[0].path!=='/cosmo'">
              <svg class="icon">
                <use xlink:href="#icon-prev"></use>
              </svg>
            </div>
            <div class="player-controls__item" @click="nextTrack" v-if="$route.matched[0].path!=='/cosmo'">
              <svg class="icon">
                <use xlink:href="#icon-next"></use>
              </svg>
            </div>
            <div class="player-controls__item -xl js-play" @click="play">
              <svg class="icon">
                <use xlink:href="#icon-pause" v-if="isTimerPlaying"></use>
                <use xlink:href="#icon-play" v-else></use>
              </svg>
            </div>
          </div>
        </div>
        <div class="progress" ref="progress">
          <div class="progress__top">
            <div class="album-info" v-if="currentTrack">
              <div class="album-info__name">{{ currentTrack.artist }}</div>
              <div class="album-info__track">{{ currentTrack.name }}</div>
            </div>
            <div class="progress__duration">{{ duration }}</div>
          </div>
          <div class="progress__bar" @click="clickProgress">
            <div class="progress__current" :style="{ width : barWidth }"></div>
          </div>
          <div class="progress__time">{{ currentTime }}</div>
        </div>
        <div v-cloak></div>
      </div>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" hidden xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-pause" viewBox="0 0 32 32">
          <title>icon-pause</title>
          <path d="M16 0.32c-8.64 0-15.68 7.040-15.68 15.68s7.040 15.68 15.68 15.68 15.68-7.040 15.68-15.68-7.040-15.68-15.68-15.68zM16 29.216c-7.296 0-13.216-5.92-13.216-13.216s5.92-13.216 13.216-13.216 13.216 5.92 13.216 13.216-5.92 13.216-13.216 13.216z"></path>
          <path d="M16 32c-8.832 0-16-7.168-16-16s7.168-16 16-16 16 7.168 16 16-7.168 16-16 16zM16 0.672c-8.448 0-15.328 6.88-15.328 15.328s6.88 15.328 15.328 15.328c8.448 0 15.328-6.88 15.328-15.328s-6.88-15.328-15.328-15.328zM16 29.568c-7.488 0-13.568-6.080-13.568-13.568s6.080-13.568 13.568-13.568c7.488 0 13.568 6.080 13.568 13.568s-6.080 13.568-13.568 13.568zM16 3.104c-7.104 0-12.896 5.792-12.896 12.896s5.792 12.896 12.896 12.896c7.104 0 12.896-5.792 12.896-12.896s-5.792-12.896-12.896-12.896z"></path>
          <path d="M12.16 22.336v0c-0.896 0-1.6-0.704-1.6-1.6v-9.472c0-0.896 0.704-1.6 1.6-1.6v0c0.896 0 1.6 0.704 1.6 1.6v9.504c0 0.864-0.704 1.568-1.6 1.568z"></path>
          <path d="M19.84 22.336v0c-0.896 0-1.6-0.704-1.6-1.6v-9.472c0-0.896 0.704-1.6 1.6-1.6v0c0.896 0 1.6 0.704 1.6 1.6v9.504c0 0.864-0.704 1.568-1.6 1.568z"></path>
        </symbol>
        <symbol id="icon-play" viewBox="0 0 32 32">
          <title>icon-play</title>
          <path d="M21.216 15.168l-7.616-5.088c-0.672-0.416-1.504 0.032-1.504 0.832v10.176c0 0.8 0.896 1.248 1.504 0.832l7.616-5.088c0.576-0.416 0.576-1.248 0-1.664z"></path>
          <path d="M13.056 22.4c-0.224 0-0.416-0.064-0.608-0.16-0.448-0.224-0.704-0.672-0.704-1.152v-10.176c0-0.48 0.256-0.928 0.672-1.152s0.928-0.224 1.344 0.064l7.616 5.088c0.384 0.256 0.608 0.672 0.608 1.088s-0.224 0.864-0.608 1.088l-7.616 5.088c-0.192 0.16-0.448 0.224-0.704 0.224zM13.056 10.272c-0.096 0-0.224 0.032-0.32 0.064-0.224 0.128-0.352 0.32-0.352 0.576v10.176c0 0.256 0.128 0.48 0.352 0.576 0.224 0.128 0.448 0.096 0.64-0.032l7.616-5.088c0.192-0.128 0.288-0.32 0.288-0.544s-0.096-0.416-0.288-0.544l-7.584-5.088c-0.096-0.064-0.224-0.096-0.352-0.096z"></path>
          <path d="M16 0.32c-8.64 0-15.68 7.040-15.68 15.68s7.040 15.68 15.68 15.68 15.68-7.040 15.68-15.68-7.040-15.68-15.68-15.68zM16 29.216c-7.296 0-13.216-5.92-13.216-13.216s5.92-13.216 13.216-13.216 13.216 5.92 13.216 13.216-5.92 13.216-13.216 13.216z"></path>
          <path d="M16 32c-8.832 0-16-7.168-16-16s7.168-16 16-16 16 7.168 16 16-7.168 16-16 16zM16 0.672c-8.448 0-15.328 6.88-15.328 15.328s6.88 15.328 15.328 15.328c8.448 0 15.328-6.88 15.328-15.328s-6.88-15.328-15.328-15.328zM16 29.568c-7.488 0-13.568-6.080-13.568-13.568s6.080-13.568 13.568-13.568c7.488 0 13.568 6.080 13.568 13.568s-6.080 13.568-13.568 13.568zM16 3.104c-7.104 0-12.896 5.792-12.896 12.896s5.792 12.896 12.896 12.896c7.104 0 12.896-5.792 12.896-12.896s-5.792-12.896-12.896-12.896z"></path>
        </symbol>
        <symbol id="icon-next" viewBox="0 0 32 32">
          <title>next</title>
          <path d="M2.304 18.304h14.688l-4.608 4.576c-0.864 0.864-0.864 2.336 0 3.232 0.864 0.864 2.336 0.864 3.232 0l8.448-8.48c0.864-0.864 0.864-2.336 0-3.232l-8.448-8.448c-0.448-0.448-1.056-0.672-1.632-0.672s-1.184 0.224-1.632 0.672c-0.864 0.864-0.864 2.336 0 3.232l4.64 4.576h-14.688c-1.248 0-2.304 0.992-2.304 2.272s1.024 2.272 2.304 2.272z"></path>
          <path d="M29.696 26.752c1.248 0 2.304-1.024 2.304-2.304v-16.928c0-1.248-1.024-2.304-2.304-2.304s-2.304 1.024-2.304 2.304v16.928c0.064 1.28 1.056 2.304 2.304 2.304z"></path>
        </symbol>
        <symbol id="icon-prev" viewBox="0 0 32 32">
          <title>prev</title>
          <path d="M29.696 13.696h-14.688l4.576-4.576c0.864-0.864 0.864-2.336 0-3.232-0.864-0.864-2.336-0.864-3.232 0l-8.448 8.48c-0.864 0.864-0.864 2.336 0 3.232l8.448 8.448c0.448 0.448 1.056 0.672 1.632 0.672s1.184-0.224 1.632-0.672c0.864-0.864 0.864-2.336 0-3.232l-4.608-4.576h14.688c1.248 0 2.304-1.024 2.304-2.304s-1.024-2.24-2.304-2.24z"></path>
          <path d="M2.304 5.248c-1.248 0-2.304 1.024-2.304 2.304v16.928c0 1.248 1.024 2.304 2.304 2.304s2.304-1.024 2.304-2.304v-16.928c-0.064-1.28-1.056-2.304-2.304-2.304z"></path>
        </symbol>
      </defs>
    </svg>

  </section>
</template>

<script>

  export default {
    props:['isOpen','tracks'],
    data() {
      return {
        audio: null,
        circleLeft: null,
        barWidth: null,
        duration: null,
        currentTime: null,
        isTimerPlaying: false,
        currentTrack: null,
        currentTrackIndex: 0,
        transitionName: null,
      };
    },
    methods: {
      play() {
        if (this.audio.paused) {
          this.audio.play();
          this.isTimerPlaying = true;
        } else {
          this.audio.pause();
          this.isTimerPlaying = false;
        }
      },
      generateTime() {
        let width = (100 / this.audio.duration) * this.audio.currentTime;
        this.barWidth = width + "%";
        this.circleLeft = width + "%";
        let durmin = Math.floor(this.audio.duration / 60);
        let dursec = Math.floor(this.audio.duration - durmin * 60);
        let curmin = Math.floor(this.audio.currentTime / 60);
        let cursec = Math.floor(this.audio.currentTime - curmin * 60);
        if (durmin < 10) {
          durmin = "0" + durmin;
        }
        if (dursec < 10) {
          dursec = "0" + dursec;
        }
        if (curmin < 10) {
          curmin = "0" + curmin;
        }
        if (cursec < 10) {
          cursec = "0" + cursec;
        }
        this.duration = durmin + ":" + dursec;
        this.currentTime = curmin + ":" + cursec;
      },
      updateBar(x) {
        let progress = this.$refs.progress;
        let maxduration = this.audio.duration;
        let position = x - progress.offsetLeft;
        let percentage = (100 * position) / progress.offsetWidth;
        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }
        this.barWidth = percentage + "%";
        this.circleLeft = percentage + "%";
        this.audio.currentTime = (maxduration * percentage) / 100;
        this.audio.play();
      },
      clickProgress(e) {
        this.isTimerPlaying = true;
        this.audio.pause();
        this.updateBar(e.pageX);
      },
      prevTrack() {
        this.transitionName = "scale-in";
        this.isShowCover = false;
        if (this.currentTrackIndex > 0) {
          this.currentTrackIndex--;
        } else {
          this.currentTrackIndex = this.tracks.length - 1;
        }
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
      },
      nextTrack() {
        this.transitionName = "scale-out";
        this.isShowCover = false;
        if (this.currentTrackIndex < this.tracks.length - 1) {
          this.currentTrackIndex++;
        } else {
          this.currentTrackIndex = 0;
        }
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
      },
      resetPlayer() {
        this.barWidth = 0;
        this.circleLeft = 0;
        this.audio.currentTime = 0;
        this.audio.src = this.currentTrack.source;
        setTimeout(() => {
          if(this.isTimerPlaying) {
            this.audio.play();
          } else {
            this.audio.pause();
          }
        }, 300);
      },
      favorite() {
        this.tracks[this.currentTrackIndex].favorited = !this.tracks[
          this.currentTrackIndex
          ].favorited;
      }
    },
    created() {
      let vm = this;
      this.currentTrack = this.tracks[0];
      this.audio = new Audio();
      this.audio.src = this.currentTrack.source;
      this.audio.ontimeupdate = function() {
        vm.generateTime();
      };
      this.audio.onloadedmetadata = function() {
        vm.generateTime();
      };
      this.audio.onended = function() {
        vm.nextTrack();
        this.isTimerPlaying = true;
      };

      // this is optional (for preload covers)
      // for (let index = 0; index < this.tracks.length; index++) {
      //   const element = this.tracks[index];
      //   let link = document.createElement('link');
      //   link.rel = "prefetch";
      //   link.href = element.cover;
      //   link.as = "image"
      //   document.head.appendChild(link)
      // }
    },
    beforeUnmount() {
      // alert('beforeUnmount')
      this.audio.pause();
      this.isTimerPlaying = false;
      this.$emit('update:isOpen',false)
    },

  }
</script>

<style scoped lang="scss">
  .body {
    font-family: "Bitter", serif;
  }

  .icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 700px), (max-height: 500px) {
      flex-wrap: wrap;
      flex-direction: column;
    }
  }
  .player {
    /*background: #eef3f7;*/
    background-color: rgba(0,0,0,0.5);
    width: 410px;
    min-height: 480px;
    box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
    border-radius: 15px;
    padding: 30px;
    @media screen and (max-width: 576px), (max-height: 500px) {
      width: 95%;
      padding: 20px;
      margin-top: 75px;
      min-height: initial;
      padding-bottom: 30px;
      max-width: 400px;
    }
    &__top {
      display: flex;
      align-items: flex-start;
      position: relative;
      z-index: 4;
      @media screen and (max-width: 576px), (max-height: 500px) {
        flex-wrap: wrap;
      }
    }

    &-cover {
      width: 300px;
      height: 300px;
      margin-left: -70px;
      flex-shrink: 0;
      position: relative;
      z-index: 2;
      border-radius: 15px;

      @media screen and (max-width: 576px), (max-height: 500px) {
        margin-top: -70px;
        margin-bottom: 25px;
        width: 290px;
        height: 230px;
        margin-left: auto;
        margin-right: auto;
      }

      &__item {
        background-image: url('/img/tape.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        background-color: transparent;
        width: 100%;
        height: 100%;
        border-radius: 15px;
        position: absolute;
        left: 0;
        top: 0;
        @media screen and (max-width: 576px), (max-height: 500px) {
          width: 80%;
          height: 80%;
          left: 0;
          top: 60px;
        }

        /*&:before {*/
        /*  content: "";*/
        /*  background: inherit;*/
        /*  width: 100%;*/
        /*  height: 100%;*/
        /*  box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);*/
        /*  display: block;*/
        /*  z-index: 1;*/
        /*  position: absolute;*/
        /*  top: 30px;*/
        /*  transform: scale(0.9);*/
        /*  filter: blur(10px);*/
        /*  opacity: 0.9;*/
        /*  border-radius: 15px;*/
        /*}*/

        /*&:after {*/
        /*  content: "";*/
        /*  background: inherit;*/
        /*  width: 100%;*/
        /*  height: 100%;*/
        /*  box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);*/
        /*  display: block;*/
        /*  z-index: 2;*/
        /*  position: absolute;*/
        /*  border-radius: 15px;*/
        /*}*/
      }

      &__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 15px;
        box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
        user-select: none;
        pointer-events: none;
      }
    }

    &-controls {
      flex: 1;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;

      @media screen and (max-width: 576px), (max-height: 500px) {
        flex-direction: row;
        padding-left: 0;
        width: 100%;
        flex: unset;
      }

      &__item {
        display: inline-flex;
        font-size: 30px;
        padding: 5px;
        margin-bottom: 10px;
        color: #acb8cc;
        cursor: pointer;
        width: 50px;
        height: 50px;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: all 0.3s ease-in-out;

        @media screen and (max-width: 576px), (max-height: 500px) {
          font-size: 26px;
          padding: 5px;
          margin-right: 10px;
          color: #acb8cc;
          cursor: pointer;
          width: 40px;
          height: 40px;
          margin-bottom: 0;
        }

        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #fff;
          transform: scale(0.5);
          opacity: 0;
          box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
          transition: all 0.3s ease-in-out;
          transition: all 0.4s cubic-bezier(0.35, 0.57, 0.13, 0.88);
        }

        @media screen and (min-width: 500px) {
          &:hover {
            color: #532ab9;

            &::before {
              opacity: 1;
              transform: scale(1.3);
            }
          }
        }

        @media screen and (max-width: 576px), (max-height: 500px) {
          &:active {
            color: #532ab9;

            &::before {
              opacity: 1;
              transform: scale(1.3);
            }
          }
        }

        .icon {
          position: relative;
          z-index: 2;
        }

        &.-xl {
          margin-bottom: 0;
          font-size: 95px;
          filter: drop-shadow(0 11px 6px rgba(172, 184, 204, 0.45));
          color: #fff;
          width: auto;
          height: auto;
          display: inline-flex;
          @media screen and (max-width: 576px), (max-height: 500px) {
            margin-left: auto;
            font-size: 75px;
            margin-right: 0;
          }
          &:before {
            display: none;
          }
        }

        &.-favorite {
          &.active {
            color: red;
          }
        }
      }
    }
  }
  [v-cloak] {
    display: none;
  }
  [v-cloak] > * {
    display: none;
  }
  .progress {
    width: 100%;
    margin-top: -15px;
    user-select: none;
    &__top {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }

    &__duration {
      color: #71829e;
      font-weight: 700;
      font-size: 20px;
      opacity: 0.5;
    }
    &__time {
      margin-top: 2px;
      color: #71829e;
      font-weight: 700;
      font-size: 16px;
      opacity: 0.7;
    }
  }
  .progress__bar {
    height: 6px;
    width: 100%;
    cursor: pointer;
    background-color: #d0d8e6;
    display: inline-block;
    border-radius: 10px;
  }
  .progress__current {
    height: inherit;
    width: 0%;
    background-color: #a3b3ce;
    border-radius: 10px;
  }

  .album-info {
    color: #71829e;
    flex: 1;
    padding-right: 60px;
    user-select: none;

    @media screen and (max-width: 576px), (max-height: 500px)  {
      padding-right: 30px;
    }

    &__name {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 12px;
      line-height: 1.3em;
      @media screen and (max-width: 576px), (max-height: 500px) {
        font-size: 18px;
        margin-bottom: 9px;
      }
    }
    &__track {
      font-weight: 400;
      font-size: 20px;
      opacity: 0.7;
      line-height: 1.3em;
      min-height: 52px;
      @media screen and (max-width: 576px), (max-height: 500px)  {
        font-size: 18px;
        min-height: 50px;
      }
    }
  }

  .scale-out-enter-active {
    transition: all .35s ease-in-out;
  }
  .scale-out-leave-active {
    transition: all .35s ease-in-out;
  }
  .scale-out-enter {
    transform: scale(.55);
    pointer-events: none;
    opacity: 0;
  }
  .scale-out-leave-to {
    transform: scale(1.2);
    pointer-events: none;
    opacity: 0;
  }



  .scale-in-enter-active {
    transition: all .35s ease-in-out;
  }
  .scale-in-leave-active {
    transition: all .35s ease-in-out;
  }
  .scale-in-enter {
    transform: scale(1.2);
    pointer-events: none;
    opacity: 0;
  }
  .scale-in-leave-to {
    transform: scale(.55);
    pointer-events: none;
    opacity: 0;
  }

</style>
