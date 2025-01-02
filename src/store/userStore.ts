import { User } from '@prisma/client'
import { create } from 'zustand'
import { api } from '@/lib/api'


type UserStore = {
  users: User[] | null
  isLoading: boolean
  load: () => Promise<void>
  
}

export const userStore = create<UserStore>((set) => ({
  // States
  users: null,
  isLoading: false,

  // functions
  load: async () => {
    set({ isLoading: true })
    try {
      const response = await api('/user')
      const allUsers: User[] = await response.json()

      set({
        users: allUsers,
        isLoading: false,
      })
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  },
}))
