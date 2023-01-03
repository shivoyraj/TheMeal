let inputField = document.getElementById('searchInput');
var list;

inputField.addEventListener('input', async function () {

    let inputText = inputField.value;

    if (inputText.length == 1) {
        list = await getData(inputText.charAt(0))
    }

    if (inputText.length == 0)
        document.getElementById("resultItems").style.visibility = "hidden";
    else
        addToSearchSuggestion(list, inputText)
});

var getData = async function (char) {
    list = []
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
            let c2 = document.createElement("td");
            c1.append(item.strMeal);
            let button = document.createElement("button");
            button.innerHTML = "Add to Fav";
            c2.append(button);
            row.append(c1)
            row.append(c2)
            document.getElementById("results").appendChild(row);
        }
    })
    document.getElementById("resultItems").style.visibility = "visible";
}