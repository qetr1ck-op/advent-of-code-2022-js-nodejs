import { returnLinesFromFileSync } from '../utils/read-file.utils'

function hasDuplicates(array: any[]) {
  return new Set(array).size !== array.length
}

export function findUniqueSignal(input: string, uniqueArrayLength: number) {
  const inputArray = [...input]

  let resultArray: string[] = []
  let resultIndex: number = 0

  for (let index = 0; index < inputArray.length; index++) {
    const value = inputArray[index]

    if (resultArray.length < uniqueArrayLength) {
      resultArray.push(value)
      continue
    }

    if (hasDuplicates(resultArray)) {
      resultArray = [...resultArray.slice(1), value]
      continue
    }

    resultIndex = index
    break
  }

  return { resultArray, resultIndex }
}

function main() {
  const [input] = returnLinesFromFileSync('./src/06/input.txt')

  console.log({ 'task 06.1': findUniqueSignal(input, 4) })
  console.log({ 'task 06.2': findUniqueSignal(input, 14) })
}

main()
