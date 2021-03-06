import { Checkable } from "../../checkable"
import * as Readback from "../../readback"
import * as Value from "../../value"
import * as Trace from "../../../trace"
import * as ut from "../../../ut"

export const same_checkable = Checkable({
  checkability: (t, { mod, ctx }) => {
    const equal = Value.is_equal(mod, ctx, t)
    const t_repr = Readback.readback(mod, ctx, Value.type, equal.t).repr()
    if (!Value.conversion(mod, ctx, equal.t, equal.from, equal.to)) {
      throw new Trace.Trace(
        ut.aline(`
          |I am expecting the following two values to be the same ${t_repr}.
          |But they are not.
          |from:
          |  ${Readback.readback(mod, ctx, equal.t, equal.from).repr()}
          |to:
          |  ${Readback.readback(mod, ctx, equal.t, equal.to).repr()}
          |`)
      )
    }
  },
})
