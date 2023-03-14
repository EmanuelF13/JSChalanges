/* John and his family went on a holiday and went to three different restaurants, and the bills were 124, 48, and 268 dollars.
Now to tip the waiter a fair amount, John created a simple tip calculator as a function.And the way that John calculates his tips,
is that he likes to tip 20 percent of the bill when then bill is less than 50 dollars, 15 percent when the bill is between 50 and 200 dollars,
and 10 percent of the bill if it is more than 200 dollars.
 
John would like to have two arrays as the end results. So one containing all three tips, so one for each bill,
and then one containing all three final paid amounts, and with paid amounts, I mean the bill plus the paid tip.

*/

/*
function tipCalculator(bill) {
    let tip = switch () {
        case (bill < 50):
            return bill * 0, 2;
        case (bill > 50 & bill < 200):
            return bill * 0, 15;
        case (bill > 200):
            return bill * 0.1;
        default:
            return 'Value is not a number';
    }
    console.log(tip);
    return tip;
}
*/

var billsForToday =[124,48,268,-100];

function checkBillValue(billValue ){
    billValue.forEach(element => {
        if (!isNaN(element) && Math.sign(element) !=-1)
        console.log('This ${element} is a number');
        else{
            console.log('Removing this value ${element} from vector cause its not a number!');
            let removeIndex=billValue.indexOf(element);
            return billValue.splice(removeIndex,1);
        }
    });

}


function tipCalc(bill) {
    bill = parseFloat(bill);
    if (bill < 50) {
        console.log("For bill of " + bill + " we are calculating with 20%");
        return bill * 0.2;
    }
    else {
        if (bill > 50 && bill < 200) {
            console.log("For bill " + bill + " we are calculating with 15%");
            return bill * 0.15;
        }


        else {
            if (bill > 200) {
                console.log("For bill " + bill + " we are calculating with 10%");
                return bill * 0.1;
            }
            else {
                return "Value " + bill + " is not an expected value!";
            }
        }

    }
}



function payedAmount(bill) {
    if (!isNaN(tipCalc(bill)))
        return tipCalc(bill) + bill;
    else { return "Did not receive a number. See def of num for value " + bill; }
}

function pharseBillArrayToTips(bills){
    let tips=[];
    bills.forEach(bill => {
        console.log("Adding tip for ${bill}");
        tips.push(tipCalc(bill));
    });
    return tips;
}

function pharseBillArrayToFullBill(bills){
    let fBill=[];
    bills.forEach(bill => {
        console.log("Adding tip for ${bill}");
        fBill.push(payedAmount(bill));
    });
    return fBill;
}

function main() {
    //var tips = [tipCalc(124), tipCalc(48), tipCalc(268), tipCalc(-100)];
    //var fullBill = [payedAmount(124), payedAmount(48), payedAmount(268), payedAmount(-100)];
    checkBillValue(billsForToday);
    let tips = pharseBillArrayToTips(billsForToday);
    let fullBill = pharseBillArrayToFullBill(billsForToday);

    console.log(billsForToday);
    console.log(tips);
    console.log(fullBill);

}

main();
