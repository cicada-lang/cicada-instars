import * as Exp from "../../exp"
import { The } from "../../exps"
import * as Stmt from "../../stmt"
import * as pt from "../../../partech"
import { exp_matcher, ty_matcher } from "../matchers"

export function stmts_matcher(tree: pt.Tree.Tree): Array<Stmt.Stmt> {
  return pt.Tree.matcher<Array<Stmt.Stmt>>({
    "stmts:stmts": ({ stmts }) =>
      pt.matchers.zero_or_more_matcher(stmts).map(stmt_matcher),
  })(tree)
}

export function stmt_matcher(tree: pt.Tree.Tree): Stmt.Stmt {
  return pt.Tree.matcher<Stmt.Stmt>({
    "stmt:def": ({ name, exp }) =>
      Stmt.def(pt.Tree.str(name), exp_matcher(exp)),
    "stmt:claim": ({ claim, t, define, exp }, { span }) => {
      if (pt.Tree.str(claim) !== pt.Tree.str(define)) {
        throw new pt.ParsingError(
          "Name mismatch.\n" +
            `- name to claim  : ${pt.Tree.str(claim)}\n` +
            `- name to define : ${pt.Tree.str(define)}\n`,
          { span }
        )
      }
      const name = claim
      return Stmt.def(pt.Tree.str(name), The(ty_matcher(t), exp_matcher(exp)))
    },
    "stmt:show": ({ exp }) => Stmt.show(exp_matcher(exp)),
  })(tree)
}
