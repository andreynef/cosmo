import vClickOutside from "click-outside-vue3";
export default defineNuxtPlugin((nuxtApp) => {
  // console.log('plugin, click-outside-vue3')
  nuxtApp.vueApp.use(vClickOutside);
});
// router._routePreloaded.add(to);
// const promises = router._preloadPromises
