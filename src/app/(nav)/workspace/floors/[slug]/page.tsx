import { Floor } from 'components/workspace/floors/floor'
import { getFloor } from 'libs/server/floor'
import { notFound } from 'next/navigation'
import React from 'react'
import Set from './set'

type Props = { params: { slug: string } }

async function Flour({ params }: Props) {
  const floor = await getFloor(params.slug)
  if (!floor) notFound()
  return (
    <>
      <Set floor={{ ...floor, _id: floor._id.toString() }} />
      <Floor />
    </>
  )
}

export default Flour
