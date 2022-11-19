// https://fireship.io/lessons/nuxt-3-firebase/
import { serverFirestore } from '../utils/firebase';

export default defineEventHandler(async (event) => {
  const ref = serverFirestore.collection('animals').doc(`dog`);
  const snapshot = await ref.get();
  const data = snapshot.data();
  return data;
})

