describe('what is javascript this?', () => {
  test('this and object', () => {
    let user = {
      age: 31,
      name: 'Bryan Huang',
      sayName: function () {
        return 'my name is ' + this.name
      }
    }

    // we can also pre-declare a function and assigned to the object
    function sayAge () {
      return 'my age is ' + this.age
    }

    user.sayAge = sayAge

    expect(user.sayName()).toEqual('my name is Bryan Huang')
    expect(user.sayAge()).toEqual('my age is 31')
  })

  test('why can\'t we just use user.name and user.age instead of this?', () => {
    let user = {
      age: 31,
      name: 'Bryan Huang',
      sayName: function () {
        return 'my name is ' + user.name
      }
    }

    // but what if we are assigning the user to other variable?
    var admin = user
    user = null
    expect(() => {
      admin.sayName()
    }).toThrow('Cannot read property \'name\' of null')
  })

  test('the value of this is evaluated during the run-time which means it can have different context depending on the invoking object', () => {
    let user = { name: 'Bryan' }
    let admin = { name: 'jason' }

    function sayHi () {
      return this.name
    }

    user.sayHi = sayHi
    admin.sayHi = sayHi

    expect(user.sayHi()).toEqual('Bryan')
    expect(admin.sayHi()).toEqual('jason')
  })

  test('what if a function is being called without an object?', () => {
    function sayHi() {
      expect(this).toEqual(global)
    }

    sayHi()
  })

  test('task one', () => {
    expect(() => {
      let user = {
        name: 'John',
        go: function () {
          console.log(this === global)
        }
      }

      (user.go)()

      // This happens because we did not specify semi-column on user object.
      // Javascript engine sees it as "let user = { ... }(user.go)()"
    }).toThrow('user is not defined')

  })
})