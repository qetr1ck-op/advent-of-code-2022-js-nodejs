import fs from 'fs'

export function returnLinesFromFileSync(filePath: string) {
  const allFileContents = fs.readFileSync(filePath, 'utf-8')
  let contentByLines: string[] = []

  allFileContents.split(/\r?\n/).forEach((line: string) => {
    contentByLines.push(line)
  })

  return contentByLines
}
