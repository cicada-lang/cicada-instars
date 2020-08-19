import * as Exp from "../exp"
import * as Env from "../env"
import * as Value from "../value"

export function do_ap(target: Value.Value, arg: Value.Value): Value.Value {
  switch (target.kind) {
    case "Value.fn": {
      const new_env = Env.extend(Env.clone(target.env), target.name, arg)
      return Exp.evaluate(new_env, target.body)
    }
    case "Value.reflection": {
      return {
        kind: "Value.reflection",
        neutral: {
          kind: "Neutral.ap",
          target: target.neutral,
          arg: arg,
        },
      }
    }
  }
}
