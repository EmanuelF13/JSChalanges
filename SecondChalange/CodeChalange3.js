/*
//Object literal
var Emanuel = {
 firstName: 'Manu',
 lastName: 'F',
 birthday: 1988,
 family: ['mother', 'grandmother'],
 isMarried: false,
 calcAge: function(){
    this.age= 2023 - this.birthday;
 }
};

console.log(Emanuel.firstName); 
console.log(Emanuel['isMarried']);

//Object syntax
Emanuel.job = 'developer';
Emanuel.happiness = 'very good'
Emanuel['lastName'] = 'Will not disclose';

console.log(Emanuel.calcAge());
console.log(Emanuel);



MArk and John compared their BMIs.Lets implement
the same functionality with obj and methods.
1 For each of them create an object with prop: full name,mass and height.
2. Then add a method to each object to calc BMI.Save BMI to the object and also return it from the method.
3. In the end log to the console who has highest BMI.Dont forget they might have
the same BMI.

TIPS:
BMI= mass/ height*height .(mas in kilo and height in meter)
*/

let Mark ={
    fullName: "The Mark",
    Mass: 110,
    Height: 190
};

let John = {
    fullName: "Join you later",
    Mass: 90,
    Height: 180
};

function BMIClaculater (anyObject){
    anyObject.BMI = anyObject.Mass / (anyObject.Height ^ 2);
    console.log(anyObject.BMI);
}



function main (){
    BMIClaculater(Mark);
    BMIClaculater(John);
    if (Mark.BMI > John.BMI) console.log("Mark has the bigest BMI");
    else if(Mark.BMI === John.BMI) console.log("Both have the same BMI");
    else console.log("Joshn has the bisgest BMI");
}

main();