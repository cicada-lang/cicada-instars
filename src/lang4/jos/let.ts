import { Jo } from "../jo"
import { World } from "../world"

export type Let = Jo & {
  kind: "Let"
  name: string
}

export function Let(name: string): Let {
  return {
    kind: "Let",
    name,
    compose: extend(name),
    cut: extend(name),
    repr: () => `(${name})`,
  }
}

const extend = (name: string) => (world: World) => {
  const [value, next_world] = world.value_stack_pop()
  return next_world.env_extend(name, value)
}
