"use strict";
/*
//function constructor

var john ={
    name: 'John',
    yearOfBirth : 1990,
    job : 'teacher'
};

var Person = function (name, yearOfBirth,job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

//instanciation
var john = new Person ('John', 1990, 'teacher');

*/

//Object.create
/*
var personProto ={
 calculateAge:  function() {
    console.log(2023 - this.yearOfBirth);
 }
};
var john =Object.create(personProto);
john.name='John';
john.job='teacher';
john.yearOfBirth=1998;
var jane= Object.create(personProto,
    {
       name: {value: 'Jane'},
       yearOfBirth : {value: 1969},
       job: {value: 'designer'} 
    });
    */

   //Primitive vs Objects
   /*
   var a =23;
   var b = a;
   a = 46;
   console.log(a);
   console.log(b);

   var obj1 = {
    name: 'John',
    age: 26
   }
   var obj2=obj1;
   obj1.age=68;
   console.log(obj1.age);
   console.log(obj2.age);
*/
//Functions As argument
/*
var years= [1998, 1965, 1937, 2005, 1988,2020];

function arrrayCalc(arr,fn){
    var result=[];
    for(var i = 0; i < arr.length; i++)
    {
    result.push(fn(arr[i]));
    }
return result;
}
var currentTime = new Date();
var currentYear = currentTime.getFullYear();

function calculateAge(el)
{
    return currentYear - el;
}



function isFullAge(el){
 return el >= 18;
}

function maxHeartRate(el){
    if(el>=18 && el<= 81){
        return Math.round(206.9 -(0.67 * el));
    }
    return -1;
   
}

var ages = arrrayCalc(years,calculateAge);
var adultsAges = arrrayCalc(ages,isFullAge);
var  rates = arrrayCalc(ages, maxHeartRate);
console.log(ages);
console.log(adultsAges);
console.log(rates);
*/

//Returning Functions
/*
function interviewQuestion(job) {
    if(job === 'designer') {
        return function(name) {
            console.log(name + ' can you please what is your UX design is?');
        }
    }else if(job === 'teacher') {
        return function (name){
            console.log ('What subject can you teach ' + name + '?');
        }
    } 
    return function (name){
        console.log( name + ' what do you do?');
    }

}

var plumerQuestion = interviewQuestion('plumer');
var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');
plumerQuestion('Tom');
interviewQuestion('designer')('Mark');
interviewQuestion('designer')('Michel');
*/

//Closures
/*
function retirment(retirementAge){
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var a = " years until retirement";
    return function (yearOfBirth){
        var age = currentYear - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirment(66);
var retirementDE= retirment (65);
var retirmentIsland = retirment(67);

//retirementUS(1988);
//retirementUS(1990);
//retirment(67)(1999);

retirementDE(1988);
retirementUS(1988);
retirmentIsland(1988);

function interviewQuestion (job){
    return function(name){
        if (job === 'designer'){
            console.log (name + ' ,can you please explain what  UX design is?');
        }             else if (job === 'teacher'){
            console.log (`What subject do you teach ${name}?`);
        }  else {
            console.log ( `${name} what does your job entails?`);
        }
    }
}

var questionDesigner= interviewQuestion('designer') ('John');

*/

//Bind, call and apply
/*
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function (style,timeOfDay){
        if (style === 'formal') {
            console.log(`Good  ${timeOfDay}, Ladies and gentleman. I\'m  ${this.name} and I\'m a ${this.job}.My aage is ${this.age}`);
        }else if(style === 'friendly') {
            console.log(`Hi! I\'m  ${this.name} and I\'m a ${this.job}.My age is ${this.age}.I wish you a wonderful ${timeOfDay}!`);
        }
    }
}

var emily ={
    name: 'Emily',
    age: 22,
    job: 'designer'
}


john.presentation('formal', 'morning');

john.presentation.call(emily,'friendly','afternoon');
john.presentation.apply(emily,['friendly','midday']);

var johnFriendly = john.presentation.bind(john,'friendly');
johnFriendly('night');
var emilyFromal = john.presentation.bind(emily, 'fromal');
emilyFromal('afternon');
emilyFromal('night');
*/

//Quiz Game
//var questionSelector = randomIntFromInterval(1, 3);

//this is how I would do it but exercise request to do it in with the caller
/*
var questions= [
    {
        question: 'What is my name?',
        choises: ['Manu', 'Emy', 'Emanuel'],
        answer: 3
    },
    {
        question:'What is my favorite color?',
        choises: ['red', 'blue', 'secret'],
         answer: 4
    },
    {
        question:'What do I like to do in my free time?',
        choises: ['Math', 'Coding', 'Swiming', 'Socializing', 'MCSS'],
         answer: 5
    },
    {
        question: 'What is my minimum income?',
        choises: ['The bigger the better', 'Only HR know\'s', 'Who need\'s money?'],
         answer: 2
    }
];
*/
//this code will run separatly from other codes -ifi functions
(function (){

    let goodAnswer ='corect answer';
    let badAnswer = 'wrong answer';

    function Question (question, choises, corectAnswer){
        this.question = question;
        this.choises = choises;
        this.corectAnswer = corectAnswer;
    }
    
    Question.prototype.displayQuestion = function() {
        console.log(this.question);
        var counter = 1;
        for (let i=0; i< this.choises.length; i++ ){
            console.log (`${counter++}. ${this.choises[i]}`);
        }
    }
    Question.prototype.checkAnswer= function (answer, callback){
     if (answer === this.corectAnswer) {
        console.log(goodAnswer);
        callback();
     }
     else {
        console.log(badAnswer);
     }
    }
    
    var q1= new Question('What is my favorite color?',
        ['Manu', 'Emy', 'Emanuel'],
        3
        );
    var q2=new  Question('What is my name?',
        ['red', 'blue', 'secret(hint)'],
        4
        );
    var q3=new  Question('What do I like to do in my free time?',
        ['red', 'blue', 'secretNo(hint)'],
        8
        );
    var q4=new Question('What is my minimum income?',
        ['The bigger the better', 'Only HR know\'s', 'Who need\'s money?'],
        2
        );
        
    var questions =[q1, q2, q3, q4];

    function score(){
        var sc=0;
        return function (correct){
            if (correct){
                sc++;
            }
            return scores;
        }
    }
    var keepScore =score();

    function nextQuestion(){
        var randomSelector= Math.floor(Math.random()* questions.length);
    
        questions[randomSelector].displayQuestion();
        var answer=  prompt('Please select corect answer(write exit to leave game)',0);
    
        if (answer != 'exit'){
            answer =parseInt(answer);
            questions[randomSelector].checkAnswer(answer.keepScore);
            nextQuestion();
        }     
    }
    nextQuestion();
})();

/*
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  

function displayOnConsole(){
console.log (questions[questionSelector].question);
let numberOfChoices= questions[questionSelector].choises.length;
var counter=0;
for (let i=0 ; i<=numberOfChoices-1 ; i++){
    console.log (`${++counter}. ${questions[questionSelector].choises[i]}`);
}
}

function answerCheckingResponse(){
    let promptResponse = prompt('Press F12 to see questions:');
    let correctAnswer = questions[questionSelector].answer;
    if (promptResponse == correctAnswer) {
        console.log(goodAnswer);
    }
    else {
        console.log(badAnswer);
    }

}

displayOnConsole();
answerCheckingResponse();
*/