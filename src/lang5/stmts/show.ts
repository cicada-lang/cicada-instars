import { Stmt } from "../stmt"
import { World } from "../world"
import { JoJo } from "../jos/jojo"
import * as ut from "../../ut"

export type Show = Stmt & {
  jojo: JoJo
}

export function Show(jojo: JoJo): Show {
  return {
    jojo,
    execute: (world) => {
      const final = jojo.jos_execute(world)
      return world.output_append(
        final.value_stack.repr() +
          final.application_trace
            .map((value_stack) => "- " + value_stack.repr())
            .join("") +
          "\n"
      )
    },
  }
}
