/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import FacebookProvider from 'next-auth/providers/facebook'

import { type InputData, transformUserData } from 'utils/auth'
import {
  creteNewUser,
  getUserByEmail,
  getUserByIdentifier,
  updateUser
} from './server'
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
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      // const session = await getServerSession(authOptions)
      // // IF LOGEED
      // if (session) {
      //   return await addIdentifier(account, user, session)
      // }

      // IF NO LOGEED
      const cookieStore = cookies()
      let uDB = await getUserByIdentifier(user.id)
      const emailExisted = await getUserByEmail(user.email)

      if (!uDB && emailExisted) {
        await updateUser({ identifiers: [user.id] }, emailExisted._id)
        uDB = emailExisted
      }
      if (!uDB && !emailExisted) {
        // IF PROVIDER IS FACEBOOK
        // if (account?.provider === 'facebook') {
        //   return '/?error=facebookNotProvider'
        // }
        const userData = transformUserData(user as InputData)
        const newUser = await creteNewUser(userData)
        user.email = newUser.email
        user.name = newUser.names
        user.image = newUser.image
        user.id = newUser.identifiers[0]
        cookieStore.set('uft-ln', newUser.identifiers[0])
        return true
      }

      const email = user.email ?? emailExisted?.email
      const names = user.name ?? emailExisted?.names
      const image = user.image ?? emailExisted?.image
      const id = user.id
      user.email = email
      user.name = names
      user.image = image
      user.id = id

      cookieStore.set('uft-ln', id)
      return true
    },
    async session({ session, token }) {
      const account = await getUserByIdentifier(token.sub!)
      session.account = account
      return session
    }
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!
  }
}
