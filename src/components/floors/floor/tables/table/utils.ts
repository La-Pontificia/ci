import { type NewTypeTable } from 'stores/tables/tables.store'

type ReturnSize = {
  size: [number, number]
  chairs: [number[], number[], number[], number[]]
}
export function getUI(t: NewTypeTable): ReturnSize {
  let size: ReturnSize['size'] = [0, 0]
  let chairs: ReturnSize['chairs'] = [[], [], [], []]

  const isH = t.ui.rotation === 'horizontal'

  if (t.chairs === 1) {
    size = [70, 70]
    chairs = [[...Array(0)], [...Array(0)], [...Array(0)], [...Array(0)]]
  }
  if (t.chairs === 4) {
    size = [110, 110]
    chairs = [[...Array(1)], [...Array(1)], [...Array(1)], [...Array(1)]]
  }
  if (t.chairs === 6) {
    size = isH ? [160, 110] : [110, 160]
    chairs = isH
      ? [[...Array(3)], [...Array(0)], [...Array(0)], [...Array(3)]]
      : [[...Array(0)], [...Array(3)], [...Array(3)], [...Array(0)]]
  }
  if (t.chairs === 8) {
    size = isH ? [200, 110] : [110, 200]
    chairs = isH
      ? [[...Array(4)], [...Array(0)], [...Array(0)], [...Array(4)]]
      : [[...Array(0)], [...Array(4)], [...Array(4)], [...Array(0)]]
  }
  if (t.chairs === 12) {
    size = isH ? [280, 110] : [110, 280]
    chairs = isH
      ? [[...Array(6)], [...Array(0)], [...Array(0)], [...Array(6)]]
      : [[...Array(0)], [...Array(6)], [...Array(6)], [...Array(0)]]
  }

  return {
    chairs,
    size
  }
}
