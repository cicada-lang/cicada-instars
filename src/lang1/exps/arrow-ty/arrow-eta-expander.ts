import { Ty } from "../../ty"
import * as Value from "../../value"
import { Fn } from "../../exps/fn"
import { EtaExpander } from "../../eta-expander"
import { readback } from "../../readback"
import { do_ap } from "../../exps/ap"
import * as ut from "../../../ut"
import { NotYetValue } from "../not-yet-value"
import { is_fn_value } from "../fn-value"
import { VarNeutral } from "../var-neutral"

// NOTE everything with a function type
//   is immediately read back as having a Lambda on top.
//   This implements the η-rule for functions.

export const arrow_eta_expander = (arg_t: Ty, ret_t: Ty) =>
  EtaExpander({
    eta_expand: (value, { used }) => {
      const name = ut.freshen_name(used, value_arg_name(value))
      const variable = NotYetValue(arg_t, VarNeutral(name))
      const ret = do_ap(value, variable)
      return Fn(name, readback(new Set([...used, name]), ret_t, ret))
    },
  })

function value_arg_name(value: Value.Value): string {
  return is_fn_value(value) ? value.name : "x"
}
