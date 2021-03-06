import { Exp } from "../../exp"
import * as Stmt from "../../stmt"
import { begin_evaluable } from "./begin-evaluable"
import { begin_checkable } from "./begin-checkable"
import { begin_inferable } from "./begin-inferable"
import * as ut from "../../../ut"

export type Begin = Exp & {
  kind: "Begin"
  stmts: Array<Stmt.Stmt>
  ret: Exp
}

export function Begin(stmts: Array<Stmt.Stmt>, ret: Exp): Begin {
  return {
    kind: "Begin",
    stmts,
    ret,
    ...begin_evaluable(stmts, ret),
    ...begin_checkable(stmts, ret),
    ...begin_inferable(stmts, ret),
    repr: () => {
      const s = [...stmts.map(Stmt.repr), ret.repr()].join("\n")
      return `{\n${ut.indent(s, "  ")}\n}`
    },
  }
}
