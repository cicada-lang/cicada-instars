import * as Syntax from "../../syntax"
import { Stmt } from "../../stmt"
import { run } from "../../run"
import { World } from "../../world"
import { TypeCheckError } from "../../errors"
import * as Trace from "../../../trace"
import * as pt from "../../../partech"
import fs from "fs"


export const command = "eval <input>"

export const aliases = ["$0"]

export const description = "Eval a file"

export const builder = {
  nocolor: { type: "boolean", default: false },
}

type Argv = {
  input: string
  nocolor: boolean
}

export const handler = async (argv: Argv) => {
  const text = fs.readFileSync(argv.input, { encoding: "utf-8" })

  try {
    const stmts = Syntax.parse_stmts(text)
    const world = World.init()
    const output = run(stmts, world)
    if (output) console.log(output)
  } catch (error) {
    if (error instanceof TypeCheckError) {
      const message = error.message
      console.error(message)
      process.exit(1)
    }

    if (error instanceof pt.ParsingError) {
      let message = error.message
      message += "\n"
      message += pt.Span.report(error.span, text)
      console.error(message)
      process.exit(1)
    }

    throw error
  }
}
