import { ReturnStack } from "../return-stack"
import { ValueStack } from "../value-stack"
import { ValueTable } from "../value-table"

export type World = {
  env: ValueTable
  value_stack: ValueStack
  return_stack: ReturnStack
}
