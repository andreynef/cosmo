import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

const apps = getApps()
if(apps.length){
  initializeApp({
    credential: cert('./cosmo-n-firebase-adminsdk.json'),
  })
}

export default defineEventHandler (async (event) =>{
  const db = getFirestore()
  const productsSnap = await db.collection('products').get()
  const productsData = productsSnap.docs.map(doc=>{
    return {
      uuid: doc.id,
      ...doc.data()
    }
  })
  return productsData
})
// OR др синтаксис через 'then'

// export default getFirestore().collection("products").get().then((snapshot) => {
//     const data = snapshot.docs.map((doc) => ({
//       uuid: doc.id,
//       ...doc.data(),
//     }));
//     console.log("All data in 'books' collection", data);
//     // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]
//   });


// export default defineEventHandler(async event => {
//   const ref = firestore.doc(`animals/dog`);
//   const snapshot = await ref.get();
//   const data = snapshot.data();
//   return data;
// })

