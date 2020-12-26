import { Jo } from "../jo"
import { World } from "../world"
import { JoJoComposeValue } from "../values/jojo-compose-value"
import { JoJoCutValue } from "../values/jojo-cut-value"
import { TypeValue } from "../values/type-value"

export type Arrow = Jo & {
  kind: "Arrow"
  pre: Array<Jo>
  post: Array<Jo>
}

export function Arrow(pre: Array<Jo>, post: Array<Jo>): Arrow {
  return {
    kind: "Arrow",
    pre,
    post,
    compose: (world) => {
      throw new Error("TODO")
    },
    cut: (world) => world.value_stack_push(TypeValue),
    repr: () => {
      const pre_repr = "[ " + pre.map((jo) => jo.repr()).join(" ") + " ]"
      const post_repr = "[ " + post.map((jo) => jo.repr()).join(" ") + " ]"
      return "@arrow " + pre_repr + " " + post_repr
    },
  }
}