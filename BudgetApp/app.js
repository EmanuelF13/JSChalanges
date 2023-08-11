"use strict";
//Budget Controler
var budgetControler = (function(){

    var Expense = function(id, description, value){ 
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calculatePrecentage = function(totalIncome){
        if (totalIncome > 0){
            this.percentage= Math.round((this.value/totalIncome)*100);
        } else {
            this.percentage = -1;
        }
      
    }

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }
    var Income = function(id, description, value){ 
        this.id=id;
        this.description=description;
        this.value=value;
    }; 
    
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(curVal, curIndex, curArray) {
            sum += curVal.value;         
        });
        data.totalExpenses[type]=sum;
    };

    var  data= {
        allItems:  {
            exp: [],
            inc: []
        },
        totalExpenses: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        precentage: -1
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
        deleteItem: function(type, id){
            var ids, index;
            //returns a array with all ids
            ids = data.allItems[type].map(function(currentId){
                return currentId.id;
            });

            //returns position of the id in the array
            index = ids.indexOf(id);

            //checking if there is a data in array
            if(index !== -1){
                // removindg element from array
                data.allItems[type].splice(index,1);
            }

        },
        calculateBudget: function() {
            
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the budget: income - expenses
            data.budget = data.totalExpenses.inc-data.totalExpenses.exp;


            // calculate the percentage of income that was spend.  Percentage is rounded
            if (data.totalExpenses.inc >0) {
                data.precentage = Math.round((data.totalExpenses.exp / data.totalExpenses.inc) *100);
            } else {
                //No data to calculate with
                data.precentage = -1;
            }
            
        },
        calculatePercentages: function(){
            data.allItems.exp.forEach(function(currVal){
                currVal.calculatePrecentage(data.totalExpenses.inc);
            });

        },
        getPercentage: function(){
           var allPerc = data.allItems.exp.map(function (curr){
            return curr.getPercentage();
           }); 
           return allPerc;
        },
        getBudget: function(){
          return {
            budget: data.budget,
            totalInc: data.totalExpenses.inc,
            totalExp: data.totalExpenses.exp,
            percentage: data.precentage
          }  
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
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        containerIncAndExp: '.container',
        percentagesExpensesLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    var formatNumber = function (num, type){
        var numSplit, int, dec;
        // Adding + or - before number. Coma separating thousands, ading decimal point
        // Ex: 2000.4567-> + 2 , 000 . 46 

        //Removing sign
        num = Math.abs(num);

        //Let there be only 2 decimals
        num = num.toFixed(2);

        //Adding separators
        numSplit= num.split('.');

        int = numSplit[0];
        if(int.length > 3){
                int = int.substr(0, int.length -3) + ','+ int.substr(int.length -3,int.length); //input 2310, output 2,310
            }
        dec = numSplit[1];    
        return ((type === 'exp' ?  '-' : '+') + ' '+ int + '.' + dec);   
    };

    var nodeListForEach = function(nodeList, callbackFunction){

        for (var i = 0; i < nodeList.length; i ++){
            callbackFunction(nodeList[i],i);
        }
    };

    return {
        getInput: function() { 
            return {
            // will be inc or exp
             type:  document.querySelector (DOMstrings.inputType).value, 
             description: document.querySelector(DOMstrings.inputDescription).value,
             value:  parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };           
        },
        addListItem: function(obj, type){
            var html, newHtml, element;
           // Create HTML strin with placeholder text
           if (type === 'inc'){

            element= DOMstrings.incomeContainer;

            html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"> <i class="ion-ios-close-outline"></i></button> </div> </div> </div> </div>';
           } else if(type === 'exp') {

            element = DOMstrings.expenseContainer;

            html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
           } else {

            element = -1;

            console.log('Type specified does not exist!');

            alert ('Please specify corect type: expense or income!');
           }
           
           
           //Replace the placeholder text with some actual data
           newHtml = html.replace('%id%', obj.id);
           newHtml = newHtml.replace('%description%', obj.description);
           newHtml = newHtml.replace ('%value%', formatNumber(obj.value, type));


           //Insert the HTML into the DOM
                   document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        deleteListItem: function(selectorId, type){

            var element = document.getElementById(selectorId);

            //we can only remove child not the element itself
            element.parentNode.removeChild(element);
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
        displayBudget: function(obj){
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if(obj.percentage >=  0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + ' %';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '--%';
            }

    },
    displayPercentages: function(percentages){

    var fields = document.querySelectorAll(DOMstrings.percentagesExpensesLabel);
    
    nodeListForEach(fields, function (current, index){
        
        if (percentages[index] > 0){
            current.textContent = percentages[index] + ' %';
        }else {
            current.textContent = '--%';
        }
    });
    },
    displayDate: function(){
        var now,year,month, months,day;
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        now = new Date();
        year = now.getFullYear();
        day = now.getDay();
        month = now.getMonth();
        document.querySelector(DOMstrings.dateLabel).textContent =day+ ' . '+ months [month]+ ' . '+ year;
    },
    changeType: function(){
        var fields = document.querySelectorAll(
            DOMstrings.inputType + ',' +
            DOMstrings.inputDescription + ',' +
            DOMstrings.inputValue);
            nodeListForEach(fields, function(curr){
                curr.classList.toggle('red-focus');
            });
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
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

        document.querySelector(DOM.containerIncAndExp).addEventListener('click', ctrDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    };


    var updateBudget = function(){
    //1. Calculate budget
    budgetControler.calculateBudget();

    //2. Return the budget 
    var budget = budgetCtrl.getBudget();

    //3. Display the budget on the UI
    UICtrl.displayBudget(budget);
    
     };

     var updatePercentages = function(){

        //1. calculate percentages
        budgetControler.calculatePercentages();

        //2. read them from budget controler
        var percentages = budgetControler.getPercentage();


        //3. update user interface with new percentages
        UICtrl.displayPercentages(percentages);


     };

    var ctrlAddItem =  function() {
    var input, newItem;
        // TODO list: 1.Get field input data
    var input = UICtrl.getInput();

    if (input.description !== ""  && !isNaN(input.value) && input.value > 0){

    // 2. add the item to budget controler
    var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //3. Add item to the UI
    UIController.addListItem(newItem, input.type);

    //4. Clear Fields(new feature that needed to be added after UI review)
    UIController.clearFields();

    //5. Call update budget that calculates and updates budget
    updateBudget();

    //6. Update percentages
    updatePercentages();

    } else {

        //TODO: restrict numbers that are aded with -/ or convert them.
        console.log('All fields must be corectly filled');
    }      
    };

    var ctrDeleteItem = function(event){
        var itemID, splitID, type, id;

        //Hard coded , maybe something more elegand
        itemID=event.target.parentNode.parentNode.parentNode.parentNode.id;

        //this works because we have id only on inc and exp items
        if (itemID){

            splitID = itemID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);

            //1. delete item form data structure
            budgetControler.deleteItem(type,id);

            //2. delete item form UI
            UIController.deleteListItem(itemID);

            //3. Update and show the new budget
            updateBudget();

            //4. Calculate and update percentages
            updatePercentages();

       }
    };

    return {
        init: function(){
            console.log('Initiating Application');
            //resetig all to 0
            UICtrl.displayDate();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            setupEventListeners();

        }
    }


}) (budgetControler,UIController);

controler.init();