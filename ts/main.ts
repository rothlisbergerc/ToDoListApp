// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // Set to today's date

class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean;
}
/*
let item = new ToDoItem();
item.title = "Testing";
item.dueDate = new Date(2020, 6, 1);
item.isCompleted = false;
*/

window.onload = function(){
    let addItem = document.getElementById("add");
    addItem.onclick = main;

    loadSavedItem();

}

function loadSavedItem(){
    let item = getToDo(); // read from web storage
    displayToDoItem(item);
}

function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}

/**
 * Check form data is valid
 */
function isValid():boolean{
    return true;
}

/**
 * Get all input off form and wrap in
 * a ToDoItem object
 */
function getToDoItem():ToDoItem{
    let myItem = new ToDoItem();
    // get title
    let titleInput = getInput("title");
    myItem.title = titleInput.value;

    // get due date
    let dueDateInput = getInput("due-date");
    myItem.dueDate = new Date(dueDateInput.value);

    // get isCompleted
    let isCompleted = getInput("is-complete");
    myItem.isCompleted = isCompleted.checked;

    return myItem;
}

function getInput(id):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}

/**
 * Display given ToDoItem on the web page
 */
function displayToDoItem(item:ToDoItem):void{
    // ex. <h3>Record JS Lecture</h3>
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    // ex. <p>June 1st 2020</p>
    let itemDate = document.createElement("p");
    // itemDate.innerText = item.dueDate.toDateString();
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();

    // ex. <div class="todo completed"></div> or <div class="todo"></div>
    let itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
    if(item.isCompleted){
        itemDiv.classList.add("completed");
    }
    
    /*  <div class="completed">
            <h3>Record JS Lecture</h3>
            <p>June 1st 2020</p>
        </div>
    */
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.isCompleted){
        let completedToDos = document.getElementById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else{
        let incompleteToDos = document.getElementById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}

function markAsComplete(){
    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("completed");

    let completedItems = document.getElementById("complete-items");
    completedItems.appendChild(itemDiv);
}

// Task: Store ToDoItems in web storage

// store a single todo item that you create
function saveToDo(item:ToDoItem):void{
    //convert our object into a string and save that string into web storage:

    let itemString = JSON.stringify(item); // Convert ToDoItem into JSON string

    localStorage.setItem(todokey, itemString); // Save string
}

const todokey = "todo";

/**
 * Get stored ToDo item or return null if
 * none is found.
 */
function getToDo():ToDoItem{
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem = JSON.parse(itemString);
    return item;
}