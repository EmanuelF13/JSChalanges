"use strict";
//Budget Controler
var budgetControler = (function(){

    var Expense = function(id, description, value){ 
        this.id=id;
        this.description=description;
        this.value=value;
    };

    var Income = function(id, description, value){ 
        this.id=id;
        this.description=description;
        this.value=value;
    }; 
    

    var  data= {
        allItems:  {
            exp: [],
            inc: []
        },
        totalExpenses: {
            exp: 0,
            inc: 0
        }
    };
    
    return {
        addItem: function(type, des, val){
            var newItem, ID;
            
            //Crated new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            } 

            

            //Created new ID based on type[inc,exp]
            if(type === 'exp'){
                newItem  =  new Expense (ID, des, val);
            }
            else if (type === 'inc'){
                newItem = new Income(ID, des, val);
            } else { 
                console.log('User is playing with the income and expens value');
                prompt('Please dont change expense or income values from drop down!');
                    }
            //push element into data structure
            data.allItems[type].push(newItem);

            //return new element
            return newItem;

            
        },
        testing: function(){
            console.log(data);
        }
    };
    
})();

//User interface controler
var UIController = (function() {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    };
    return {
        getInput: function() {
            return {
            // will be inc or exp
             type:  document.querySelector (DOMstrings.inputType).value, 
             description: document.querySelector(DOMstrings.inputDescription).value,
             value:  document.querySelector(DOMstrings.inputValue).value
            };           
        },
        addListItem: function(obj, type){
            var html, newHtml, element;
           // Create HTML strin with placeholder text
           if (type === 'inc'){

            element= DOMstrings.incomeContainer;

            html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"> <i class="ion-ios-close-outline"></i></button> </div> </div> </div> </div>';
           } else if(type === 'exp') {

            element = DOMstrings.expenseContainer;

            html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
           } else {

            element = -1;

            console.log('Type specified does not exist!');

            alert ('Please specify corect type: expense or income!');
           }
           
           
           //Replace the placeholder text with some actual data
           newHtml = html.replace('%id%', obj.id);
           newHtml = newHtml.replace('%description%', obj.description);
           newHtml = newHtml.replace ('%value%', obj.value);


           //Insert the HTML into the DOM
           console.log(element);
                   document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function(){
            var fieldsToClear, fieldsArrayToClear;

            fieldsToClear = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

            fieldsArrayToClear = Array.prototype.slice.call(fieldsToClear);

            fieldsArrayToClear.forEach(function(currVal, index, array) {
                // After use of fields we clear them
                currVal.value = "";
            });
            //After use of fields(press enter) select field description to start with new element.(No need to select it manualy)
            fieldsArrayToClear[0].focus();

        },
        getDOMStrings: function() {
            return DOMstrings;
        }
    }  ;

})();


//Global App Controler
var controler =(function(budgetCtrl,UICtrl) {

    var setupEventListeners = function() {
        var DOM =UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress',function(event) {
    //event argument is the key pressed on keyboard.KeyCode represents a value of the key presed and its unique
        if(event.key === 'Enter' || event.which === 13)
            {
            ctrlAddItem();
            }
        });
    };
     var updateBudget = function(){
    //1. Calculate budget


    //2. Return the budget 
    

    //3. Display the budget on the UI


     }

    var ctrlAddItem =  function() {
    var input, newItem;
        // TODO list: 1.Get field input data
    var input = UICtrl.getInput();

    // 2. add the item to budget controler
    var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //3. Add item to the UI
    UIController.addListItem(newItem, input.type);

    //4. Clear Fields(new feature that needed to be added after UI review)
    UIController.clearFields();

    //5. Call update budget

        
    };

    return {
        init: function(){
            console.log('Initiating Application');
            setupEventListeners();
        }
    }


}) (budgetControler,UIController);

controler.init();