# NeuroBridge API JSON Schema

This [Node.js](https://nodejs.org/en/) project is intended to test defining a JSON schema to encode a nested boolean query in JSON for the NeuroBridge API (name?).

An example of such a query follows.

```
((A OR B) AND (C OR D)) AND (NOT (E OR F))
```

Encoded in JSON, the above query would look like the following object.

```
{
  "operator":"AND",
  "not": false,
  "arguments": [
    {
      "operator": "AND",
      "not": false,
      "arguments": [
        {
          "operator": "OR",
          "not": false,
          "arguments": ["A", "B"]
        },
        {
          "operator": "OR",
          "not": false,
          "arguments": ["C", "D"]
        }
      ], 
    },
    {
      "operator": "OR",
      "not": true,
      "arguments": ["E", "F"]
    }
  ] 
}
```

This project essentially consists of (1) a schema and (2) a bunch of test payloads, each of which are JSON files in the `test` directory, and (3) a script that validates each test payload. Running this script simply validates those JSON files with [Ajv JSON Schema Validator](https://www.npmjs.com/package/ajv).

A typical output from this script is as follows.

```
Found 7 test files.
┌─────────┬───────────────────────────┬───────┐
│ (index) │           file            │ valid │
├─────────┼───────────────────────────┼───────┤
│    0    │      '_passing.json'      │ true  │
│    1    │ 'missing-arguments.json'  │ false │
│    2    │    'missing-not.json'     │ false │
│    3    │  'missing-operator.json'  │ false │
│    4    │ 'too-few-arguments.json'  │ false │
│    5    │ 'too-many-arguments.json' │ false │
│    6    │  'unknown-operator.json'  │ false │
└─────────┴───────────────────────────┴───────┘

```

## the Schema

The JSON schema is a named export from the file [./schema.js](./schema.js).

## Running this Script

With Node.js installed, execute `npm i` to install the project dependencies, and execute `npm start` to run the validation script.
