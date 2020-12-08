import * as Stmt from "../stmt"
import * as Pattern from "../pattern"
import { Var } from "../exps/var"
import { Pi } from "../exps/pi/pi"
import { Fn } from "../exps/pi/fn"
import { CaseFn } from "../exps/pi/case-fn"
import { Ap } from "../exps/pi/ap"
import { Cls } from "../exps/cls/cls"
import { Obj } from "../exps/cls/obj"
import { Dot } from "../exps/cls/dot"
import { Equal } from "../exps/equal/equal"
import { Same } from "../exps/equal/same"
import { Replace } from "../exps/equal/replace"
import { Absurd } from "../exps/absurd/absurd"
import { AbsurdInd } from "../exps/absurd/absurd-ind"
import { Str } from "../exps/str/str"
import { Quote } from "../exps/str/quote"
import { Union } from "../exps/union"

export type Exp =
  | Var
  | Pi
  | Fn
  | CaseFn
  | Ap
  | Cls
  | Obj
  | Dot
  | Equal
  | Same
  | Replace
  | Absurd
  | AbsurdInd
  | Str
  | Quote
  | Union
  | type_constructor
  | type
  | begin
  | the

export type v = Var
export const v = Var

export type pi = Pi
export const pi = Pi

export type fn = Fn
export const fn = Fn

export type Case = {
  pattern: Pattern.Pattern
  ret: Exp
}

export type case_fn = CaseFn
export const case_fn = CaseFn

export type ap = Ap
export const ap = Ap

export type cls = Cls
export const cls = Cls

export type obj = Obj
export const obj = Obj

export type dot = Dot
export const dot = Dot

export type equal = Equal
export const equal = Equal

export type same = Same
export const same = Same

export type replace = Replace
export const replace = Replace

export type absurd = Absurd
export const absurd = Absurd

export type absurd_ind = AbsurdInd
export const absurd_ind = AbsurdInd

export type str = Str
export const str = Str

export type quote = Quote
export const quote = Quote

export type union = Union
export const union = Union

export type type_constructor = {
  kind: "Exp.type_constructor"
  name: string
  t: Exp
  sums: Array<{ tag: string; t: Exp }>
}

export const type_constructor = (
  name: string,
  t: Exp,
  sums: Array<{ tag: string; t: Exp }>
): type_constructor => ({
  kind: "Exp.type_constructor",
  name,
  t,
  sums,
})

export type type = {
  kind: "Exp.type"
}

export const type: type = {
  kind: "Exp.type",
}

export type begin = {
  kind: "Exp.begin"
  stmts: Array<Stmt.Stmt>
  ret: Exp
}

export const begin = (stmts: Array<Stmt.Stmt>, ret: Exp): begin => ({
  kind: "Exp.begin",
  stmts,
  ret,
})

export type the = {
  kind: "Exp.the"
  t: Exp
  exp: Exp
}

export const the = (t: Exp, exp: Exp): the => ({
  kind: "Exp.the",
  t,
  exp,
})
