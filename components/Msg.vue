<template>
    <Transition name="slide-fade">
      <div class="popupItem" v-if="mainStore.msg.local.isOpen">
        <div class="flex flex-col justify-center" v-if="mainStore.msg.local.type==='success'">
          <div class="bg-green-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
            <div class="bg-green-700 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-green-400 rounded-t-lg">
              <p class="font-bold text-white flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                </svg>
                {{mainStore.msg.local.type}}</p>
            </div>
            <div class="p-3 bg-green-700 rounded-b-lg break-words text-white">
              {{mainStore.msg.local.text}}
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center" v-if="mainStore.msg.local.type==='error'">
          <div class="bg-red-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
            <div class="red flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-red-400 rounded-t-lg">
              <p class="font-bold text-white flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                </svg>
                {{mainStore.msg.local.type}}</p>
            </div>
            <div class="p-3 bg-red-700 rounded-b-lg break-words text-white">
              {{mainStore.msg.local.text}}
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center" v-if="mainStore.msg.local.type==='warning'">
          <div class="bg-yellow-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
            <div class="yellow flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-yellow-400 rounded-t-lg">
              <p class="font-bold text-white flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                </svg>
                {{mainStore.msg.local.type}}</p>
            </div>
            <div class="p-3 bg-yellow-700 rounded-b-lg break-words text-white">
              {{mainStore.msg.local.text}}
            </div>
          </div>
        </div>
      </div>
    </Transition>
<!--  <div class="popupItem">ehggwgkwgkggegwhwgwej</div>-->
</template>
<script setup>
  const {mainStore} = useStore()
</script>

<style scoped>
  .popupItem {
    position: fixed;
    top:72px;
    right:0;
    left:0;
    z-index: 1000;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateY(-20px);
    opacity: 0;
  }

</style>
