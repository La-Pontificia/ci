import axios from 'axios'
import { Button } from 'commons/button'
import { usePending } from 'hooks/usePending'
import { FacebookIcon } from 'icons'
import { signIn } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useAuth } from 'stores'

function Facebook() {
  const user = useAuth((store) => store.session)
  if (!user) return null
  const { end, isPending, start } = usePending(!!user.facebook_id)
  const [facebookInfo, setFacebookInfo] = useState<{
    facebook_id: string
    email: string
    name: string
    url: string
  } | null>(null)
  const connectToFacebook = async () => {
    start()
    await signIn('facebook')
  }

  useEffect(() => {
    const getDataFacebook = async () => {
      if (!user.facebook_id) return

      try {
        const { data } = await axios.get(
          `https://graph.facebook.com/${user.facebook_id}?fields=id,name,email,picture&access_token=${user.access_token_facebook}`
        )
        setFacebookInfo({
          facebook_id: data.id,
          email: data.email,
          name: data.name,
          url: data.picture.data.url
        })
      } catch (error) {
        console.log(error)
      } finally {
        end()
      }
    }
    void getDataFacebook()
  }, [])

  if (user.facebook_id) {
    return (
      <div
        aria-hidden={isPending}
        className="aria-hidden:opacity-0 transition-all text-sm flex items-center gap-2"
      >
        <FacebookIcon className="w-6 text-blue-600 rounded-full" />
        <h2 className="leading-5">{facebookInfo?.name}</h2>
      </div>
    )
  }

  return (
    <Button
      loading={isPending}
      onClick={connectToFacebook}
      className="flex items-center h-10 gap-2 justify-center"
      variant="secondary"
    >
      <FacebookIcon className="w-6 text-blue-500" />
      Conectar con facebook
    </Button>
  )
}

export default Facebook
