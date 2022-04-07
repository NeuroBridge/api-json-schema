export const schema = {
  '$id': 'https://neurobridge.org/query.schema.json',
  type: 'object',
  definitions: {
    operator: {
      type: 'string',
      enum: ['AND', 'OR'],
    },
    not: {
      type: 'boolean',
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
            '$ref': '#',
          },
        ],
      },
    },
  },
  required: ['operator', 'not', 'arguments'],
  properties: {
    operator: { '$ref': '#/definitions/operator' },
    not: { '$ref': '#/definitions/not' },
    arguments: { '$ref': '#/definitions/arguments' },
  },
}
