export const schema = {
  '$id': 'https://neurobridge.org/query.schema.json',

  type: 'object',
  
  definitions: {
    operator: {
      type: 'string',
      enum: ['AND', 'OR'],
    },
    
    arguments: {
      type: 'array',
      minItems: 2,
      maxItems: 2,
      items: {
        anyOf: [
          { '$ref': '#' },
          { '$ref': '#/definitions/term' },
        ],
      }
    },
    
    term: {
      type: 'object',
      properties: {
        not: { type: 'boolean' },
        value: { type: 'string' },
      },
      required: [
        'not',
        'value',
      ],
    }
  },
  
  properties: {
    operator: {
      '$ref': '#/definitions/operator',
    },
    arguments: {
      '$ref': '#/definitions/arguments',
    },
  },
  
  required: ['operator', 'arguments'],
}
