import * as Trace from "../trace"
import * as ut from "../ut"

export function repr<T>(
  trace: Trace.Trace<T>,
  formater: (x: T) => string
): string {
  let s = ""
  s += trace.message
  s += "\n"
  s += "previous:\n"
  for (const x of trace.previous) {
    s += `- ${formater(x)}\n`
  }
  s += "\n"
  return s
}
