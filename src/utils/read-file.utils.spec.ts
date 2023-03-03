import fs from 'fs'
import { beforeEach, afterEach, describe, expect, it } from 'vitest'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { returnLinesFromFileSync } from './read-file.utils'

const __dirname = dirname(fileURLToPath(import.meta.url))
const filePath = `${__dirname}/mock.txt`

describe('read-file.utils', () => {
  beforeEach(() => {
    const data = 'foo\nbar\nbaz'
    fs.writeFileSync(filePath, data)
  })

  afterEach(() => {
    fs.unlinkSync(filePath)
  })

  it('should return content separate by new line', () => {
    const data = returnLinesFromFileSync(filePath)

    expect(data).toEqual(['foo', 'bar', 'baz'])
  })
})
