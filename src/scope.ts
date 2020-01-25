import * as Exp from "./exp"
import * as Value from "./value"
import * as Env from "./env"
import { evaluate } from "./evaluate"
import { check } from "./check"
import { infer } from "./infer"
import { ErrorReport } from "./error"

export class Scope {
  constructor(
    public named_entries: Array<[string, Entry.Entry]> = [],
  ) {}

  get arity(): number {
    let n = 0
    for (let [_name, entry] of this.named_entries) {
      if (entry instanceof Entry.Given) {
        n += 1
      }
    }
    return n
  }

  lookup_value(name: string): undefined | Exp.Exp  {
    let named_entry = this.named_entries.find(([entry_name, _entry]) => name === entry_name)

    if (named_entry === undefined) {
      return undefined
    }

    let [ _name, entry ] = named_entry

    if (entry instanceof Entry.Let) {
      let { value } = entry
      return value
    }

    else if (entry instanceof Entry.Given) {
      return undefined
    }

    else if (entry instanceof Entry.Define) {
      let { value } = entry
      return value
    }

    else {
      throw new Error(
        "Scope.lookup_value fail\n" +
          `unhandled class of Scope.Entry: ${entry.constructor.name}\n`)
    }
  }
}

export namespace Entry {

  export abstract class Entry {}

  export class Let extends Entry {
    constructor(
      public value: Exp.Exp,
    ) { super() }
  }

  export class Given extends Entry {
    constructor(
      public t: Exp.Exp,
    ) { super() }
  }

  export class Define extends Entry {
    constructor(
      public t: Exp.Exp,
      public value: Exp.Exp,
    ) { super() }
  }
}

export function entry_to_type(
  entry: Entry.Entry,
  env: Env.Env,
): Value.Value {
  if (entry instanceof Entry.Let) {
    let { value } = entry
    return infer(env, value)
  }

  else if (entry instanceof Entry.Given) {
    let { t } = entry
    return evaluate(env, t)
  }

  else if (entry instanceof Entry.Define) {
    let { t } = entry
    return evaluate(env, t)
  }

  else {
    throw new Error(
      "entry_to_type fail\n" +
        `unhandled class of Scope.Entry: ${entry.constructor.name}\n`)
  }
}

export function scope_check_args(
  scope: Scope,
  scope_env: Env.Env,
  args: Array<Exp.Exp>,
  env: Env.Env,
  effect: (name: string, the: {
    t: Value.Value,
    value: Value.Value,
  }) => void = (name, the) => {},
): Env.Env {
  let arg_index = 0

  for (let [name, entry] of scope.named_entries) {
    if (entry instanceof Entry.Let) {
      let { value } = entry
      let the = {
        t: infer(scope_env, value),
        value: evaluate(scope_env, value),
      }
      scope_env = scope_env.ext(name, the)
      effect(name, the)
    }

    else if (entry instanceof Entry.Given) {
      let arg = args[arg_index]
      if (arg === undefined) {
        break
      }
      arg_index += 1
      let { t } = entry
      let t_value = evaluate(scope_env, t)
      check(env, arg, t_value)
      let arg_value = evaluate(env, arg) // NOTE use the original `env`
      let the = {
        t: t_value,
        value: arg_value,
      }
      scope_env = scope_env.ext(name, the)
      effect(name, the)
    }

    else if (entry instanceof Entry.Define) {
      let { t, value } = entry
      let the = {
        t: evaluate(scope_env, t),
        value: evaluate(scope_env, value),
      }
      scope_env = scope_env.ext(name, the)
      effect(name, the)
    }

    else {
      throw new ErrorReport([
        "scope_check_args fail\n" +
          `unhandled class of Entry: ${entry.constructor.name}\n`])
    }
  }

  return scope_env
}

export function scope_check(
  scope: Scope,
  scope_env: Env.Env,
  effect: (name: string, the: {
    t: Value.Value,
    value: Value.Value,
  }) => void = (name, the) => {},
): Env.Env {
  for (let [name, entry] of scope.named_entries) {
    if (entry instanceof Entry.Let) {
      let { value } = entry
      let t_value = infer(scope_env, value)
      let the = {
        t: t_value,
        value: evaluate(scope_env, value),
      }
      scope_env = scope_env.ext(name, the)
      effect(name, the)
    }

    else if (entry instanceof Entry.Given) {
      let { t } = entry
      check(scope_env, t, new Value.Type())
      let the = {
        t: evaluate(scope_env, t),
        value: new Value.Neutral.Var(name),
      }
      scope_env = scope_env.ext(name, the)
      effect(name, the)
    }

    else if (entry instanceof Entry.Define) {
      let { t, value } = entry
      check(scope_env, t, new Value.Type())
      let t_value = evaluate(scope_env, t)
      check(scope_env, value, t_value)
      let the = {
        t: t_value,
        value: evaluate(scope_env, value),
      }
      scope_env = scope_env.ext(name, the)
      effect(name, the)
    }

    else {
      throw new Error(
        "scope_check fail\n" +
          `unhandled class of Entry: ${entry.constructor.name}\n`)
    }
  }

  return scope_env
}
