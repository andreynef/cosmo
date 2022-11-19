<template>
  <div>
    <img :src="mainStore.currentService.fonUrl" style="width:250px">
    <div>
      <span>общий фон:</span>
      <input type="text" class="fonUrlInput" v-model="mainStore.currentService.fonUrl" placeholder="here" v-on:keyup.enter="(ev) => {ev.target.blur();updateService()}">
    </div>
    <br/>
    <img :src="mainStore.currentService.cardBgUrl" style="width:250px" >
    <div>
      <span>фон центральной колонки:</span>
      <input type="text" class="fonUrlInput" v-model="mainStore.currentService.cardBgUrl" placeholder="here" v-on:keyup.enter="(ev) => {ev.target.blur();updateService()}">
    </div>
    <div class="colorsContainer">
      <div :class="['colorItem', { active: colorTab === item}]" class="hover" v-for="item in Object.keys(mainStore.currentService.colors)" :key="item" @click="colorTab=item">
        <ColorInput v-model="mainStore.currentService.colors[item]" position="top"/>
        <span class="ml10">{{item}}</span>
        <!--          <span :class="['colorExample',{ active: colorTab === item}]" :style="'background-color:'+cService.colors[item] "/>-->
      </div>
    </div>
    <div class="fc fz20">
      current color:  {{mainStore.currentService.colors[colorTab]}}
    </div>
    <button @click="updateService" class="myBtn cb px-3" :disabled="isPublic && !isRedactor">save</button>
    <button @click="reset" class="myBtn cb px-3 ml20" :disabled="isPublic && !isRedactor">reset colors</button>
  </div>
</template>

<script setup>
  const {mainStore, authStore} = useStore()
  import ColorInput from "vue-color-input"
  let colorTab = ref('')
  const prevColorsSet = ref({})
  const isPublic = computed(() => mainStore?.current?.infoName==='public');
  const isRedactor = computed(() => authStore?.user?.mode==='redactor');
  // const cService = computed(() => mainStore?.currentInfo?.service ||{});
  function reset(){
    mainStore.currentService.colors = prevColorsSet.value
  }
  function updateService(){
    updateFB({
      path:'service',
      data:mainStore.currentService
    });
  }
  onMounted(()=>{
    colorTab.value = Object.keys(mainStore.currentService.colors)[0]
    prevColorsSet.value = JSON.parse(JSON.stringify(mainStore.currentService.colors)) //deep clone
  })
</script>



<style scoped>
  .colorsContainer{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
  }
  .colorItem{
    margin-bottom: 20px;
    margin-right: 20px;
    padding:10px;
    display: flex;
    align-items: center;
  }
  .colorItem.active{
    color: #F8CC2D!important;
  }
  .fonUrlInput{
    border:1px solid grey;
    padding:5px;
    margin-left: 20px;
    width:700px;
  }
</style>

