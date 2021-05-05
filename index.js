/*Tuukka Jorri*/

/* Define references to item, price, add, clear, item output list, 
expense output and saldo output.*/

let shoppingItem = document.querySelector('#item');
let price = document.querySelector('#price');

const addBtn = document.querySelector('#add_btn');
const clearBtn = document.querySelector('#clear_btn');
const itemsList = document.querySelector("#items_list");
const expense = document.querySelector('#expense_output');
const saldo = document.querySelector('#saldo');
const alertCtrl = document.querySelector('ion-alert-controller');

/*Initialize total expenses to 0, mySaldo to 100 and item counter to 0.*/
let totalExpenses = 0;
let mySaldo = 100;
let itemCounter = 0;

// Add click-event listeners to the two buttons.
clearBtn.addEventListener('click', clearItems);
addBtn.addEventListener('click', addItem);

// Function to add items.
function addItem(){
    console.log(itemCounter);

    // Call the two functions to check input, and check saldo doesn't go negative.
    let checkOk = inputCheck();
    let checkSaldo = saldoCheck();
    if (checkOk && checkSaldo){
        /*Deduct price from saldo and set corresponding ion-item textContent. Create ion-item
        element for output-list, create the string and append into list. Increase total expenses
        and increase value of output-expenses.*/
        mySaldo -= price.value;
        saldo.textContent = mySaldo;

        // Ion-item with ion-button and ion-icon depicting item, price, and delete button.
        const newItem = document.createElement('ion-item');
        newItem.id = 'newItem' + itemCounter;

        const deleteButton = document.createElement('ion-button');
        const deleteIcon = document.createElement('ion-icon');
        deleteIcon.name = 'trash-outline';
        deleteButton.appendChild(deleteIcon);
        deleteButton.id = 'del'+ itemCounter;
        
        newItem.textContent = shoppingItem.value + ': ' + '$' + price.value;
        newItem.appendChild(deleteButton);
        itemsList.appendChild(newItem);
        // Add event listener to item delete button.
        document.getElementById('del'+itemCounter).addEventListener('click', deleteRow);
        totalExpenses += +price.value;
        itemCounter += 1;
        expense.textContent = 'Total expenses: $' + totalExpenses;
        // Finally clear input fields.
        clearItems();
    }
    
}
/*deleteRow removes the correspondent ion-item list and adds corresponding price
back into saldo, and removes corresponding price from expenses to 
reverse effects of adding item.*/
function deleteRow(){
    let id = this.id.substring(3,);
    let row = document.getElementById('newItem'+id);
    rowHTML = row.innerHTML;
    
    let price = rowHTML.substring(rowHTML.lastIndexOf("$")+1, rowHTML.lastIndexOf("<ion-b"));
    price = parseFloat(price);
    totalExpenses -= price;
    mySaldo += price;
    expense.textContent = 'Total expenses: $' + totalExpenses;
    saldo.textContent = mySaldo;

    row.remove();

}

/* clearItems to clear items from text fields. */
function clearItems(){
    shoppingItem.value = "";
    price.value = "";
    }


/* Check whether item field has at least 1 character, and price is greater than 0.
Returns booleans.*/
function inputCheck(){
    if(shoppingItem.value.trim().length > 0 & price.value > 0){
        return true;
    }
    return false;
}

/*Check if mySaldo - price >= 0 and price > 0 (prevent saldo going negative).
Returns booleans.*/
function saldoCheck(){
    if (mySaldo - price.value >= 0 && price.value > 0) {
        return true;
    }
    presentAlert();
    return false;

/*Asynchronous function presenting alert if saldo goes negative.*/
async function presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Alert';
    alert.subHeader = 'Saldo alert';
    alert.message = "You're saldo can't go negative!";
    alert.buttons = ['OK'];
      
    document.body.appendChild(alert);
    await alert.present();
      
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    clearItems();
      }
}
