export default {
  '$schema': 'http://json-schema.org/schema#',
  '$id': 'expression',
  type: 'object',
  definitions: {
    operator: {
      type: 'string',
      enum: ['AND', 'OR'],
    },
    not: {
      type: 'boolean',
    },
    expression: {
      type: 'object',
      properties: {
        operator: { '$ref': '#/definitions/operator' },
        arguments: { '$ref': '#/definitions/arguments' },
      },      
    },
    arguments: {
      type: 'array',
      minItems: 2,
      maxItems: 2,
      items: { 
        anyOf: [
          {
            type: 'string',
          },
          {
            '$ref': '#/definitions/expression',
          },
        ],
      },
    },
  },
  required: ['operator', 'not', 'arguments'],
  properties: {
    operator: { '$ref': '#/definitions/operator' },
    arguments: { '$ref': '#/definitions/arguments' },
  },
}
