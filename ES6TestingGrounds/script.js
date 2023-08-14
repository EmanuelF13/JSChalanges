"use strict"; // prevent `this` from being boxed into the wrapper object
/*
//ES5
var names5 = 'James Smith';
var age5 = 23;
names5 = 'James Miller';
console.log(names5);

//ES6
const names6 = 'James Smith';
let age6 = 23;
names6 = 'James Miller';
age6 = 25;
console.log(names6);
console.log(age6);

*/


/*
///Exemple of let being block scoped and not function scoped like var
//ES5
function driverLicense5 (passedTest){
    if(passedTest){
        var firstName = 'John';
        var yearOfBirth =1990;    
    }
    console.log(`${firstName} is borned in ${yearOfBirth} and can now drive!`);
}
driverLicense5(true);

//ES6
function driverLicense6 (passedTest){
    if(passedTest){
        let firstName = 'John';
        const yearOfBirth =1990;       
    }
    //Expected error : Uncaught ReferenceError: firstName is not defined
    console.log(`${firstName} is borned in ${yearOfBirth} and can now drive!`);
}
driverLicense6(true);
*/

/*

let firstName ='John';
let lastName= 'Smith';
const yearOfBirth= 1980;

function calcAge(year){
    let currYear=new Date().getFullYear();
    return currYear - year;
}

//ES6

console.log (`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years.`);

*/

/*

const years = [1990, 1965, 1982, 1937];

//ES5
var ages5 = years.map(function(el) {
 return new Date().getFullYear() -el;
});
console.log(ages5);

//ES6
let ages6= years.map(el => new Date().getFullYear()- el);
console.log(ages6);

ages6 =years.map((el, index)=> `Age element ${index+1}: ${new Date().getFullYear() - el}.`);
console.log(ages6);
*/

//ES5 -> this diferences

var box5 = {
    color: 'green',
    position: 1,
    clickMe: function (){
        var  self = this;
        document.querySelector('.green').addEventListener('click', function () {
            //we do this cause this points to windows not to this document;


           // var str = `This is box  number ${self.position} and it's ${self.color}`;
           var str= "This is box number " + self.position + " and it is " + self.color +"\n";
           str+= "This is box number " + this.position + " and it is " + this.color;
            alert(str);
        });
    }

};

//box5.clickMe();

/*
//This points inside the function and selects directly the proprities values
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function (){
        document.querySelector('.green').addEventListener('click',  () => {
              const str = `This is box  number ${this.position} and it's ${this.color}`;
            alert(str);
        });
    }

};


///This goes global again(this points to window)
const box66 = {
    color: 'green',
    position: 1,
    clickMe:  () => {
        let self = this;
        document.querySelector('.green').addEventListener('click',  () => {
            //Cause this points to window we wont fin position and color
              let str = `This is box  number ${this.position} and it's ${this.color} \n`;
              str += `This is box  number ${self.position} and it's ${self.color} \n`;
            alert(str);
        });
    }

};

box66.clickMe();
*/

function  Persone(name) {
    this.name =name;
}



//////////////////////////////////////////////////////

/*
function Car(type, fuelType){
	this.type = type;
	this.fuelType = fuelType;
}

function setBrand(brand){
	Car.call(this, "convertible", "petrol");
	this.brand = brand;
	console.log(`Car details = `, this);
}

function definePrice(price){
	Car.call(this, "convertible", "diesel");
	this.price = price;
	console.log(`Car details = `, this);
}

const newBrand = new setBrand('Brand1');
const newCarPrice = new definePrice(100000);

*/
//console.log(newBrand);
//console.log(newCarPrice);

/*
Apply is similar to the call function. The only difference is that in apply you can pass an array as an argument list.
*/

/*
function Car(type, fuelType){
	this.type = type;
	this.fuelType = fuelType;
}

function setBrand(brand){
	Car.apply(this, ["convertible", "petrol"]); //Syntax with array literal
	this.brand = brand;
	console.log(`Car details = `, this);
}

function definePrice(price){
	Car.apply(this, new Array("convertible", "diesel")); //Syntax with array object construction
	this.price = price;
	console.log(`Car details = `, this);
}

const newBrand1 = new setBrand('Brand1');
const newCarPrice1 = new definePrice(100000);

*/

///////////////////////

//ES5
/*
Bind is a function that helps you create another function that you can execute later with the new context of this that is provided.
*/

/*
Persone.prototype.myFriends5 = function(friends) {
    var arr = friends.map(function (el)
    {   
        //because 'this' points to window and not the function this wont work
        //        return this.name + 'is firends with ' + el;
        return this.name + ' is firends with ' + el;
     // by using bind this   will bind this to this function
    }.bind(this));
    console.log(arr);
}

var friends = ['Bon', 'Jane', 'Mark'];

new Persone('John').myFriends5(friends);

//ES6
Persone.prototype.myFriends6 = function (friends)  {
    var arr = friends.map((el) => `${this.name} is friends with ${el}`);
     console.log(arr);
}


new Persone('Matiu').myFriends6(friends);
*/

/*
//ES5
var john = ['John', 26];
//var name = john[0];
//var age = john [1];

//ES6
const [name, year] = ['John', 26];
console.log(name);
console.log(year);

const obj ={
    firstName: 'John',
    lastName: 'Smith',   
};

const {firstName, lastName}= obj;

console.log(firstName);
console.log(lastName);

const {firstName : a, lastName: b} = obj;
console.log(a);
console.log(b);

function calcAgeRetirment(year){
    const age= new Date().getFullYear() - year;
    return [age, 65 -age];
}

const [old, retirement] = calcAgeRetirment(1988);
console.log(old);
console.log(retirement);
*/


//returns a list
const boxes= document.querySelectorAll('.box');

//ES5

var boxesArr5=Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(curr) {
    curr.style.backgroundColor = 'dodgerblue';
});


//ES6

Array.from(boxes).forEach( curr => curr.style.backgroundColor = 'violet');


/*
//Problem with for  is that we cannot break it

//ES 5
for (var i= 0; i< boxesArr5.length; i++){
    if (boxesArr5[i].className === 'box blue'){
        continue; 
    }
    boxesArr5[i].textContent= 'I changed to blue';
    boxesArr5[i].style.backgroundColor='blue';
}
*/

//ES6
const boxArr6 = Array.from(boxes);
for(const curr of boxArr6){
    if(curr.className.includes('blue')){continue;}
    curr.textContent= 'I changed to blue';
    curr.style.backgroundColor= 'blue';
}

//ES6
var ages = [12, 17, 8,21,14, 11];
console.log (ages.findIndex(cur => cur >=18));
console.log(ages.find(curr => curr > 18));