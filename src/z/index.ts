import { z } from 'zod'

export const TableCrearSchema = z.object({
  name: z.string(),
  type: z.enum(['table', 'pc']),
  chairs: z.number(),
  status: z.boolean(),
  ui: z.object({
    rotation: z.enum(['vertical', 'horizontal']),
    x: z.number(),
    y: z.number()
  }),
  accept_mutiple: z.boolean(),
  connected_to_printer: z.boolean()
})
