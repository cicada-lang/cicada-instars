import * as Parser from "../parser"
import * as Token from "../token"
import * as Value from "../value"
import * as Schedule from "./schedule"

export interface EarleyParser extends Parser.Parser {
  recognize(tokens: Array<Token.Token>): boolean
  opts: Schedule.Opts
}
