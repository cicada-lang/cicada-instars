export type Pattern = v | datatype | data

export type v = {
  kind: "Pattern.v"
  name: string
}

export const v = (name: string): v => ({
  kind: "Pattern.v",
  name,
})

export type datatype = {
  kind: "Pattern.datatype"
  name: string
  args: Array<Pattern>
}

export const datatype = (name: string, args: Array<Pattern>): datatype => ({
  kind: "Pattern.datatype",
  name,
  args,
})

export type data = {
  kind: "Pattern.data"
  name: string
  tag: string
  args: Array<Pattern>
}

export const data = (
  name: string,
  tag: string,
  args: Array<Pattern>
): data => ({
  kind: "Pattern.data",
  name,
  tag,
  args,
})
