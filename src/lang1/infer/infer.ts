import * as Infer from "../infer"
import * as Explain from "../explain"
import * as Evaluate from "../evaluate"
import * as Check from "../check"
import * as Exp from "../exp"
import * as Stmt from "../stmt"
import * as Ctx from "../ctx"
import * as Ty from "../ty"
import * as Trace from "../../trace"
import * as ut from "../../ut"

export function infer(ctx: Ctx.Ctx, exp: Exp.Exp): Ty.Ty {
  try {
    if (exp.kind === "Exp.v") {
      return exp.inferability({ ctx })
    }
    if (exp.kind === "Exp.ap") {
      return exp.inferability({ ctx })
    }
    if (exp.kind === "Exp.begin") {
      return exp.inferability({ ctx })
    }
    if (exp.kind === "Exp.rec") {
      return exp.inferability({ ctx })
    }
    if (exp.kind === "Exp.the") {
      return exp.inferability({ ctx })
    }
    throw new Trace.Trace(
      ut.aline(`
        |I can not infer the type of ${exp.repr()}.
        |I suggest you add a type annotation to the expression.
        |`)
    )
  } catch (error) {
    if (error instanceof Trace.Trace) {
      throw Trace.trail(error, exp)
    }
    throw error
  }
}
