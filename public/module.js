(function () {
	'use strict';

	// Class

	class Animal {
		constructor (options) {
			this.name = options.name;
			console.log('Creating new instance!');
		}

		sayHello () {
			console.log(`Hello! I am ${this.name}`);
		}
	}


	class Dog extends Animal {
		constructor (options) {
			super(options);

			this.someField = 'foo';
		}

		bark () {
			super.sayHello();
			console.log('Woff-woff!')
		}

		static catchDog (dog) {
			Dog.__instances.push(dog);
		}

	}

	Dog.__instances = [];

	let bob = new Dog({ // Creating new instance!
		name: 'Bob'
	});

	Dog.catchDog(bob);
	Dog.someField; // undefind

	bob.bark();
	bob.someField; // foo


})();
