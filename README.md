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
┌─────────┬────────────────┬─────────┬─────────────────────────────┬───────────────────────────────────────────────────────┐
│ (index) │      file      │ passing │         description         │                         query                         │
├─────────┼────────────────┼─────────┼─────────────────────────────┼───────────────────────────────────────────────────────┤
│    0    │ 'fail-01.json' │  false  │           'x and'           │                    '{"and":["x"]}'                    │
│    1    │ 'fail-02.json' │  false  │           'x or'            │                    '{"or":["x"]}'                     │
│    2    │ 'fail-03.json' │  false  │       'x and y and z'       │                '{"and":["x","y","z"]}'                │
│    3    │ 'fail-04.json' │  false  │        'x or y or z'        │                '{"or":["x","y","z"]}'                 │
│    4    │ 'fail-05.json' │  false  │      'x or (y xand z)'      │           '{"or":["x",{"xand":["y","z"]}]}'           │
│    5    │ 'pass-01.json' │  true   │      'x and (y and z)'      │           '{"and":["x",{"and":["y","z"]}]}'           │
│    6    │ 'pass-02.json' │  true   │      'x or (y and z)'       │           '{"or":["x",{"and":["y","z"]}]}'            │
│    7    │ 'pass-03.json' │  true   │    'x or (y and not z)'     │       '{"or":["x",{"and":["y",{"not":"z"}]}]}'        │
│    8    │ 'pass-04.json' │  true   │ '(a or b) and (c or not d)' │ '{"and":[{"or":["a","b"]},{"or":["c",{"not":"d"}]}]}' │
└─────────┴────────────────┴─────────┴─────────────────────────────┴───────────────────────────────────────────────────────┘
```

## the Schema

The JSON schema is a named export from the file [./schema.js](./schema.js).

## Running this Script

With Node.js installed, execute `npm i` to install the project dependencies, and execute `npm start` to run the validation script.
