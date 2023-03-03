import { beforeEach, afterEach, describe, expect, it } from 'vitest'
import { findUniqueSignal } from '.'

describe('06', () => {
  it('task 1: find correct position of marker', () => {
    expect(findUniqueSignal('bvwbjplbgvbhsrlpgdmjqwftvncz', 4)).toHaveProperty('resultIndex', 5)
    expect(findUniqueSignal('nppdvjthqldpwncqszvftbrmjlhg', 4)).toHaveProperty('resultIndex', 6)
    expect(findUniqueSignal('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4)).toHaveProperty('resultIndex', 10)
    expect(findUniqueSignal('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4)).toHaveProperty('resultIndex', 11)
  })

  it('task 2: find correct position of marker', () => {
    expect(findUniqueSignal('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).toHaveProperty('resultIndex', 19)
    expect(findUniqueSignal('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).toHaveProperty('resultIndex', 23)
    expect(findUniqueSignal('nppdvjthqldpwncqszvftbrmjlhg', 14)).toHaveProperty('resultIndex', 23)
    expect(findUniqueSignal('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)).toHaveProperty('resultIndex', 29)
    expect(findUniqueSignal('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)).toHaveProperty('resultIndex', 26)
  })
})
