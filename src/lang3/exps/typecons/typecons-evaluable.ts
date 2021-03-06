import { Evaluable } from "../../evaluable"
import { evaluate } from "../../evaluate"
import { Exp } from "../../exp"
import * as Value from "../../value"

export const typecons_evaluable = (
  name: string,
  t: Exp,
  sums: Array<{ tag: string; t: Exp }>
) =>
  Evaluable({
    evaluability: ({ mod, env, mode }) =>
      Value.typecons(
        name,
        evaluate(t, { mod, env, mode }),
        Value.DelayedSums.create(sums, mod, env)
      ),
  })
