class ParameterMap {
  key: string
  value: Map<string, string>

  constructor(key: string, value: Map<string, string>) {
    this.key = key
    this.value = value
  }

  match(key: string): boolean {
    //TODO: regex match
    if (this.key === key) {
      return true
    }
    return false
  }
}

export class ParameterMapList {
  prams: ParameterMap[]

  constructor(rawJSON: string) {
    const ps = new Array<ParameterMap>()
    const parsed = JSON.parse(rawJSON)
    //TODO: validation
    for (const key in parsed) {
      const values = new Map<string, string>()
      for (const val in parsed[key]) {
        values.set(val, parsed[key][val])
      }
      const p = new ParameterMap(key, values)
      ps.push(p)
    }
    this.prams = ps
  }

  match(key: string): ParameterMap | undefined {
    for (const param of this.prams) {
      const ok = param.match(key)
      if (ok) {
        return param
      }
    }
  }
}
