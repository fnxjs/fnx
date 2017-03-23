import { boolean, createObservable, mapOf, number, object, string, complex } from '../src/fnx'

/**
 * Use this file for constructing new test suites without having to worry about
 * running all the tests every single time.
 *
 * Run with `yarn run test-dev`
 */

test('toString should work', () => {
  class Example {
    foo = string
  }

  class State {
    str = string
    bool = boolean
    num = number
    obj = object(Example)
    mp = mapOf(string)
  }

  const state = createObservable(State, {
    str: 'hi', bool: false, num: 0, obj: { foo: 'foo' }, mp: { }
  })

  const actual = state.toString()
  const expected = '{"str":"hi","bool":false,"num":0,"obj":{"foo":"foo"},"mp":{}}'

  expect(actual).toBe(expected)
})

test('toString should work with complex types', () => {
  class Example {
    foo = complex((d: Date) => ({ date: d.toUTCString() }), v => new Date(v.date))
  }

  class State {
    str = string
    bool = boolean
    num = number
    obj = object(Example)
    mp = mapOf(string)
  }

  const state = createObservable(State, {
    str: 'hi', bool: false, num: 0, obj: { foo: new Date(100) }, mp: { }
  })

  const actual = state.toString()
  const expected =
    '{"str":"hi","bool":false,"num":0,"obj":{"foo":' +
    '{"date":"Thu, 01 Jan 1970 00:00:00 GMT"}},"mp":{}}'

  expect(actual).toBe(expected)
})
