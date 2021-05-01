import * as Readback from "../readback"
import * as Value from "../value"
import * as Neutral from "../neutral"
import * as Exp from "../exp"
import * as Ctx from "../ctx"
import * as Mod from "../mod"
import * as ut from "../../ut"
import * as Trace from "../../trace"


export function readback_data(
  mod: Mod.Mod,
  ctx: Ctx.Ctx,
  t: Value.Value,
  data: Value.data
): Exp.Exp {
  if (!Value.conversion(mod, ctx, Value.type, t, data.t))
    throw new Trace.Trace("t is not equivalent to data.t")

  let exp: Exp.Exp = Exp.dot(
    Exp.v(data.datacons.typecons.name),
    data.datacons.tag
  )
  let remain_t = data.datacons.t
  for (const arg of data.args) {
    const pi = Value.is_pi(mod, ctx, remain_t)
    exp = Exp.ap(exp, Readback.readback(mod, ctx, pi.arg_t, arg))
    remain_t = Value.Closure.apply(pi.ret_t_cl, arg)
  }

  return exp
}
