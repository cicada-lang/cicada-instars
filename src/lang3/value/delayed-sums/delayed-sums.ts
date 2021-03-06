import * as Exp from "../../exp"
import * as Mod from "../../mod"
import * as Env from "../../env"

export type DelayedSums = {
  sums: Array<{ tag: string; t: Exp.Exp }>
  mod: Mod.Mod
  env: Env.Env
}
