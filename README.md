# NeuroBridge API JSON Schema

This [Node.js](https://nodejs.org/en/) project is intended to test defining a JSON schema to encode a nested boolean query in JSON for the NeuroBridge API (name?).

An example of such a query follows.

```
(a or b) and (c or not d)
```

Encoded in JSON, the above query would look like the following object.

```
{
  "description": "(a or b) and (c or not d)",
  "and": [
    {
      "or": [ "a", "b" ]
    },
    {
      "or": [
        "c",
        { "not": "d" }
      ]
    }
  ]
}
```

_(Note: `description` is an optional property on all expression objects.)_

This project essentially consists of (1) a schema and (2) a bunch of test payloads, each of which are JSON files in the `test` directory, and (3) a script that validates each test payload. Running this script simply validates those JSON files with [Ajv JSON Schema Validator](https://www.npmjs.com/package/ajv).

A typical output from this script is as follows.

```
Found 9 test files.
┌─────────┬────────────────┬───────┐
│ (index) │      file      │ valid │
├─────────┼────────────────┼───────┤
│    0    │ 'fail-01.json' │ false │
│    1    │ 'fail-02.json' │ false │
│    2    │ 'fail-03.json' │ false │
│    3    │ 'fail-04.json' │ false │
│    4    │ 'fail-05.json' │ false │
│    5    │ 'pass-01.json' │ true  │
│    6    │ 'pass-02.json' │ true  │
│    7    │ 'pass-03.json' │ true  │
│    8    │ 'pass-04.json' │ true  │
└─────────┴────────────────┴───────┘
```

## the Schema

The JSON schema is a named export from the file [./schema.js](./schema.js).

## Running this Script

With Node.js installed, execute `npm i` to install the project dependencies, and execute `npm start` to run the validation script.
