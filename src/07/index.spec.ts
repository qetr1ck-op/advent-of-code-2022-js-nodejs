import { beforeEach, afterEach, describe, expect, it } from 'vitest'
import { buildFoldersTree, calculateFoldersSpace, createFolderSizes } from '.'
import { getMinFolderSpaceToDelete } from '.'

const input = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`

const expectedTree = {
  'b.txt': 14848514,
  'c.dat': 8504156,
  a: { f: 29116, g: 2557, 'h.lst': 62596, e: { i: 584 } },
  d: { j: 4060174, 'd.log': 8033020, 'd.ext': 5626152, k: 7214296 },
}

const expectedFolderSizes = { './a/e': 584, './a': 94853, './d': 24933642, '.': 48381165 }

let instructions: string[]
let tree: any
let folderSizes: any

describe('07', () => {
  beforeEach(() => {
    instructions = input.trim().split('\n')
    tree = buildFoldersTree(instructions)
    folderSizes = createFolderSizes(tree)
  })

  it('task 7: should create folders tree based on instructions', () => {
    expect(tree).toStrictEqual(expectedTree)
  })

  it('task 7: should create flat folders sizes', () => {
    expect(Object.fromEntries(folderSizes)).toStrictEqual(expectedFolderSizes)
  })

  it('task 7.1: should sum size of folders based on instructions', () => {
    const size = calculateFoldersSpace(folderSizes, 100_000)

    expect(size).toEqual(95437)
  })

  it('task 7.2: should find folder to delete with minimum space', () => {
    const size = getMinFolderSpaceToDelete(folderSizes)

    expect(size).toEqual(expectedFolderSizes['./d'])
  })
})
