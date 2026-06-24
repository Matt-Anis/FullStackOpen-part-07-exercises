import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  text: null,
  type: null,
  actions: {
    setNotification: (text, type) => {
      set({ text, type })
      setTimeout(() => {
        set({ text: null, type: null })
      }, 5000)
    },
  },
}))

export default useNotificationStore
export const { setNotification } = useNotificationStore.getState().actions
export const useNotification = () => {
  const text = useNotificationStore((state) => state.text)
  const type = useNotificationStore((state) => state.type)
  return { text, type }
}
