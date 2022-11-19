// https://fireship.io/lessons/nuxt-3-firebase/
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
// import { getDatabase } from 'firebase-admin/database';

// export const app = initializeApp({
//   credential: cert('./cosmo-n-firebase-adminsdk.json'),
// })
const apps = getApps()
if(!apps.length){
  initializeApp({
    credential: cert('./cosmo-n-firebase-adminsdk.json'),
  })
}
export const serverFirestore = getFirestore();
// export const serverDatabase = getDatabase();
