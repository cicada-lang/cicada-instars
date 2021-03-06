import * as ut from "../../ut"

export function explain_name_undefined(name: string): string {
  const explanation = `
    |The name ${name} is undefined.
    |`
  return ut.aline(explanation)
}

export function explain_elim_target_mismatch(the: {
  elim: string
  expecting: Array<string>
  reality: string
}): string {
  const explanation = `
    |This is an internal error.
    |When evaluating the eliminator ${the.elim},
    |I am expecting its target to be of the following kind:
    |  ${the.expecting.join(", ")}
    |but in reality, the kind of target I meet is ${the.reality}.
    |`
  return ut.aline(explanation)
}

export function explain_elim_target_type_mismatch(the: {
  elim: string
  expecting: Array<string>
  reality: string
}): string {
  const explanation = `
    |This is an internal error.
    |When evaluating the eliminator ${the.elim},
    |I am expecting its target type to be of the following kind:
    |  ${the.expecting.join(", ")}
    |but in reality, the kind of target type I meet is ${the.reality}.
    |`
  return ut.aline(explanation)
}
