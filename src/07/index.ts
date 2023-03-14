import { returnLinesFromFileSync } from '../utils/read-file.utils'

type Command = '$ cd' | '$ ls'
type Output = string
type Instruction = Command | Output

type FoldersTree = {
  [folder: string]: number | FoldersTree
}

export const buildFoldersTree = (data: Instruction[]) => {
  const setPath = (path: string[], value: number, obj: FoldersTree) => {
    let iter = obj
    for (const folder of path.slice(0, -1)) {
      if (!iter[folder]) {
        iter[folder] = {}
      }
      iter = iter[folder] as FoldersTree
    }
    iter[path.slice(-1)[0]] = value
  }

  const treeData: FoldersTree = {}
  let currentPath: string[] = []

  data.forEach((instruction) => {
    const tokens = instruction.split(' ')

    if (tokens[0] === '$') {
      if (tokens[1] === 'cd') {
        if (tokens[2] === '/') {
          currentPath = []
        } else if (tokens[2] === '..') {
          currentPath.pop()
        } else {
          currentPath.push(tokens[2])
        }
      }
    } else if (tokens[0] === 'dir') {
      // do nothing
    } else {
      setPath([...currentPath, tokens[1]], Number(tokens[0]), treeData)
    }
  })

  return treeData
}

type FolderSizes = Map<string, number>

export const createFolderSizes = (tree: FoldersTree) => {
  const folderSizes = new Map<string, number>()

  const calculateSize = (obj: FoldersTree, currentPath = ['.']) => {
    let size = 0

    for (const [key, value] of Object.entries(obj)) {
      size += typeof value === 'object' ? calculateSize(value, [...currentPath, key]) : value
    }

    folderSizes.set(currentPath.join('/'), size)

    return size
  }

  calculateSize(tree)

  return folderSizes
}

export function getMinFolderSpaceToDelete(folderSizes: FolderSizes): number | undefined {
  const TOTAL_SPACE = 70_000_000
  const SPACE_FOR_UPDATE = 30_000_000
  const minRequiredSpace = SPACE_FOR_UPDATE - (TOTAL_SPACE - (folderSizes.get('.') ?? 0))

  return Array.from(folderSizes.values())
    .sort((a, b) => a - b)
    .find((size) => size >= minRequiredSpace)
}

export function calculateFoldersSpace(folderSizes: FolderSizes, atMost: number) {
  return Array.from(folderSizes.values())
    .filter((size) => size <= atMost)
    .reduce((acc, el) => acc + el, 0)
}

function main() {
  const input = returnLinesFromFileSync('./src/07/input.txt')

  const treeData = buildFoldersTree(input)

  const folderSizes = createFolderSizes(treeData)

  console.log({ 'task 7.1': calculateFoldersSpace(folderSizes, 100_000) })
  console.log({ 'task 7.2': getMinFolderSpaceToDelete(folderSizes) })
}

main()
