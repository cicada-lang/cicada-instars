import * as ClosedFn from "./closed-fn"

export type Value = fn | str | pattern | grammar

interface fn {
  kind: "Value.fn"
  ret_cl: ClosedFn.ClosedFn
}

export const fn = (ret_cl: ClosedFn.ClosedFn): fn => ({
  kind: "Value.fn",
  ret_cl,
})

interface str {
  kind: "Value.str"
  value: string
}

export const str = (value: string): str => ({
  kind: "Value.str",
  value,
})

interface pattern {
  kind: "Value.pattern"
  label: string
  value: RegExp
}

export const pattern = (label: string, value: RegExp): pattern => ({
  kind: "Value.pattern",
  label,
  value,
})

interface grammar {
  kind: "Value.grammar"
  name: string
  choices: Map<string, Array<Part>>
}

type Part = {
  name?: string
  value: Value
}

export const grammar = (name: string, choices: Map<string, Array<Part>>): grammar => ({
  kind: "Value.grammar",
  name,
  choices,
})
