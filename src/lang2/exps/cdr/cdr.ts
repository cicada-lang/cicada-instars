import { Exp } from "../../exp"
import { Inferable } from "../../inferable"
import { infer } from "../../infer"
import { evaluate } from "../../evaluate"
import * as Value from "../../value"
import * as Ctx from "../../ctx"
import { do_car } from "../car"
import { cdr_evaluable } from "./cdr-evaluable"

export type Cdr = Exp & {
  kind: "Cdr"
  target: Exp
}

export function Cdr(target: Exp): Cdr {
  return {
    kind: "Cdr",
    target,
    ...cdr_evaluable(target),
    ...Inferable({
      inferability: ({ ctx }) => {
        const target_t = infer(ctx, target)
        const sigma = Value.is_sigma(ctx, target_t)
        const car = do_car(evaluate(Ctx.to_env(ctx), target))
        return Value.Closure.apply(sigma.cdr_t_cl, car)
      },
    }),
    repr: () => `cdr(${target.repr()})`,
    alpha_repr: (opts) => `cdr(${target.alpha_repr(opts)})`,
  }
}
