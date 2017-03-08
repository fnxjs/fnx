import { computed as typedComputed } from '../src/api/computed'
import { types } from '../src/core'
import * as Errors from '../src/errors'
import { catchErrType } from './testHelpers'

const computed = typedComputed as any

describe('computed', () => {

  it('should be a function', () => {
    const actual = typeof computed
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should throw `InvalidComputedUsage` with zero parameters', () => {
    const actual = catchErrType(() => computed())
    const expected = Errors.InvalidComputedUsage

    expect(actual).toBe(expected)
  })

  it('should throw `InvalidComputedUsage` with two or more parameters', () => {
    const actual = catchErrType(() => computed(() => 0, 'second'))
    const expected = Errors.InvalidComputedUsage

    expect(actual).toBe(expected)
  })

  it('should throw `InvalidComputedUsage` with parameter of type "string"', () => {
    const actual = catchErrType(() => computed('string'))
    const expected = Errors.InvalidComputedUsage

    expect(actual).toBe(expected)
  })

  it('should throw `InvalidComputedUsage` with parameter of type "number"', () => {
    const actual = catchErrType(() => computed(0))
    const expected = Errors.InvalidComputedUsage

    expect(actual).toBe(expected)
  })

  it('should throw `InvalidComputedUsage` with parameter of type "boolean"', () => {
    const actual = catchErrType(() => computed(true))
    const expected = Errors.InvalidComputedUsage

    expect(actual).toBe(expected)
  })

  it('should throw `InvalidComputedUsage` with parameter of type "object"', () => {
    const actual = catchErrType(() => computed({}))
    const expected = Errors.InvalidComputedUsage

    expect(actual).toBe(expected)
  })

  it('should return a computed descriptor', () => {
    const fn = () => 0
    const actual = computed(fn)
    const expected = { type: types.computed, fn }

    expect(actual).toEqual(expected)
  })

})