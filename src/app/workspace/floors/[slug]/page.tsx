import React from 'react'

type Props = { params: { slug: string } }

function Flour({ params }: Props) {
  return <div>{params.slug}</div>
}

export default Flour
