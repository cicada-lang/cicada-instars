import { Exp } from "../../exp"
import { Evaluable } from "../../evaluable"
import { evaluate } from "../../evaluate"
import * as Explain from "../../explain"
import * as Value from "../../value"
import * as Neutral from "../../neutral"
import * as Trace from "../../../trace"

export const car_evaluable = (target: Exp) =>
  Evaluable({
    evaluability: ({ env }) => do_car(evaluate(env, target)),
  })

export function do_car(target: Value.Value): Value.Value {
  if (target.kind === "Value.cons") {
    return target.car
  } else if (target.kind === "Value.not_yet") {
    if (target.t.kind === "Value.sigma") {
      return Value.not_yet(target.t.car_t, Neutral.car(target.neutral))
    } else {
      throw new Trace.Trace(
        Explain.explain_elim_target_type_mismatch({
          elim: "car",
          expecting: ["Value.sigma"],
          reality: target.t.kind,
        })
      )
    }
  } else {
    throw new Trace.Trace(
      Explain.explain_elim_target_mismatch({
        elim: "car",
        expecting: ["Value.cons", "Value.not_yet"],
        reality: target.kind,
      })
    )
  }
}
