//points to window
//console.log(this);

/*
calculateAge(1988);

 function calculateAge(year){
    console.log(2020-year);
    //points to window
    console.log(this);
 }

 */

 
 var john ={ 
    name : 'John',
    yearOfBirth: 1988,
    calculateAge: function() {
        console.log(this);
        //this points to the object
        console.log(2023-this.yearOfBirth);

        function innerFunct() {
            // this points to window object
            console.log(this);
        }

        innerFunct();
    }
 }

 john.calculateAge();
 

 var mike ={
    name : 'Mike',
    yearOfBirth: 1999
 };

 // this becomes the Mike object
mike.calculateAge = john.calculateAge;

mike.calculateAge();