import * as Stmt from "../stmt"
import * as Env from "../env"
import * as Ctx from "../ctx"
import * as Evaluate from "../evaluate"
import * as Readback from "../readback"
import * as Infer from "../infer"

export function run(
  ctx: Ctx.Ctx,
  env: Env.Env,
  stmts: Array<Stmt.Stmt>
): string {
  let output = ""
  for (const stmt of stmts) {
    Stmt.declare(ctx, stmt)
    Stmt.execute(env, stmt)
    output += show(ctx, env, stmt)
  }

  return output
}

function show(ctx: Ctx.Ctx, env: Env.Env, stmt: Stmt.Stmt): string {
  if (stmt.kind === "Stmt.show") {
    const { exp } = stmt
    const t = Infer.infer(ctx, exp)
    const value = Evaluate.evaluate(env, exp)
    const norm = Readback.readback(new Set(ctx.keys()), t, value)
    return `${t.repr()} -- ${norm.repr()}\n`
  }

  return ""
}
