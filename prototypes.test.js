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

    expect(Function.__proto__).toEqual(Function.prototype)
    const a = {
      name: 'Bryan Huang'
    }
    expect(a.__proto__).toEqual(Object.prototype)

    function Human () {}
    expect(Human.__proto__).toEqual(Function.prototype)

    const testArr = []
    expect(testArr.__proto__).toEqual(Array.prototype)

    // __proto__ property is also known as "prototype linkage". The __proto__ property is an accessor to "prototype" property.
    //
    //  - The __proto__ property of Function is pointing to Function prototype.
    //  - The __proto__ property of Object is pointing to Object prototype
    //  - A named function's __proto__ property is pointing to Function prototype
    //  - An Array's __proto__ property is pointing to Array prototype
  })

  test('The behavior of __proto__, prototype linkage and the \'new\' keyword', () => {
    function foo (name) {
      this.name = name
    }

    // foo's __proto__ is pointing to Function's prototype object
    // foo.__proto__ ---> Function.prototype
    // foo.prototype.constructor ---> foo
    expect(foo.__proto__).toEqual(Function.prototype)
    expect(foo.prototype.__proto__).toEqual(Object.prototype) // foo and Object is prototypal inherited via prototype linkage "__proto__"
    expect(foo.prototype.__proto__.constructor).toEqual(Object.prototype.constructor)
    expect(foo.prototype.__proto__.constructor).toEqual(Object)
    expect(foo.prototype.constructor).toEqual(foo)

    var bar = new foo('Bryan')
    expect(bar.__proto__).toEqual(foo.prototype)
    expect(bar.prototype).toBeUndefined()

    // notice that "bar" does not have a "constructor" property. Javascript engine searches for "constructor"
    // through the protype chain. "constructor" is not found in bar itself, js engine continue searching
    // foo's prototype since "bar" and "foo" are now connected via prototype linkage '__proto__'. "constructor"
    // is found in foo's prototype.
    expect(bar.constructor).toBe(foo)
    expect(bar.__proto__.constructor).toBe(foo)
    expect(bar.hasOwnProperty('name')).toBeTruthy()

    var baz = new foo('Jason')
    expect(baz.__proto__).toEqual(bar.__proto__)
    expect(baz.__proto__).toEqual(foo.prototype)
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

    expect(Object.constructor).toEqual(Function)
    expect(Object.__proto__).toEqual(Function.prototype)
    expect(Object.prototype.__proto__).toBeNull()
    expect(Object.prototype.constructor).toEqual(Object)
    
    expect(Function.constructor).toEqual(Function)
    expect(Function.prototype.constructor).toEqual(Function)
    expect(Function.prototype.__proto__).toEqual(Object.prototype)

    // So the named function "Human" has "constructor" property on itself and it's prototype.
    //
    //   Human.constructor ---> Function
    //   Human.prototype.constructor ---> Human
    //
    // The constructor on prototype of "Human" function is pointing to Function constructor whereas
    // the constructor on "prototype" property is pointing back to Human
    //
    // Since object literal is an instantiation from Object function, it's constructor on prototype object is pointing to Object function
    //
    //   a.constructor ---> Object
    //
    // Object function's constructor is pointing to Function
    //
    //   Object.constructor ---> Function.constructor
  })

  test('what is shadowing?', () => {
    function Human (name) {
      this.name = name
    }

    // added an method on prototype object
    Human.prototype.sayName = function () {
      console.log('my name on prototype object' + this.name)
    }

    var a = new Human('Bryan')
    a.sayName()

    // added another method on Human itself
    a.sayName = function () {
      console.log('my name on object' + this.name)
    }

    a.sayName()
    
    // "sayName" method on Object "a" is shadowing "sayName" method in "prototype" object.
  })
})