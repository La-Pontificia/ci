'use client'

import { type NewTypeFloor, useFloor } from 'stores'

type Props = {
  floor: NewTypeFloor
}

function Set({ floor }: Props) {
  const set = useFloor((store) => store.setFloor)
  set(floor)
  return null
}

export default Set
