import * as Exp from "./exp"

export class Scope {
  constructor(
    public named_entry_list: Array<[string, ScopeEntry]> = [],
  ) {}

  get length(): number {
    return this.named_entry_list.length
  }
}

export abstract class ScopeEntry {}

export class ScopeEntryLet extends ScopeEntry {
  constructor(
    public value: Exp.Exp,
  ) { super() }
}

export class ScopeEntryGiven extends ScopeEntry {
  constructor(
    public t: Exp.Exp,
  ) { super() }
}

export class ScopeEntryDefine extends ScopeEntry {
  constructor(
    public t: Exp.Exp,
    public value: Exp.Exp,
  ) { super() }
}
