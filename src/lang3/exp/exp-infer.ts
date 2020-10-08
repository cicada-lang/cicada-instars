import * as Exp from "../exp"
import * as Stmt from "../stmt"
import * as Value from "../value"
import * as Closure from "../closure"
import * as Env from "../env"
import * as Ctx from "../ctx"
import * as Trace from "../../trace"
import * as ut from "../../ut"

export function infer(ctx: Ctx.Ctx, exp: Exp.Exp): Value.Value {
  try {
    if (exp.kind === "Exp.v") {
      const t = Ctx.lookup(ctx, exp.name)
      if (t === undefined) {
        throw new Trace.Trace(Exp.explain_name_undefined(exp.name))
      }
      return t
    } else if (exp.kind === "Exp.pi") {
      Exp.check(ctx, exp.arg_t, Value.type)
      const arg_t = Exp.evaluate(Ctx.to_env(ctx), exp.arg_t)
      ctx = Ctx.extend(ctx, exp.name, arg_t)
      Exp.check(ctx, exp.ret_t, Value.type)
      return Value.type
    } else if (exp.kind === "Exp.ap") {
      const target_t = Exp.infer(ctx, exp.target)
      const pi = Value.is_pi(ctx, target_t)
      Exp.check(ctx, exp.arg, pi.arg_t)
      const arg = Exp.evaluate(Ctx.to_env(ctx), exp.arg)
      return Closure.apply(pi.ret_t_cl, arg)
    } else if (exp.kind === "Exp.equal") {
      Exp.check(ctx, exp.t, Value.type)
      const t = Exp.evaluate(Ctx.to_env(ctx), exp.t)
      Exp.check(ctx, exp.from, t)
      Exp.check(ctx, exp.to, t)
      return Value.type
    } else if (exp.kind === "Exp.replace") {
      const target_t = Exp.infer(ctx, exp.target)
      const equal = Value.is_equal(ctx, target_t)
      const motive_t = Exp.evaluate(
        Env.update(Env.init(), "t", equal.t),
        Exp.pi("x", Exp.v("t"), Exp.type)
      )
      Exp.check(ctx, exp.motive, motive_t)
      const motive = Exp.evaluate(Ctx.to_env(ctx), exp.motive)
      Exp.check(ctx, exp.base, Exp.do_ap(motive, equal.from))
      return Exp.do_ap(motive, equal.to)
    } else if (exp.kind === "Exp.absurd") {
      return Value.type
    } else if (exp.kind === "Exp.absurd_ind") {
      // NOTE the `motive` here is not a function from target_t to type,
      //   but a element of type.
      // NOTE We should always infer target,
      //   but we do a simple check for the simple absurd.
      Exp.check(ctx, exp.target, Value.absurd)
      Exp.check(ctx, exp.motive, Value.type)
      const motive = Exp.evaluate(Ctx.to_env(ctx), exp.motive)
      return motive
    } else if (exp.kind === "Exp.str") {
      return Value.type
    } else if (exp.kind === "Exp.quote") {
      return Value.str
    } else if (exp.kind === "Exp.type") {
      return Value.type
    } else if (exp.kind === "Exp.suite") {
      const { stmts, ret } = exp
      ctx = Ctx.clone(ctx)
      for (const stmt of stmts) {
        Stmt.declare(ctx, stmt)
      }
      return Exp.infer(ctx, ret)
    } else if (exp.kind === "Exp.the") {
      Exp.check(ctx, exp.t, Value.type)
      const t = Exp.evaluate(Ctx.to_env(ctx), exp.t)
      Exp.check(ctx, exp.exp, t)
      return t
    } else {
      throw new Trace.Trace(
        "TODO"
        // ut.aline(`
        //   |I can not infer the type of ${Exp.repr(exp)}.
        //   |I suggest you add a type annotation to the expression.
        //   |`)
      )
    }
  } catch (error) {
    Trace.maybe_push(error, exp)
  }
}