export const objectToQuerystring = obj => {
  // if expression is a string, keep it as-is.
  if (typeof obj === 'string') {
    return obj
  }
  
  // bail out now--return empty string--if it's not object.
  if (typeof obj !== 'object') {
    return ''
  }
  
  // we have an object!
  // now, let's determine the operator from incoming shape { op: arg }.
  const operator = Object.keys(obj)[0]
  switch (operator) {
    case 'and':
      return `(${ objectToQuerystring(obj.and[0]) } and ${ objectToQuerystring(obj.and[1]) })`
    case 'or':
      return `(${ objectToQuerystring(obj.or[0]) } or ${ objectToQuerystring(obj.or[1]) })`
    case 'not':
      return `(not ${ objectToQuerystring(obj.not) })`
    default:
  }

  // if we get here, we'd have an unknown operator, but we'd hope to never get
  // this because such an error should be caught by validating the JSON Schema.
  console.error('Unknown operator!')
  return
}

