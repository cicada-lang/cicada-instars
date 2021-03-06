import { Value } from "../value"
import { World } from "../world"
import { ValueStack } from "../value-stack"
import { Env } from "../env"
import { Mod } from "../mod"
import { JoJo } from "../jos"

export type JoJoValue = Value & {
  kind: "JoJoValue"
  jojo: JoJo
  env: Env
  mod: Mod
}

export function JoJoValue(
  jojo: JoJo,
  the: {
    env: Env
    mod: Mod
  }
): JoJoValue {
  return {
    kind: "JoJoValue",
    jojo,
    ...the,
    apply: (world) => jojo.jos_execute(world),
    repr: () => jojo.repr(),
    semantic_repr: () => {
      const init_world = World({ ...the, value_stack: ValueStack([], 0) })
      const world = jojo.jos_execute(init_world)
      return (
        world.value_stack.semantic_repr() +
        world.application_trace
          .map((value_stack) => "- " + value_stack.semantic_repr())
          .join("")
      )
    },
  }
}
