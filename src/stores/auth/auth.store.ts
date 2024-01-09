import { type User } from 'types'
import { create, type StateCreator } from 'zustand'

interface AuthState {
  session: User | null
  setSession: (session: User | null) => void
}

const StoreApi: StateCreator<AuthState> = (set) => ({
  session: null,
  setSession: (session) => set(() => ({ session }))
})

export const useAuth = create(StoreApi)
