"use strict";
let character = 'mfdso';
console.log(character);
//const inputs = document.querySelectorAll('input');
//console.log(inputs);
const circ = (diameter) => {
    return diameter * Math.PI;
};
console.log(circ(59));
let names = ['luigi', 'hello'];
names.push('toad');
let numbers = [1, 2, 3, 45];
//numbers.push('hello');/*you can not push something which is not a number because it is not declared with strings
numbers.push(23);
console.log(numbers);
let mixed = ['ken', 4, 'chun-li', true]; //for here you can add anything because all data types are declared in it
mixed.push('hello');
console.log(mixed);
/*objects */
let ninja = {
    name: 'mario',
    belt: 'black',
    age: 30
};
ninja.age = 40;
ninja.name = 'ryu';
//ninja.skills = 'hello' you can not set this because it was not first declared with it
console.log(ninja);
ninja = {
    name: 'hello',
    belt: 'orange',
    age: 50
};
// you can do this also but you can not change the property only the values so it is inchangeable
console.log(ninja);
let color; // this is to set that the variable will be string
let agee; // the same as this
let isloggeIn;
let ninjas = []; //this means that the the array is a string array
ninjas.push('hello');
let mixedd = []; // this means that the array will accept string or numbers
mixedd.push('hello');
mixedd.push(20); //this can happen due to the one above
let uid; //this can be string or a number and no error
uid = '123';
uid = 123;
console.log(uid);
let ninjaTwo;
ninjaTwo = { name: 'mario', age: 20, beltcolour: 'black' };
console.log(ninjaTwo);
//functions in typescript are the best
let greet; // this means that greet will be a function
greet = () => {
    console.log('hello, again');
};
const add = (a, b) => {
    return (a + b);
};
console.log(add(5, 10));
// adding optional parameters in typescript
let hello = (a, b, c) => {
    return (a + b);
};
console.log(hello(1, 2));
// initializing the parameter 
hello = (a, b, c = 7) => {
    return a + b + c;
};
console.log(hello(1, 2));
// commanding the return type
let learn = (a, b, c) => {
    return a + b + c;
};
console.log(hello(1, 2, 3));
let thefunction = (user) => {
    console.log('el');
};
thefunction({ name: 1, b: 3 });
//function signatures
let gret; // this means it will return a void answer
gret = (name, c) => {
    console.log(`${name} is different from ${c}`);
    return name + c; /* it can not return anything only just number*/
};
console.log(gret(1, 3));
