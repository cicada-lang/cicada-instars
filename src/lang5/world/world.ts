import { ValueStack } from "../value-stack"
import { Value, value_equal } from "../value"
import { JoJo } from "../jos/jojo"
import { Env } from "../env"
import { Mod } from "../mod"

export type World = {
  env: Env
  mod: Mod
  value_stack: ValueStack
  value_stack_push: (value: Value) => World
  value_stack_pop: () => [Value, World]
  env_extend: (name: string, value: Value) => World
  mod_extend: (name: string, jojo: JoJo) => World
  output: string
  output_append: (str: string) => World
}

export function World(the: {
  env: Env
  mod: Mod
  value_stack: ValueStack
  output?: string
}): World {
  return {
    ...the,
    value_stack_push: (value) =>
      World({ ...the, value_stack: the.value_stack.push(value) }),
    value_stack_pop: () => [
      the.value_stack.top(),
      World({ ...the, value_stack: the.value_stack.drop() }),
    ],
    env_extend: (name, value) =>
      World({ ...the, env: the.env.extend(name, value) }),
    mod_extend: (name, jojo) =>
      World({ ...the, mod: the.mod.extend(name, jojo) }),
    output: the.output || "",
    output_append: (str) => World({ ...the, output: the.output + str }),
  }
}
