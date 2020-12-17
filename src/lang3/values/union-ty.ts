import { Ty } from "../ty"
import { Value } from "../value"
import * as Closure from "../value/closure"
import * as Mod from "../mod"
import * as Ctx from "../ctx"
import { Quote } from "../exps/str/quote"
import { Union } from "../exps/union"
import { readback_type } from "../readback/readback-type"

export type UnionTy = Ty & {
  kind: "Value.union"
  left: Value
  right: Value
}

export function UnionTy(left: Value, right: Value): UnionTy {
  return {
    kind: "Value.union",
    left,
    right,
    typed_readback(value, { mod, ctx }) {
      throw new Error("TODO")
    },
    readback_as_type: ({ mod, ctx }) =>
      Union(readback_type(mod, ctx, left), readback_type(mod, ctx, right)),
  }
}