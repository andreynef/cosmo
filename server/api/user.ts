// import { clientDatabase } from '../../composables/useFirebase';
import { getAuth } from 'firebase/auth';
// import { useMainStore } from '@/stores/mainStore'
// import { useAuthStore } from '@/stores/authStore'
// const mainStore = useMainStore()
// const authStore = useAuthStore()
//

export default defineEventHandler( (event) => {
  console.log('api user...')
  const user = getAuth().currentUser
  return user
})




