# NeuroBridge API JSON Schema

This [Node.js](https://nodejs.org/en/) project is intended to test defining a JSON schema to encode a nested boolean query in JSON for the NeuroBridge API (name?).

An example of such a query follows.

```
(a or b) and (c or (not d))
```

Encoded in JSON, the above query would look like the following object.

```
{
  "description": "(a or b) and (c or not d)",
  "expression": {
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
}
```

_(Note: `description` is an optional property on all expression objects.)_

This project essentially consists of (1) a schema and (2) a bunch of test payloads, each of which are JSON files in the `test` directory, and (3) a script that validates each test payload. Running this script simply validates those JSON files with [Ajv JSON Schema Validator](https://www.npmjs.com/package/ajv).

A typical output from this script is as follows.

```
Found 8 test files.
┌─────────┬──────────────────────────────┬─────────┬───────────────────────────────┐
│ (index) │             file             │ passing │          description          │
├─────────┼──────────────────────────────┼─────────┼───────────────────────────────┤
│    0    │  'fail-and-single-arg.json'  │  false  │            'x and'            │
│    1    │  'fail-and-three-args.json'  │  false  │        'x and y and z'        │
│    2    │  'fail-or-single-arg.json'   │  false  │            'x or'             │
│    3    │  'fail-or-three-args.json'   │  false  │         'x or y or z'         │
│    4    │ 'fail-unknown-operator.json' │  false  │       'x or (y xand z)'       │
│    5    │    'pass-and-simple.json'    │  true   │           'a and b'           │
│    6    │     'pass-complex.json'      │  true   │ '(a or b) and (c or (not d))' │
│    7    │    'pass-or-simple.json'     │  true   │           'a or b'            │
└─────────┴──────────────────────────────┴─────────┴───────────────────────────────┘
```

## the Schema

The JSON schema is a named export from the file [./schema.js](./schema.js).

## Running this Script

With Node.js installed, execute `npm i` to install the project dependencies, and execute `npm start` to run the validation script.
