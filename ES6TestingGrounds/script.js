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
        var  self =this;
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

box6.clickMe();