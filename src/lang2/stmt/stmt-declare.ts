import * as Stmt from "../stmt"
import * as Ctx from "../ctx"
import * as Exp from "../exp"
import * as Evaluate from "../evaluate"
import * as Infer from "../infer"

export function declare(ctx: Ctx.Ctx, stmt: Stmt.Stmt): void {
  switch (stmt.kind) {
    case "Stmt.def": {
      Ctx.update(
        ctx,
        stmt.name,
        Infer.infer(ctx, stmt.exp),
        Evaluate.evaluate(Ctx.to_env(ctx), stmt.exp)
      )
    }
  }
}
