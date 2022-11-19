// https://fireship.io/lessons/nuxt-3-firebase/
// https://www.youtube.com/watch?v=NoJa7FKqmhU&ab_channel=RazorCXTechnologies
import {child, get, getDatabase, ref, update} from "firebase/database";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  updateEmail,
  updatePassword
} from "firebase/auth";
import {deleteObject, getDownloadURL, getStorage, uploadBytesResumable} from "firebase/storage";
import {ref as refOfStorage} from "firebase/storage";
import { useStore } from "./useStore";

// export const useFirebase = () => {
//   const firebaseConfig  = useRuntimeConfig().public.fbConfig
//   const firebaseApp = initializeApp(firebaseConfig);
//   const clientFirestore = getFirestore(firebaseApp);
//   const clientDatabase = getDatabase(firebaseApp);
//
//   return {
//     firebaseApp,
//     clientFirestore,
//     clientDatabase,
//   }
// }


export const initUser = async()=>{
  const auth = getAuth();
  const {mainStore, authStore} = useStore()
  // mainStore.isLoading=true
  // const userCookie = useCookie('userCookie')
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
      authStore.setUser(user ? user : null)
      fetchInfo('public')
      fetchInfo('beloeInfo')
      mainStore.current.infoName='beloeInfo'
      // userCookie.value = user
      // return user
    } else {
      // User is signed out
      // ...
      // fetchInfo('public')
      // mainStore.$reset()
      // authStore.$reset()
      // mainStore.showMsg({text:'not logged in', type:'error'})
      navigateTo('/')
    }
  });

}

export const user = async()=>{
  const auth = await getAuth();
  return auth.currentUser;
}


export const updateUserShort = async({id,obj})=>{
  const {mainStore, authStore} = useStore()
  console.log('id,obj',id,obj)
  const db = getDatabase();
  const updates = {};
  updates[`/usersShort/${id}`] = obj;
  await update(ref(db), updates);
  await mainStore.showMsg({text:'admin set',type:'success'});
}

export const createUser = async(email, password, name)=>{
  const {mainStore, authStore} = useStore()
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('user:', user)
      const userWithName = {...user, displayName: name}
      authStore.setUser(user?userWithName:null)
      updateProfile(auth.currentUser, {
        displayName: name,
      })
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('Email verification sent!')
          mainStore.showMsg({text:'Email verification sent!',type:'success'});
        });
      const db = getDatabase();
      const updates = {};
      updates[`/usersShort/${user.uid}`] = {
        displayName:name,
        email:user.email,
        id:user.uid
      };
      update(ref(db), updates);
      // useRouter().push('/')
      navigateTo('/')
      mainStore.showMsg({text:'new user is registered',type:'success'});
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorMessage',errorMessage)
      mainStore.showMsg({text:errorMessage,type:'error'});
      // ..
    });

}

export const sendVerificationEmail = ()=> {
  const auth = getAuth();
  const {mainStore, authStore} = useStore()
  sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log('Email verification sent!')
      mainStore.showMsg({text:'Email verification sent!',type:'success'});
    });
}
export const loginFB = async (email,password)=>{
  const auth = getAuth();
  const {mainStore, authStore} = useStore()
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      // const user = userCredential.user;
      // authStore.setUser(user);
      // fetchInfo('beloeInfo')
      // mainStore.current.infoName= 'beloeInfo'
      navigateTo('/')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      mainStore.showMsg({ text:errorMessage, type:'error'});
    });
}

export const logoutFB = ()=>{
  const {mainStore, authStore} = useStore()
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    // mainStore.resetBeloeInfo()
    // mainStore.current.infoName = 'public'
    mainStore.$reset()
    authStore.$reset()
    localStorage.removeItem('beloeInfo');
    // await useRouter().push('/')
    navigateTo('/')
    // mainStore.showMsg({text:'logged out',type:'success'});
  }).catch((error) => {
    // An error happened.
    // mainStore.showMsg({text:'logged out',type:'success'});
  });
    // await getAuth().signOut()
    // await commit('clearAllInfo')
    //зачистка не все под ноль а как будто приходят пустые данные, иначе все ломается
}

export const delUser = async()=>{
  const auth = getAuth();
  const {mainStore, authStore} = useStore()
  const user = auth.currentUser;
  deleteUser(user).then(() => {
    // User deleted.
    const db =  getDatabase();
    const updates = {};
    updates[`/users/${user.uid}`] = [];
    updates[`usersShort/${user.uid}`] = []
    // console.log('updates',updates)
    update(ref(db), updates);
    mainStore.current.infoName = 'public'
    mainStore.$reset()
    authStore.$reset()
    localStorage.removeItem('beloeInfo');
    // useRouter().push('/')
    navigateTo('/')
    mainStore.showMsg({text:'account deleted',type:'success'});
  }).catch((error) => {
    // An error ocurred
    mainStore.showMsg({text:error.message,type:'error'});
  });
}

export const resetPassword = async(email)=>{
  const auth = getAuth();
  const {mainStore, authStore} = useStore()
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  await mainStore.showMsg({text:'email sent',type:'success'});
}

export const changeEmail = async(email)=>{
  const {mainStore, authStore} = useStore()
  const auth = getAuth();
  updateEmail(auth.currentUser, email).then(() => {
    // Email updated!
    mainStore.showMsg({text:'email changed successfully',type:'success'});
  }).catch((error) => {
    // An error occurred
    mainStore.showMsg({text:error,type:'error'});
  });
}
export const changePassword = async(newPassword)=>{
  const {mainStore, authStore} = useStore()
  const auth = getAuth();
  const user = auth.currentUser;

  updatePassword(user, newPassword).then(() => {
    // Update successful.
    mainStore.showMsg({text:'password changed successfully',type:'success'});
  }).catch((error) => {
    // An error ocurred
    mainStore.showMsg({text:error,type:'error'});
  });
}

export const sendResetPassword = async(email)=>{
  const {mainStore, authStore} = useStore()
  console.log('email',email)
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      mainStore.showMsg({text:'Password reset email sent!',type:'success'});
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      mainStore.showMsg({text:error.message,type:'error'});
    });
}
export const fetchInfo = async (infoName)=>{
  const {mainStore, authStore} = useStore()
  const userId = authStore.user.id
  mainStore.isLoading = true
  console.log('fetching',infoName)
  const dbRef = ref(getDatabase());

  const path = infoName === 'beloeInfo'?`users/${userId}/${infoName}`:infoName === 'public'?infoName:null//let path итд не гуд ибо async
    await get(child(dbRef, path + '/lastUpdate')).then((snapshot) => {
      if(//если есть в локале и без изменений
        snapshot.exists()&&
        localStorage.getItem(infoName) &&
        JSON.parse(localStorage.getItem(infoName)).lastUpdate &&
        JSON.parse(localStorage.getItem(infoName)).lastUpdate === snapshot.val()
      ){
        // return JSON.parse(localStorage.getItem(infoName))
        console.log('setting '+ infoName +' from local...')
        mainStore.setInfo({infoName:infoName, data:JSON.parse(localStorage.getItem(infoName))})
        mainStore.isLoading = false
      }else {//если нету локала или есть изменения
        get(child(dbRef, path)).then((snapshot) => {
          if (snapshot.exists()) {
            // console.log(snapshot.val())
            // return snapshot.val()
            mainStore.setInfo({infoName:infoName, data:snapshot.val()})
            localStorage.setItem(infoName, JSON.stringify(snapshot.val()));
            mainStore.isLoading = false
          } else {
            console.log(infoName + ' doesnt exist')
            return false
            // mainStore.setInfo({infoName:infoName, data:snapshot.val()})
            // localStorage.setItem(infoName, JSON.stringify(snapshot.val()));
            mainStore.isLoading = false
          }
        }).catch((error) => {
          console.error(error);
          mainStore.isLoading = false
        });
      }
    }).catch((error) => {
      console.error(error);
      mainStore.isLoading = false
    });
}

export const loadUsersShort = async ()=>{
  console.log('fetching shorts')
  const {mainStore, authStore} = useStore()
  const dbRef = ref(getDatabase());
  await get(child(dbRef, 'usersShort')).then((snapshot) => {
    if (snapshot.exists()) {
      mainStore.usersShort = snapshot.val()
      // console.log(snapshot.val())
    } else {
      console.log('short doesnt exist')
    }
  }).catch((error) => {
    console.error(error);
  });

}

export const loadUserData = async (id)=>{
    const {mainStore, authStore} = useStore()
    console.log('fetching user data')
  try{
    const dbRef = ref(getDatabase());
    console.log('path', 'users/'+id)
    await get(child(dbRef, 'users/'+id)).then((snapshot) => {
      if (snapshot.exists()) {
        mainStore.userData = snapshot.val()
        mainStore.beloeInfo.service = mainStore.userData.beloeInfo.service
        // console.log(snapshot.val())
      } else {
        console.log('user data doesnt exist')
        mainStore.userData = null
        mainStore.showMsg({text:'user data doesnt exist',type:'error'});
      }
    }).catch((error) => {
      console.error(error);
    });
  }catch(error){
    mainStore.showMsg({text:'retrieving failed', type:'error'});
    throw error
  }
}


  export const updateFB = async ({path, data})=>{
  console.log('update',path, data)
  const {mainStore, authStore} = useStore()
  try{
    const uid = authStore.user.id
    // const uid = getters.current.userSeenId?getters.current.userSeenId:state.user.id

    const db = await getDatabase();
    const updates = {};
    if(mainStore.current.infoName==='public'){
      updates['/public/'+path] = data;
      updates[`/public/lastUpdate`] = new Date().toLocaleString('en-US');
      localStorage.setItem('public',
        JSON.stringify({
          ...mainStore.public,
          lastUpdate:new Date().toLocaleString('en-US')
        })
      );
    }else {
      updates[`/users/${uid}/beloeInfo/` + path] = data;
      updates[`/users/${uid}/beloeInfo/lastUpdate`] = new Date().toLocaleString('en-US');
      localStorage.setItem('beloeInfo',
        JSON.stringify({
          ...mainStore.beloeInfo,
          lastUpdate:new Date().toLocaleString('en-US')
        })
      );
    }
    // console.log('updates',updates)
    await update(ref(db), updates);
    mainStore.showMsgFB({text: 'updated',type:'success'});
  }catch(error){
    console.log('ass:',error)
    mainStore.showMsg({text:' update failed:' + error,type:'error'});
    throw error
  }
}
export const updateFbRoot = async ({path, data})=>{
  const {mainStore, authStore} = useStore()
  try{
    const db = await getDatabase();
    const updates = {};
    updates[`/`+ path] = data;
    // console.log('updates',updates)
    await update(ref(db), updates);
    mainStore.showMsg({text: 'updated'});
  }catch(error){
    mainStore.showMsg({text:' update failed:' + error,type:'error'});
    throw error
  }
}

export const profileChange=async({name, imgFile})=>{//комменты оригинал с firebase
  const {mainStore, authStore} = useStore()
  const auth = getAuth();

  //only displayName
  if(name && !imgFile){
    console.log('profile only name to:',name)
    updateProfile(auth.currentUser, {
      displayName: name,
    }).then(() => {
      authStore.setUser({...auth.currentUser,
        displayName: name,
      })
      const db = getDatabase();
      const updates = {};
      updates[`/usersShort/${authStore.user.id}`] = {
        email:authStore.user.email,
        id:authStore.user.id,
        displayName:name,
      };
      update(ref(db), updates);

      mainStore.showMsg({text:'Profile updated', type:'success'})
    }).catch((error) => {
      mainStore.showMsg({text:'An error occurred '+error, type:'error'})
    });
    return
  }
  //displayName + photoImg
  const storage = getStorage();
  // Create the file metadata
  const metadata = {
    contentType: 'image/jpeg'
  };
  // Upload file and metadata to the object 'images/mountains.jpg'
  const user = auth.currentUser
  const storageRef = refOfStorage(storage, user.email + '/images/' + imgFile.name);
  const uploadTask = uploadBytesResumable(storageRef, imgFile, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      mainStore.progress=progress;
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          console.log('File doesn\'t exist')
          break;
        case 'storage/unauthorized':
          console.log('User doesn\'t have permission to access the object')
          break;
        case 'storage/canceled':
          console.log('User canceled the upload')
          break;
        case 'storage/unknown':
          console.log('Unknown error occurred, inspect the server response')
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log('File available at', downloadURL);
        // console.log('auth.currentUser', auth.currentUser);
        updateProfile(auth.currentUser, {
          displayName: name || authStore.user.displayName,
          photoURL: downloadURL,
        }).then(() => {
          // Profile updated!
          // console.log(' user',auth.currentUser);
          authStore.setUser({
            ...auth.currentUser,
            displayName: name || authStore.user.displayName,
            photoURL: downloadURL,
          })
          const db = getDatabase();
          const updates = {};
          updates[`/usersShort/${authStore.user.id}`] = {
            email:authStore.user.email,
            id:authStore.user.id,
            displayName:name || authStore.user.displayName,
            photoURL: downloadURL,
          };
          update(ref(db), updates);
          mainStore.showMsg({text:'Profile updated', type:'success'})
        }).catch((error) => {
          // An error occurred
          // console.log('An error occurred');
          mainStore.showMsg({text:'An error occurred '+error, type:'error'})
        });
      });
    }
  );
}

