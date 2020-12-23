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

  test('prototype linkage via Object.create', () => {
    let head = {
      glasses: 1
    };

    let table = {
      pen: 3
    };

    let bed = {
      sheet: 1,
      pillow: 2
    };

    let pockets = {
      money: 2000
    };

    Object.setPrototypeOf(pockets, bed)
    Object.setPrototypeOf(bed, table)
    Object.setPrototypeOf(table, head)

    expect(pockets.pen).toEqual(3)
  })

  test('what is the value of "this"?', () => {
    let animal = {
      eat() {
        this.full = true;
      }
    };

    let rabbit = {
      __proto__: animal
    };

    rabbit.eat();

    expect(rabbit.hasOwnProperty('full')).toBeTruthy()
    expect(rabbit.full).toBeTruthy()
  })

  test('Why are both hamsters full?', () => {
    let hamster = {
      stomach: [],

      eat(food) {
        this.stomach.push(food);
      }
    };

    let speedy = {
      stomach: [],
      __proto__: hamster
    };

    let lazy = {
      stomach: [],
      __proto__: hamster
    };

    // This one found the food
    speedy.eat("apple");
    //lazy.eat()

    // This one also has it, why? fix please.
    expect(lazy.stomach.length).toEqual(0)
    expect(speedy.stomach.length).toEqual(1)
  })
})
