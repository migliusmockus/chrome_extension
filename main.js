let myDetails = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")


let detailsFromLocalStorage = JSON.parse(localStorage.getItem("myDetails"))
if(detailsFromLocalStorage) {
    myDetails = detailsFromLocalStorage
    renderDetails()
}
else {
    ulEl.innerHTML = "Nothing currently saved"
}

inputBtn.addEventListener("click", function() {
    myDetails.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myDetails", JSON.stringify(myDetails))
    renderDetails()
})

function renderDetails() {
    let listItems = ""
    for (let i = 0; i < myDetails.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${myDetails[i]}'>
                    ${myDetails[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}
