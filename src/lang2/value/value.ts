import * as Closure from "./closure"
import * as Neutral from "../neutral"

export type Value =
  | pi
  | fn
  | sigma
  | cons
  | nat
  | zero
  | add1
  | equal
  | same
  | trivial
  | sole
  | absurd
  | str
  | quote
  | type
  | not_yet

export type pi = {
  kind: "Value.pi"
  arg_t: Value
  ret_t_cl: Closure.Closure
}

export const pi = (arg_t: Value, ret_t_cl: Closure.Closure): pi => ({
  kind: "Value.pi",
  arg_t,
  ret_t_cl,
})

type fn = {
  kind: "Value.fn"
  ret_cl: Closure.Closure
}

export const fn = (ret_cl: Closure.Closure): fn => ({
  kind: "Value.fn",
  ret_cl,
})

export type sigma = {
  kind: "Value.sigma"
  car_t: Value
  cdr_t_cl: Closure.Closure
}

export const sigma = (car_t: Value, cdr_t_cl: Closure.Closure): sigma => ({
  kind: "Value.sigma",
  car_t,
  cdr_t_cl,
})

type cons = {
  kind: "Value.cons"
  car: Value
  cdr: Value
}

export const cons = (car: Value, cdr: Value): cons => ({
  kind: "Value.cons",
  car,
  cdr,
})

export type nat = {
  kind: "Value.nat"
}

export const nat: nat = {
  kind: "Value.nat",
}

type zero = {
  kind: "Value.zero"
}

export const zero: zero = {
  kind: "Value.zero",
}

type add1 = {
  kind: "Value.add1"
  prev: Value
}

export const add1 = (prev: Value): add1 => ({
  kind: "Value.add1",
  prev,
})

export type equal = {
  kind: "Value.equal"
  t: Value
  from: Value
  to: Value
}

export const equal = (t: Value, from: Value, to: Value): equal => ({
  kind: "Value.equal",
  t,
  from,
  to,
})

type same = {
  kind: "Value.same"
}

export const same: same = {
  kind: "Value.same",
}

export type trivial = {
  kind: "Value.trivial"
}

export const trivial: trivial = {
  kind: "Value.trivial",
}

type sole = {
  kind: "Value.sole"
}

export const sole: sole = {
  kind: "Value.sole",
}

export type absurd = {
  kind: "Value.absurd"
}

export const absurd: absurd = {
  kind: "Value.absurd",
}

export type str = {
  kind: "Value.str"
}

export const str: str = {
  kind: "Value.str",
}

type quote = {
  kind: "Value.quote"
  str: string
}

export const quote = (str: string): quote => ({
  kind: "Value.quote",
  str,
})

export type type = {
  kind: "Value.type"
}

export const type: type = {
  kind: "Value.type",
}

type not_yet = {
  kind: "Value.not_yet"
  t: Value
  neutral: Neutral.Neutral
}

export const not_yet = (t: Value, neutral: Neutral.Neutral): not_yet => ({
  kind: "Value.not_yet",
  t,
  neutral,
})
