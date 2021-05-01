import * as Syntax from "../../syntax"
import * as Top from "../../top"
import * as Exp from "../../exp"
import * as Mod from "../../mod"
import * as Project from "../../project"
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
  const text = await fs.promises.readFile(argv.input, "utf8")

  try {
    const tops = Syntax.parse_tops(text)
    const mod = Mod.init()
    // TODO real project
    const project = Project.init()
    const output = Top.run_tops(project, mod, tops)
    console.log(output)
  } catch (error) {
    if (error instanceof Trace.Trace) {
      console.error(Trace.repr(error, (exp) => exp.repr()))
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
