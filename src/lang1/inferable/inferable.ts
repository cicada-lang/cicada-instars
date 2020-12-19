import { Ctx } from "../ctx"
import { Ty } from "../ty"

export type Inferable = {
  inferability: (the: { ctx: Ctx }) => Ty
}

export function Inferable(the: {
  inferability: (the: { ctx: Ctx }) => Ty
}): Inferable {
  return the
}
