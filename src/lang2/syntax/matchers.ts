import * as Exp from "../exp"
import * as Stmt from "../stmt"
import * as pt from "../../partech"
import * as ut from "../../ut"

export function exp_matcher(tree: pt.Tree.Tree): Exp.Exp {
  return pt.Tree.matcher<Exp.Exp>({
    "exp:var": ({ name }) => Exp.v(pt.Tree.str(name)),
    "exp:pi": ({ name, arg_t, ret_t }) =>
      Exp.pi(pt.Tree.str(name), exp_matcher(arg_t), exp_matcher(ret_t)),
    "exp:arrow": ({ arg_t, ret_t }) =>
      Exp.pi("_", exp_matcher(arg_t), exp_matcher(ret_t)),
    "exp:fn": ({ name, ret }) => Exp.fn(pt.Tree.str(name), exp_matcher(ret)),
    "exp:ap": ({ target, args }) => {
      let exp: Exp.Exp = Exp.v(pt.Tree.str(target))
      for (const arg of pt.matchers.one_or_more_matcher(args)) {
        exp = Exp.ap(exp, exp_matcher(arg))
      }
      return exp
    },
    "exp:sigma": ({ name, car_t, cdr_t }) =>
      Exp.sigma(pt.Tree.str(name), exp_matcher(car_t), exp_matcher(cdr_t)),
    "exp:pair": ({ car_t, cdr_t }) =>
      Exp.sigma("_", exp_matcher(car_t), exp_matcher(cdr_t)),
    "exp:cons": ({ car, cdr }) => Exp.cons(exp_matcher(car), exp_matcher(cdr)),
    "exp:car": ({ target }) => Exp.car(exp_matcher(target)),
    "exp:cdr": ({ target }) => Exp.cdr(exp_matcher(target)),
    "exp:nat": () => Exp.nat,
    "exp:zero": () => Exp.zero,
    "exp:add1": ({ prev }) => Exp.add1(exp_matcher(prev)),
    "exp:number": ({ value }, { span }) => {
      const n = Number.parseInt(pt.Tree.str(value))
      if (Number.isNaN(n)) {
        throw new pt.ParsingError(
          `Expecting number, instead of: ${ut.inspect(n)}`,
          { span }
        )
      } else {
        return Exp.nat_from_number(n)
      }
    },
    "exp:nat_ind": ({ target, motive, base, step }) =>
      Exp.nat_ind(
        exp_matcher(target),
        exp_matcher(motive),
        exp_matcher(base),
        exp_matcher(step)
      ),
    "exp:equal": ({ t, from, to }) =>
      Exp.equal(exp_matcher(t), exp_matcher(from), exp_matcher(to)),
    "exp:same": () => Exp.same,
    "exp:replace": ({ target, motive, base }) =>
      Exp.replace(exp_matcher(target), exp_matcher(motive), exp_matcher(base)),
    "exp:trivial": () => Exp.trivial,
    "exp:sole": () => Exp.sole,
    "exp:absurd": () => Exp.absurd,
    "exp:absurd_ind": ({ target, motive }) =>
      Exp.absurd_ind(exp_matcher(target), exp_matcher(motive)),
    "exp:str": () => Exp.str,
    "exp:quote": ({ value }) => {
      const str = pt.Tree.str(value)
      return Exp.quote(str.slice(1, str.length - 1))
    },
    "exp:type": () => Exp.type,
    "exp:begin": ({ stmts, ret }) =>
      Exp.begin(stmts_matcher(stmts), exp_matcher(ret)),
    "exp:deduction": ({ deduction_entries, deduction_args }) => {
      const entries = pt.matchers
        .one_or_more_matcher(deduction_entries)
        .map(deduction_entry_matcher)
      const args = pt.matchers
        .zero_or_more_matcher(deduction_args)
        .map(exp_matcher)
      return deduction_aux(entries, args)
    },
  })(tree)
}

function deduction_aux(
  entries: Array<{ t: Exp.Exp; exp: Exp.Exp }>,
  args: Array<Exp.Exp>
): Exp.Exp {
  if (entries.length === 0) {
    throw new Error("entries.length === 0")
  } else if (entries.length === 1) {
    let [{ t, exp }] = entries
    if (args.length === 0) return Exp.the(t, exp)
    for (const arg of args) exp = Exp.ap(exp, arg)
    return Exp.the(t, exp)
  } else {
    const [{ t, exp }, ...rest] = entries
    const arg = deduction_aux(entries.slice(1), args)
    return Exp.the(t, Exp.ap(exp, arg))
  }
}

export function deduction_entry_matcher(
  tree: pt.Tree.Tree
): { t: Exp.Exp; exp: Exp.Exp } {
  return pt.Tree.matcher<{ t: Exp.Exp; exp: Exp.Exp }>({
    "deduction_entry:deduction_entry": ({ t, exp }) => ({
      t: exp_matcher(t),
      exp: exp_matcher(exp),
    }),
  })(tree)
}

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
      return Stmt.def(
        pt.Tree.str(claim),
        Exp.the(exp_matcher(t), exp_matcher(exp))
      )
    },
    "stmt:show": ({ exp }) => Stmt.show(exp_matcher(exp)),
  })(tree)
}