import { Exp } from "../exp"
import { Add1 } from "../exps"

export function nat_to_number(exp: Exp): number | undefined {
  if (exp.kind === "Zero") {
    return 0
  } else if (exp.kind === "Add1") {
    const add1 = exp as Add1
    const almost = nat_to_number(add1.prev)
    if (almost !== undefined) {
      return 1 + almost
    } else {
      return undefined
    }
  } else {
    return undefined
  }
}
