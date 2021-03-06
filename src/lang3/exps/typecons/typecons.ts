import { Exp } from "../../exp"
import { typecons_evaluable } from "./typecons-evaluable"
import { typecons_inferable } from "./typecons-inferable"

export type Typecons = Exp & {
  kind: "Exp.typecons"
  name: string
  t: Exp
  sums: Array<{ tag: string; t: Exp }>
}

export function Typecons(
  name: string,
  t: Exp,
  sums: Array<{ tag: string; t: Exp }>
): Typecons {
  return {
    kind: "Exp.typecons",
    name,
    t,
    sums,
    ...typecons_evaluable(name, t, sums),
    ...typecons_inferable(name, t, sums),
    repr: () => name,
    alpha_repr: (opts) => {
      // NOTE datatype can only be at top level.
      return name
    },
  }
}
