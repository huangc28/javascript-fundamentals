describe('what is prototypal inheritance? And how to implement it?', () => {
  test('Prototypal inheritance via prototype linkage', () => {
    // If object a extends object b, a is able to use all methods(except private) that is defined in b.
    var b = {
      firstName: 'jason',
      lastname: 'Huang',
      myLastname: function () {
        console.log(this.lastname)
        return this.lastname
      },

      myFirstname: function () {
        console.log(this.firstName)
        return this.firstName
      }
    }

    var a = {
      firstName: 'Bryan',
      lastName: 'kuo',
      myName: function () {
        console.log(this.lastName + ' ' + this.firstName)
      }
    }

    a.__proto__ = b

    expect(a.myFirstname()).toEqual(a.firstName)
    // Object a does not have "myFirstname" method, so js engine looks up the prototype chain
    // and search "myFirstname" method in b. "myFirstname" method is found in b thus gets executed
    // in the context of a.
  })

  test('javascript prototypal inheritance -- The old way', () => {
    function object (obj) {
      function F () {}
      F.prototype = obj
      return new F // if you are not familiar with the "new" operator, please refer to new_operator.test.js
    }

    var animal = {
        legs: 4,
        walk: function() {
            console.log('walking on ' + this.legs + ' legs');
        }
    }

    var bird = object(animal);
    bird.legs = 2;
    bird.fly = function() {
      console.log('flying');
    }
  })

  test('A standard way to implement prototypal inheritance', () => {
    // There is a standard way to implment object inheritance using
    // Object create method. It accepts two arguments.
    var animal = {
      legs: 4,
      walk: function () {
        return 'walking on ' + this.legs + ' legs'
      }
    }

    // animal will be prototype linkage to bird. In other words,
    // bird's prototype (via __proto__) would be animal object.
    var bird = Object.create(animal, {
        legs: {
          value: 2
        },
        fly: {
          value: function () {
            console.log('flying')
          }
        }
    });

    expect(bird.walk()).toEqual('walking on 2 legs')
  })
})