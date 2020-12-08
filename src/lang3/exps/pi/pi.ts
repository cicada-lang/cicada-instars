import { Evaluable, EvaluationMode } from "../../evaluable"
import { Exp, repr } from "../../exp"
import { Repr } from "../../repr"
import * as Evaluate from "../../evaluate"
import * as Explain from "../../explain"
import * as Value from "../../value"
import * as Pattern from "../../pattern"
import * as Neutral from "../../neutral"
import * as Mod from "../../mod"
import * as Env from "../../env"
import * as Trace from "../../../trace"

export type Pi = Evaluable &
  Repr & {
    kind: "Exp.pi"
    name: string
    arg_t: Exp
    ret_t: Exp
  }

export function Pi(name: string, arg_t: Exp, ret_t: Exp): Pi {
  return {
    kind: "Exp.pi",
    name,
    arg_t,
    ret_t,
    evaluability: ({ mod, env, mode, evaluator }) =>
      Value.pi(
        evaluator.evaluate(arg_t, { mod, env, mode }),
        Value.Closure.create(mod, env, Pattern.v(name), ret_t)
      ),
    repr: () => `(${name}: ${repr(arg_t)}) -> ${repr(ret_t)}`,
  }
}
