export const exp = {
  $grammar: {
    "exp:var": [{ name: "identifier" }],
    "exp:pi": [
      '"("',
      { name: "identifier" },
      '":"',
      { arg_t: "exp" },
      '")"',
      '"-"',
      '">"',
      { ret_t: "exp" },
    ],
    "exp:arrow": [
      '"("',
      { arg_t: "exp" },
      '")"',
      '"-"',
      '">"',
      { ret_t: "exp" },
    ],
    "exp:fn": [
      '"("',
      { pattern: "pattern" },
      '")"',
      '"="',
      '">"',
      { ret: "exp" },
    ],
    "exp:case_fn": ['"{"', { cases: "cases" }, '"}"'],
    "exp:ap": [
      { target: "identifier" },
      { args: { $ap: ["one_or_more", '"("', "exp", '")"'] } },
    ],
    "exp:cls": ['"{"', { sat: "sat" }, { scope: "scope" }, '"}"'],
    "exp:obj": ['"{"', { properties: "properties" }, '"}"'],
    "exp:field": [{ target: "head" }, '"."', { name: "identifier" }],
    "exp:method": [
      { target: "head" },
      '"."',
      { name: "identifier" },
      { args: { $ap: ["one_or_more", '"("', "exp", '")"'] } },
    ],
    "exp:equal": [
      '"Equal"',
      '"("',
      { t: "exp" },
      '","',
      { from: "exp" },
      '","',
      { to: "exp" },
      '")"',
    ],
    "exp:same": ['"same"'],
    "exp:replace": [
      '"replace"',
      '"("',
      { target: "exp" },
      '","',
      { motive: "exp" },
      '","',
      { base: "exp" },
      '")"',
    ],
    "exp:absurd": ['"Absurd"'],
    "exp:absurd_ind": [
      '"Absurd"',
      '"."',
      '"ind"',
      '"("',
      { target: "exp" },
      '","',
      { motive: "exp" },
      '")"',
    ],
    "exp:str": ['"String"'],
    "exp:quote": [{ value: { $pattern: ["string"] } }],
    "exp:union": [
      '"{"',
      { head: "exp" },
      { tail: { $ap: ["zero_or_more", '"|"', "exp"] } },
      '"}"',
    ],
    "exp:type": ['"Type"'],
    "exp:object": ['"Object"'],
    "exp:begin": [
      '"@"',
      '"begin"',
      '"{"',
      { stmts: "stmts" },
      { ret: "exp" },
      '"}"',
    ],
    "exp:deduction": [
      '"{"',
      { deduction_entries: { $ap: ["one_or_more", "deduction_entry"] } },
      { deduction_args: { $ap: ["zero_or_more", "exp"] } },
      '"}"',
    ],
  },
}

export const head = {
  $grammar: {
    "head:var": [{ name: "identifier" }],
    "head:ap": [
      { target: "identifier" },
      { args: { $ap: ["one_or_more", '"("', "exp", '")"'] } },
    ],
    "head:field": [{ target: "head" }, '"."', { name: "identifier" }],
    "head:method": [
      { target: "head" },
      '"."',
      { name: "identifier" },
      { args: { $ap: ["one_or_more", '"("', "exp", '")"'] } },
    ],
  },
}

export const cases = {
  $grammar: {
    "cases:cases": [{ cases: { $ap: ["one_or_more", "case_entry"] } }],
  },
}

export const case_entry = {
  $grammar: {
    "case_entry:case_entry": [
      '"("',
      { pattern: "pattern" },
      '")"',
      '"="',
      '">"',
      { ret: "exp" },
    ],
  },
}

export const pattern = {
  $grammar: {
    "pattern:v": [{ name: "identifier" }],
    "pattern:datatype": [
      { name: "identifier" },
      { args: { $ap: ["one_or_more", '"("', "pattern", '")"'] } },
    ],
    "pattern:data": [
      { name: "identifier" },
      '"."',
      { tag: "identifier" },
      { args: { $ap: ["one_or_more", '"("', "pattern", '")"'] } },
    ],
    "pattern:data_nullary": [
      { name: "identifier" },
      '"."',
      { tag: "identifier" },
    ],
  },
}

export const deduction_entry = {
  $grammar: {
    "deduction_entry:deduction_entry": [
      { t: "exp" },
      "dashline",
      { exp: "exp" },
    ],
  },
}

export const properties = {
  $grammar: {
    "properties:properties": [
      { properties: { $ap: ["zero_or_more", "property"] } },
    ],
  },
}

export const property = {
  $grammar: {
    "property:property": [{ name: "identifier" }, '"="', { exp: "exp" }],
  },
}

export const sat = {
  $grammar: {
    "sat:sat": [{ entries: { $ap: ["zero_or_more", "sat_entry"] } }],
  },
}

export const sat_entry = {
  $grammar: {
    "sat_entry:sat_entry": [
      { name: "identifier" },
      '":"',
      { t: "exp" },
      '"="',
      { exp: "exp" },
    ],
  },
}

export const scope = {
  $grammar: {
    "scope:scope": [{ entries: { $ap: ["one_or_more", "scope_entry"] } }],
  },
}

export const scope_entry = {
  $grammar: {
    "scope_entry:scope_entry": [{ name: "identifier" }, '":"', { t: "exp" }],
  },
}
