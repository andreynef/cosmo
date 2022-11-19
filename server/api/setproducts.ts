// import { getFirestore } from 'firebase-admin/firestore';
// import { initializeApp, getApps, cert } from 'firebase-admin/app';
//
// const apps = getApps()
// if(apps.length){
//   initializeApp({
//     credential: cert('./cosmo-n-firebase-adminsdk.json'),
//   })
// }
//
//
// export default async (request,response) =>{
//   getFirestore()
//     .collection('admin')
//     .doc('users2')
//     .set({value2: 'some value2'});
// }

// export default defineEventHandler(async event => {
//   const ref = firestore.doc(`animals/dog`);
//   const snapshot = await ref.get();
//   const data = snapshot.data();
//   return data;
// })

