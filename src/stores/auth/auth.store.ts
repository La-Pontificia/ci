import { type User } from 'types'
import { create, type StateCreator } from 'zustand'

export interface NewTypeUser extends Omit<User, '_id'> {
  _id: string
}

interface AuthState {
  session: NewTypeUser | null
  setSession: (session: NewTypeUser | null) => void
}

const StoreApi: StateCreator<AuthState> = (set) => ({
  session: null,
  setSession: (session) => set(() => ({ session }))
})

export const useAuth = create(StoreApi)
