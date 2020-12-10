import { Evaluable, EvaluationMode } from "../../evaluable"
import { Exp } from "../../exp"
import { Repr } from "../../repr"
import * as Evaluate from "../../evaluate"
import * as Explain from "../../explain"
import * as Value from "../../value"
import * as Pattern from "../../pattern"
import * as Neutral from "../../neutral"
import * as Mod from "../../mod"
import * as Env from "../../env"
import * as Trace from "../../../trace"
import * as ut from "../../../ut"

export function cls_evaluable(
  sat: Array<{ name: string; t: Exp; exp: Exp }>,
  scope: Array<{ name: string; t: Exp }>
): Evaluable {
  return Evaluable({
    evaluability: ({ mod, env, mode, evaluator }) => {
      env = Env.clone(env)
      const sat = new Array()
      for (const entry of sat) {
        const name = entry.name
        const t = evaluator.evaluate(entry.t, { mod, env, mode })
        const value = evaluator.evaluate(entry.exp, { mod, env, mode })
        sat.push({ name, t, value })
        Env.update(env, name, value)
      }
      if (scope.length === 0) {
        return Value.cls(
          sat,
          Value.Telescope.create(mod, env, undefined, new Array())
        )
      } else {
        const [entry, ...tail] = scope
        const name = entry.name
        const t = evaluator.evaluate(entry.t, { mod, env, mode })
        return Value.cls(
          sat,
          Value.Telescope.create(mod, env, { name, t }, tail)
        )
      }
    },
  })
}