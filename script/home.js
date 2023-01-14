import { setCookie, getCookie, deleteCookie } from './cookies.js';

let inputField = document.getElementById('searchInput');
inputField.addEventListener('input', async function () {    // adding event listener for input search box

    let inputText = inputField.value;

    if (inputText.length == 0) {
        document.getElementById("results").innerHTML = "";  // if no input in search box then setting result empty
    }

    else if (inputText.length == 1) {   // if seach input has only one char then getting all meal with name starting input char
        let res = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`)).json()
        addToSearchSuggestion(res.meals, inputText)
    }

    else {  // if search input has more than one char then getting meal by input meal name
        let res = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)).json()
        addToSearchSuggestion(res.meals, inputText)
    }
});

// adding dynamically meal search response to search results
function addToSearchSuggestion(list, inputText) {
    document.getElementById("results").innerHTML = "";  // reset previous responses
    list.forEach(item => {
        let row = document.createElement("tr"); //creating row
        let c1 = document.createElement("td");  //creating first cell for storing meal name
        c1.append(item.strMeal)
        c1.addEventListener('click', function () {  // click even on first cell use to display meal details page
            if (window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1')
                window.open("../meal.html?name=" + item.strMeal, "_blank");
            else
                window.open("../TheMeal/meal.html?name=" + item.strMeal, "_blank");
        });
        let c2 = document.createElement("td");  //creating second cell to store 'add to fav/remove from fav button'
        let button = document.createElement("button");
        if (!getCookie(item.idMeal))            // if meal is not in fav list then button should appear as 'Add to fav'
            button.innerHTML = "Add to Fav";
        else                                    // if meal is already in fav list then button should appear as 'Remove from fav'
            button.innerHTML = "Remove from Fav";
        button.addEventListener('click', function () { // adding click event to button for adding/removing to/from fav list 
            if (button.innerHTML == "Add to Fav") {    
                setCookie(item.idMeal, item.strMeal)    // if meal is not in fav list then click event will add in cookie(fav list)
                button.innerHTML = "Remove from Fav";   // toggling button text
            }
            else {
                deleteCookie(item.idMeal)              // if meal is already in fav list then click event will remove from cookie(fav list)
                button.innerHTML = "Add to Fav";       // toggling button text
            }
        });
        c2.append(button);
        row.append(c1)
        row.append(c2)
        document.getElementById("results").append(row); // appending all manipulations in row and displaying dynamically
    })
}