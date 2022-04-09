import { readFile } from 'fs/promises'

export const readJSONFile = async path => JSON.parse(
  await readFile(
    new URL(path, import.meta.url)
  )
)

