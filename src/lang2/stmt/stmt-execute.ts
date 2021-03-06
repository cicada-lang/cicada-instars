import * as Stmt from "../stmt"
import * as Env from "../env"
import * as Exp from "../exp"
import * as Evaluate from "../evaluate"

export function execute(env: Env.Env, stmt: Stmt.Stmt): void {
  switch (stmt.kind) {
    case "Stmt.def": {
      Env.update(env, stmt.name, Evaluate.evaluate(env, stmt.exp))
    }
  }
}
