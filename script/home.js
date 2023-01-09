import { setCookie, getCookie, deleteCookie } from './cookies.js';

let inputField = document.getElementById('searchInput');
inputField.addEventListener('input', async function () {

    let inputText = inputField.value;

    if (inputText.length == 0) {
        document.getElementById("results").innerHTML = "";
    }

    else if (inputText.length == 1) {
        let res = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`)).json()
        addToSearchSuggestion(res.meals, inputText)
    }

    else {
        let res = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)).json()
        addToSearchSuggestion(res.meals, inputText)
    }
});

function addToSearchSuggestion(list, inputText) {
    document.getElementById("results").innerHTML = "";
    list.forEach(item => {
        let row = document.createElement("tr");
        let c1 = document.createElement("td");
        c1.append(item.strMeal)
        c1.addEventListener('click', function () {
            if (window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1')
                window.open("../meal.html?name=" + item.strMeal, "_blank");
            else
                window.open("../TheMeal/meal.html?name=" + item.strMeal, "_blank");
        });
        let c2 = document.createElement("td");
        let button = document.createElement("button");
        if (!getCookie(item.idMeal))
            button.innerHTML = "Add to Fav";
        else
            button.innerHTML = "Remove from Fav";
        button.addEventListener('click', function () {
            if (button.innerHTML == "Add to Fav") {
                setCookie(item.idMeal, item.strMeal)
                button.innerHTML = "Remove from Fav";
            }
            else {
                deleteCookie(item.idMeal)
                button.innerHTML = "Add to Fav";
            }
        });
        c2.append(button);
        row.append(c1)
        row.append(c2)
        document.getElementById("results").append(row);
    })
}