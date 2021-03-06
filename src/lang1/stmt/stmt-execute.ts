import * as Stmt from "../stmt"
import * as Env from "../env"
import * as Evaluate from "../evaluate"

export function execute(env: Env.Env, stmt: Stmt.Stmt): void {
  switch (stmt.kind) {
    case "Stmt.def": {
      const { name, exp } = stmt
      Env.update(env, name, Evaluate.evaluate(env, exp))
    }
  }
}
