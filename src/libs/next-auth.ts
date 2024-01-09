/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import { type InputData, transformUserData } from 'utils/auth'
import { creteNewUser, getUserById } from './server'
import { cookies } from 'next/headers'

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_SECRET_ID!,
      profilePhotoSize: 648
    })
  ],
  pages: {
    error: '/',
    newUser: '/',
    signIn: '/',
    signOut: '/'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user }) {
      const cookieStore = cookies()
      const uDB = await getUserById(user.id)
      if (!uDB) {
        const userData = transformUserData(user as InputData)
        const newUser = await creteNewUser(userData)
        user.email = newUser.email
        user.name = newUser.names
        user.image = newUser.image
        user.id = newUser._id
        cookieStore.set('user_id', newUser._id)
        return true
      }
      user.email = uDB.email
      user.name = uDB.names
      user.image = uDB.image
      user.id = uDB._id
      cookieStore.set('user_id', uDB._id)
      return true
    },
    async session({ session, token }) {
      if (!token.sub) return session
      const _id = token.sub
      const uDB = await getUserById(_id)
      if (!uDB) return session
      session.user = uDB
      return session
    }
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!
  }
}
