# NeuroBridge API JSON Schema

This [Node.js](https://nodejs.org/en/) project is intended to test defining a JSON schema to encode a nested boolean query in JSON for the NeuroBridge API (name?).

An example of such a query follows.

```
((A OR B) AND (C OR D)) AND (E AND NOT F))
```

Encoded in JSON, the above query would look like the following object.

```
{
  "operator": "AND",
  "arguments": [
    {
      "operator": "AND",
      "arguments": [
        {
          "operator": "OR",
          "arguments": [
            { "not": false, "value": "A" }, 
            { "not": false, "value": "B" }
          ]
        },
        {
          "operator": "OR",
          "arguments": [
            { "not": false, "value": "C" }, 
            { "not": false, "value": "D" }
          ]
        }
      ]
    },
    {
      "operator": "AND",
      "arguments": [
        { "not": false, "value": "E" },
        { "not": true, "value": "F" }
      ]
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

The JSON schema is defined in the file [./schema.json](./schema.js).

## Running this Script

With Node.js installed, execute `npm i` to install the project dependencies, and execute `npm start` to run the validation script.
