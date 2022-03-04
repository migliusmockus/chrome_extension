let myDetails = []
const inputEl = document.getElementById("input-el") // creating a variable which gets the id of the input field in the HTML file
const inputBtn = document.getElementById("input-btn") // creating a variable which gets the id of the button in the HTML file
const ulEl = document.getElementById("ul-el") // creating a variable which gets the id of unordered list in the HTML file


let detailsFromLocalStorage = JSON.parse(localStorage.getItem("myDetails"))
if(detailsFromLocalStorage) {
    myDetails = detailsFromLocalStorage
    renderDetails()
}
else {
    ulEl.innerHTML = "Nothing currently saved"
}

inputBtn.addEventListener("click", function() { // an event listener which is gonna listen for clicks on the button, when clicked, it will run a function which 
    myDetails.push(inputEl.value) // will get the item from input list and put it in the empty array that we created, later as we add more items/tasks, the push() function will place our tasks at the end of the array
    inputEl.value = "" // this will reset the input field to be empty so that user doesn't need to erase the field himself when adding another task
    localStorage.setItem("myDetails", JSON.stringify(myDetails))
    renderDetails() // renderDetails() will run another function called renderDetails  
})

function renderDetails() { // this function is responsible for displaying the items/tasks we wrote in the input field
    let listItems = "" // creating the list which will start empty
    for (let i = 0; i < myDetails.length; i++) { // creating a for loop which will first create a variable "i", make it to zero and check if the length of the items in the "myItems" array that we created on the first, at last the for loop will run as many times as there are items/tasks in our array line of our code,
        // down here the listItems variable we created is then equal to listItems + "<li>" which is an element from html in the "ul" which stands for unordered list, and because later we use the ".innerHTML", the vscode editor understands that we are trying to create "list" and that's why we get the black dot near every element we create
        listItems += ` 
            <li>
                <a target='_blank' href='${myDetails[i]}'>  
                    ${myDetails[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  // Here we just call the UlEl variable which can access the unordered list elements and with the "innerHTML" we can display the list items in the unordered list.  
}
