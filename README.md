# NeuroBridge API JSON Schema

This [Node.js](https://nodejs.org/en/) project is intended to test defining a JSON schema to encode a nested boolean query in JSON for the NeuroBridge API (name?).

An example of such a query follows.

```
((A and B) or (C or (not D))
```

Encoded in JSON, the above query would look like the following object.

```
{
  "operator": "and",
  "arguments": [
    {
      "operator": "or",
      "arguments": ["A", "B"]
    },
    {
      "operator": "or",
      "arguments": [
        "C",
        {
          "operator": "not",
          "arguments": ["D"]
        }
      ]
    }
  ]
}
```

This project essentially consists of (1) a schema and (2) a bunch of test payloads, each of which are JSON files in the `test` directory, and (3) a script that validates each test payload. Running this script simply validates those JSON files with [Ajv JSON Schema Validator](https://www.npmjs.com/package/ajv).

A typical output from this script is as follows.

```
Found 4 test files.
┌─────────┬──────────────────────────┬───────┐
│ (index) │           file           │ valid │
├─────────┼──────────────────────────┼───────┤
│    0    │     '_passing.json'      │ true  │
│    1    │ 'missing-arguments.json' │ false │
│    2    │ 'missing-operator.json'  │ false │
│    3    │ 'unknown-operator.json'  │ false │
└─────────┴──────────────────────────┴───────┘
```

## the Schema

The JSON schema is a named export from the file [./schema.js](./schema.js).

## Running this Script

With Node.js installed, execute `npm i` to install the project dependencies, and execute `npm start` to run the validation script.
