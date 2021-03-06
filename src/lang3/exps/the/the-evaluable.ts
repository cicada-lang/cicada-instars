import { Evaluable } from "../../evaluable"
import { evaluate } from "../../evaluate"
import { Exp } from "../../exp"

export const the_evaluable = (t: Exp, exp: Exp) =>
  Evaluable({
    evaluability: ({ mod, env, mode }) => evaluate(exp, { mod, env, mode }),
  })
