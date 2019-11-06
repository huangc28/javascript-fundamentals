describe('javascript function / object various traits', () => {
  test('where is __proto__ property?', () => {
    const a = {
      name: 'Bryan Huang'
    }
    expect(a).toHaveProperty('__proto__')

    function Human () {}
    expect(Human).toHaveProperty('__proto__')

    const testArr = []
    expect(testArr).toHaveProperty('__proto__')
  })

  test('ok, it seem like object, function and array they all have __proto__ property, but what are they pointing to?', () => {
    const a = {
      name: 'Bryan Huang'
    }
    expect(a.__proto__).toEqual(Object.prototype)

    function Human () {}
    expect(Human.__proto__).toEqual(Function.prototype)

    const testArr = []
    expect(testArr.__proto__).toEqual(Array.prototype)
  })

  test('what about \'prototype\' property? where are they?', () => {
    const a = {
      name: 'Bryan Huang'
    }
    expect(a.prototype).toBeUndefined()

    function Human () {}
    expect(Human).toHaveProperty('prototype')

    const testArr = []
    expect(testArr.prototype).toBeUndefined()
  })

  test('now I understand function can have both __proto__ and prototype. what about constructor? what are they?', () => {
    function Human () {}
    console.log(Human.constructor === Function.constructor)
  })

  xtest('what is the difference between __proto__ and prototype', () => {
    // The __proto__ getter function exposes the value of the internal [[Prototype]] of an object.
    // For objects created using an object literal, this value is Object.prototype:
    const a = {
      name: 'Bryan Huang'
    }
    expect(a.__proto__).toEqual(Object.prototype)
    expect(typeof a.__proto__).toBe('object')

    // object do not have prototype:
    expect(a.prototype).toBeUndefined()

    // For objects created using array literals, the value of __proto__ is Array.prototype
    const testArr = []
    expect(testArr.__proto__).toEqual(Array.prototype)

    // object has __proto__ but not prototype, where as function has both prototype and __proto__.
    // we are expecting testFunc to have the following properties:
    //   testFunc
    //     - firstName
    //     - lastName
    //     - prototype
    //     - __proto__
    //     - constructor
    function testFunc (firstName, lastName) {
      this.firstName = firstName
      this.lastName = lastName
    }

    // constructor function "testFunc" has both "prototype" and __proto__. they are both objects.
    // For function, the vlaue of __proto__ is Function.prototype
    expect(testFunc.prototype).toEqual({})
    expect(testFunc.__proto__).toEqual(Function.prototype)

    // the prototype of "testFunc" contains 2 properties, constructor and __proto__.
    // "constructor" is pointing to testFunc function itself
  })
})