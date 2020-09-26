import * as Token from "../token"
import * as Tree from "../tree"
import * as Value from "../value"

export interface Parser {
  grammar: Value.grammar
  parse(tokens: Array<Token.Token>): Tree.Tree
}
