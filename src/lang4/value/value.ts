import { World } from "../world"

export type Referent = {
  refer: (world: World) => World
}

export type Value = Partial<Referent> & {
  kind: string
}
