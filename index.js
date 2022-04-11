import path from 'path'
import { readdir, readFile } from 'fs/promises'
import Ajv from 'ajv'
import {
  readJSONFile,
  objectToQuerystring,
  querystringToObject,
} from './utils/index.js'

const ajv = new Ajv()

//

console.clear();

(async () => {
  const schema = await readJSONFile(path.join(process.cwd(), 'schema.json'))

  const validate = ajv.compile(schema)

  const testFilenames = await readdir(path.join(process.cwd(), 'test'))

  console.log(`Found ${ testFilenames.length } test files.`)

  const promises = testFilenames.map(async filename => await readJSONFile(path.join(process.cwd(), 'test', filename)))

  Promise.all(promises)
    .then(data => {
      let results = []
      data.forEach((json, i) => {
        const { description, ...queryObject } = json
        const validationResult = {
          file: testFilenames[i],
          passing: validate(queryObject),
          description: description,
          queryObject: queryObject,
          queryJson: JSON.stringify(queryObject),
        }
        results = [...results, validationResult]
      })
      console.table(results.map(result => ({
        file: result.file,
        description: result.description,
        passing: result.passing,
        // queryObject: JSON.stringify(result.queryObject)
      })))
      results.forEach(result => {
        if (result.passing) {
          console.log('description:', result.description)
          console.log(' obj -> qs:', objectToQuerystring(result.queryObject))
          console.log('            = result.description?', objectToQuerystring(result.queryObject) === `(${result.description})`)
          console.log(' qs -> obj:', querystringToObject(result.description))
          console.log('            = result.queryJson?', querystringToObject(result.description) === `(${result.queryJson})`)
          console.log()
        }
      })
    })
    .catch(console.error)

})();
