import { getFloor } from 'libs/server'
import React from 'react'
import Set from './set'
import { Floor } from 'components/floors/floor'

type Props = { params: { slug: string } }
export async function Fetch({ params }: Props) {
  const floor = await getFloor(params.slug)
  if (floor) {
    return (
      <>
        <Set floor={{ ...floor, _id: floor._id.toString() }} />
        <Floor />
      </>
    )
  }
}
