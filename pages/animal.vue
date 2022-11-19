<!--https://fireship.io/lessons/nuxt-3-firebase/-->
<template>
  <div>
    <h2>server</h2>
    <pre>{{ serverData }}</pre>
    <button class="b p5 m5" @click="updateAnimal">Update dog</button>
    <button class="b p5 m5" @click="updatePublic">updatePublic</button>
  </div>
</template>

<script setup>
  import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
  import {getDatabase, ref, update} from "firebase/database";

  // Server Side
  const { data:serverData } = useFetch('/api/animal');

  // Client Side
  onMounted(async() => {// с клиента подписаться на FB дабы отображать изменения
    const { clientFirestore } = useFirebase();
    const docRef = doc(clientFirestore, `animals`, 'dog');
    onSnapshot(docRef, (snap) => {
      serverData.value = snap.data();
    });
  });

  const updateAnimal = () => {
    const { clientFirestore } = useFirebase();
    const docRef = doc(clientFirestore, `animals`, 'dog');
    updateDoc(docRef, {
      dog1: `dog-${Math.floor(Math.random() * 10000)}`,
    });
    console.log('updata')
    // firestore()
    //   .collection('animals')
    //   .doc('dog')
    //   .set({value2: 'some value2'});
  }
  const updatePublic = async () => {
    try{
      const db = await getDatabase();
      const updates = {};
      updates[`/public/test`] = 'test nuxt from animalцhhhhhhhhhцц';
      console.log('updated')
      await update(ref(db), updates);
    }catch(error){
      console.log('catch error')
      throw error
    }
  }
</script>

