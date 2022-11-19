import { useMainStore } from '@/stores/mainStore'
import { useAuthStore } from '@/stores/authStore'

export const useStore = () => {
  const mainStore = useMainStore();
  const authStore = useAuthStore();
  return {
    mainStore,
    authStore,
  }
}
