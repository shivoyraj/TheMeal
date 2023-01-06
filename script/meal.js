var getDataByName = async function (itemName) {
    let response;
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + itemName
    try {
        response = await fetch(url);
    }
    catch (err) {
        console.log(err)
    }

    const data = await response.json();
    let obj = data.meals[0]
    return obj
}

var loadData = async function () {
    
    let params = new URLSearchParams(location.search);
    let itemName = params.get("name");
    let obj = await getDataByName(itemName)
    
    document.getElementById('mealHeading').innerHTML = obj.strMeal
    document.getElementById('idMeal').innerHTML = obj.idMeal
    document.getElementById('strCategory').innerHTML = obj.strCategory
    document.getElementById('strArea').innerHTML = obj.strArea
    document.getElementById('strInstructions').innerHTML = obj.strInstructions
}

loadData()