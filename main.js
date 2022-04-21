let myDetails = [] // an empty array in which we will store saved data a user entered
const inputEl = document.getElementById("input-el") // creating a variable which gets the id of the input field in the HTML file
const inputBtn = document.getElementById("input-btn") // creating a variable which gets the id of the button in the HTML file
const ulEl = document.getElementById("ul-el") // creating a variable which gets the id of unordered list in the HTML file
const deleteBtn = document.getElementById("delete-btn") // creating a variable which will be used to delete everything saved in the extension
const deletelastBtn = document.getElementById("deletelast-btn") // creating a variable which will delete the last item saved in the extension

const detailsFromLocalStorage = JSON.parse(localStorage.getItem("myDetails")) // here i created a variable which will first parse/change our saved tasks/details which are strings because we used stringify() to array objects and retrieve them from local storage so that we could display the tasks
if(detailsFromLocalStorage) { // an if statement which checks if detailsFromLocalStorage variable has any saved data in myDetails array
    myDetails = detailsFromLocalStorage // if the statement is true, myDetails array is then equal to the detailsFromLocalStorage variable and gets all the saved tasks/data user entered
    renderTab(myDetails) // renderTab() will run a function called renderDetails 
}
else {
    ulEl.innerHTML = "Nothing currently saved" // will just display on the screen for the user that no data is currently saved in the extension
}

saveTabBtn.addEventListener("click", function() { // when a user clicks on the savetab button we run this function
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) { // here we access the chrome api which is responsible for logging current tab a user is on
        console.log(tabs) // just logging out to test if everything works
        myDetails.push(tabs[0].url) // this is where we store everything saved as an url in the extension
        localStorage.setItem("myDetails", JSON.stringify(myDetails)) // here we just say that local storage will set our items that are in the myDetails array to make them into strings from objects.
        renderTab(myDetails) // here we run the renderTab function and pass in our array as a parameter which the function is going to use to run properly
    })
})

function renderTab(details) { // this function is responsible for displaying the items/tasks we wrote in the input field
    let listItems = "" // creating the list which will start empty
    for (let i = 0; i < details.length; i++) { // creating a for loop which will first create a variable "i", make it to zero and check if the length of the items in the "myItems" array that we created on the first, at last the for loop will run as many times as there are items/tasks in our array line of our code,
        // down here the listItems variable we created is then equal to listItems + "<li>" which is an element from html in the "ul" which stands for unordered list, and because later we use the ".innerHTML", the vscode editor understands that we are trying to create "list" and that's why we get the black dot near every element we create
        listItems += ` 
            <li>
                <a target='_blank' href='${details[i]}'>  <!-- simple html code written to display the details/tasks saved in the myDetails array -->
                    ${details[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems // Here we just call the UlEl variable which can access the unordered list elements and with the "innerHTML" we can display the list items in the unordered list.  
}


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear() // here we just clear/delete our local storage so it becomes empty
    myDetails = [] // i set the array back to empty too, just cleaning local storage won't delete anything located in my array.
    ulEl.innerHTML = "Nothing currently saved" // we display a simple message that says nothing is currently saved.
})

deleteLastBtn.addEventListener("click", function() {
    myDetails.pop() // will delete the last element in our array
    localStorage.removeItem(myDetails) // will remove the last saved object from local storage
    localStorage.setItem("myDetails", JSON.stringify(myDetails)) // will refresh/update everything that is stored in local storage
    renderTab(myDetails) // will run a function called myDetails
    if (detailsFromLocalStorage) { // an if statement which checks if detailsFromLocalStorage variable has any saved data in myDetails array
        myDetails = detailsFromLocalStorage // if the statement is true, myDetails array is then equal to the detailsFromLocalStorage variable and gets all the saved tasks/data user entered
        renderTab(myDetails) // renderTab() will run a function called renderTab
    } else {
        ulEl.innerHTML = "Nothing currently saved" // will just display on the screen for the user that no data is currently saved in the extension
    }
})

inputBtn.addEventListener("click", function() { // an event listener which is gonna listen for clicks on the button, when clicked, it will run a function which 
    myDetails.push(inputEl.value) // will get the item from input list and put it in the empty array that we created, later as we add more items/tasks, the push() function will place our tasks at the end of the array
    inputEl.value = "" // this will reset the input field to be empty so that user doesn't need to erase the field himself when adding another task
    localStorage.setItem("myDetails", JSON.stringify(myDetails)) // here we just say that local storage will set our items that are in the myDetails array to make them into strings from objects.
    renderTab(myDetails) // renderTab() will run another function called renderDetails  
})


