/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getServerSession, type NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import FacebookProvider from 'next-auth/providers/facebook'

import { type InputData, transformUserData } from 'utils/auth'
import { addIdentifier, creteNewUser, getUserByIdentifier } from './server'
import { cookies } from 'next/headers'

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_SECRET_ID!,
      profilePhotoSize: 648
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
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
    async signIn({ user, account }) {
      const session = await getServerSession(authOptions)
      // IF LOGEED
      if (session) {
        return await addIdentifier(account, user, session)
      }

      // IF NO LOGEED
      const cookieStore = cookies()
      const uDB = await getUserByIdentifier(user.id)
      if (!uDB) {
        // IF PROVIDER IS FACEBOOK
        if (account?.provider === 'facebook') {
          return '/?error=facebookNotProvider'
        }

        const userData = transformUserData(user as InputData)

        const newUser = await creteNewUser(userData)
        user.email = newUser.email
        user.name = newUser.names
        user.image = newUser.image
        user.id = newUser.identifiers[0]
        cookieStore.set('uft-ln', newUser.identifiers[0])
        return true
      }
      user.email = uDB.email
      user.name = uDB.names
      user.image = uDB.image
      user.id = uDB.identifiers[0]
      cookieStore.set('uft-ln', uDB.identifiers[0])
      return true
    },
    async session({ session, token }) {
      if (!token.sub) return session
      const _id = token.sub
      const uDB = await getUserByIdentifier(_id)
      if (!uDB) return session
      session.user = uDB
      return session
    }
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!
  }
}
