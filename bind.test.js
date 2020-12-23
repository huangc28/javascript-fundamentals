describe('function binding', () => {
  test('bind multiple argument', () => {
    const someFunc = (a, b, c) => a + b + c

    const someFuncA = someFunc.bind(null, 1)
    const someFuncB = someFuncA.bind(null, 2)
    const res = someFuncB(3)
    console.log('debug', res)
  })
})
