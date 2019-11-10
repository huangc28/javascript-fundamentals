describe('javascript new operator behavior', () => {
  test('implement javascript new operator', () => {
    // The new operator does the following things behind the scenes
    //   - It creates a simple object
    //   - Assigned the prototype of the constructor function to prototype linkage(__proto__) of the newly created object
    //   - set the context (this) of constructor function to be the newly created object. Moreover, pass the constructor arguments to the constructor function
    //   - returns the newly created object.

    function New (constructor) {
      var obj = {}
      Object.setPrototypeOf(obj, constructor.prototype)
      var argsArr = Array.prototype.slice.apply(arguments)
      return constructor.apply(obj, argsArr.slice(1)) || obj
    }

    // Let's try our New implementation
    function Person (saying) {
      this.saying = saying
    }

    Person.prototype.talk = function () {
      return 'I say ' + this.saying
    }

    var a = New(Person, 'i\'m sleepy')
    expect(a.talk()).toEqual('I say i\'m sleepy')

    // The reason that why we have constructor.apply(obj, argsArr.slice(1)) || obj
    // is because we have to consider if the constructor function returns a customed
    // object instead of the default one.
    // Thus, if constructor function returns an object, new operator should return that object
    // straight ahead, otherwise, returns the newly created object.
  })
})
