import path from 'path'
import { readdir, readFile } from 'fs/promises'
import Ajv from 'ajv'
// import { schema } from './schema.js'

const ajv = new Ajv({
  allowUnionTypes: true,
  strictTypes: true,
})

const readJSONFile = async path => JSON.parse(
  await readFile(
    new URL(path, import.meta.url)
  )
)

//

console.clear();

(async () => {
  const schema = await readJSONFile(path.join(process.cwd(), 'schema.json'))

  const validate = ajv.compile(schema)

  const testFilenames = await readdir(path.join(process.cwd(), 'test'))

  console.log(`Found ${ testFilenames.length } test files.`)

  const promises = testFilenames.map(async filename => await readJSONFile(path.join(process.cwd(), 'test', filename)))

  Promise.all(promises).then(data => {
    let results = []
    data.forEach((json, i) => {
      results = [...results, {
        file: testFilenames[i],
        valid: validate(json),
      }]
    })
    console.table(results)
  }).catch(console.error)


})();
