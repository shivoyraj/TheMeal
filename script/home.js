import { setCookie, getCookie, deleteCookie } from './cookies.js';

let inputField = document.getElementById('searchInput');
var list;

inputField.addEventListener('input', async function () {

    let inputText = inputField.value;

    if (inputText.length == 1)
        list = await getData(inputText.charAt(0))

    if (inputText.length == 0)
        document.getElementById("resultItems").style.visibility = "hidden";
    else
        addToSearchSuggestion(list, inputText)
});

var getData = async function (char) {
    list = []
    let response;
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=' + char
    try {
        response = await fetch(url);
    }
    catch (err) {
        console.log(err)
    }
    let data = await response.json();
    data.meals.forEach(meal => {
        list.push(meal)
    });
    return list
}

function addToSearchSuggestion(list, inputText) {
    document.getElementById("results").innerHTML = "";
    list.forEach(item => {
        if (item.strMeal.toLowerCase().startsWith(inputText.toLowerCase())) {
            let row = document.createElement("tr");
            let c1 = document.createElement("td");
            c1.append(item.strMeal)
            c1.addEventListener('click', function () {
                window.open('../meal.html?name='+item.strMeal, '_blank');
            })
            let c2 = document.createElement("td");
            let button = document.createElement("button");
            if (!getCookie(item.idMeal))
                button.innerHTML = "Add to Fav";
            else
                button.innerHTML = "Remove from Fav";
            button.addEventListener('click', function () {  // Add click event listener
                if (button.innerHTML == "Add to Fav") {
                    addToFavorite(item)
                    console.log(item)
                    button.innerHTML = "Remove from Fav";
                }
                else {
                    removeFromFavorite(item)
                    button.innerHTML = "Add to Fav";
                }
            });
            c2.append(button);
            row.append(c1)
            row.append(c2)
            document.getElementById("results").append(row);
        }
    })
    document.getElementById("resultItems").style.visibility = "visible";
}

function addToFavorite(item) {
    console.log("Adding item to favorite list " + item.strMeal)
    setCookie(item.idMeal, item.strMeal)
}

function removeFromFavorite(item) {
    console.log("Removing item from favorite list " + item.strMeal)
    deleteCookie(item.idMeal)
}