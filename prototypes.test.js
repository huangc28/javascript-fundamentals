describe('javascript function / object various traits', () => {
  test('where is __proto__ property?', () => {
    // Object has __proto__ property
    const a = {
      name: 'Bryan Huang'
    }
    expect(a).toHaveProperty('__proto__')

    // Function has __proto__ property
    function Human () {}
    expect(Human).toHaveProperty('__proto__')

    // Array has __proto__ property
    const testArr = []
    expect(testArr).toHaveProperty('__proto__')
  })

  test('ok, it seem like object, function and array they all have __proto__ property, but what are they pointing to?', () => {

    // The __proto__ property of Function is pointing to Function prototype.
    expect(Function.__proto__).toEqual(Function.prototype)

    // The __proto__ property of Object is pointing to Object prototype
    const a = {
      name: 'Bryan Huang'
    }
    expect(a.__proto__).toEqual(Object.prototype)

    // A named function's __proto__ property is pointing to Function prototype
    function Human () {}
    expect(Human.__proto__).toEqual(Function.prototype)

    // An Array's __proto__ property is pointing to Array prototype
    const testArr = []
    expect(testArr.__proto__).toEqual(Array.prototype)
  })

  test('prototype linkage', () => {
    function foo (name) {
      this.name = name
    }

    // __proto__ indicates prototype linkage
    console.log(foo.prototype.__proto__.constructor)

    var a = new foo('bryan')
    console.log(a.__proto__.constructor === foo)
    console.log(a.__proto__ === foo.prototype)
    console.log(a.name)
    console.log(a.hasOwnProperty('name'))
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

    // Object and array does not have prototype property. Named function has a prototype property.
  })

  test('now I understand function can have both __proto__ and prototype. what about function constructor? what are they? and where are they', () => {
    // The constructor of a function is pointing to Function.constructor
    function Human () {}
    expect(Human.constructor).toEqual(Function)
    expect(Human.prototype.constructor).toEqual(Human)

    // The constructor of object a equals to 'Object' function
    // It seems like object literal is created by 'Object' function
    var a = {
      name: 'bryan'
    }
    expect(a.constructor).toEqual(Object)

    // Object constructor is pointing to Function constructor
    // since Object itself is a constructor.
    expect(Object.constructor).toEqual(Function)

    expect(Function.constructor).toEqual(Function)

    // So the named function "Human" has constructor property on itself and prototype.
    // The constructor on "Human" function is pointing to Function constructor whereas
    // the constructor on "prototype" property is pointing to Human itself
    //
    //   Human.constructor ---> Function.constructor
    //   Human.prototype.constructor ---> Human
    //
    // Since object literal is an instantiation from Object function, it's constructor is pointing to object function
    //
    //   a.constructor ---> Object
    //
    // Object function's constructor is pointing to Function
    //
    //   Object.constructor ---> Function.constructor
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