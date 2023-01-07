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
    document.getElementById('strMealThumb').src = obj.strMealThumb
    document.getElementById('idMeal').innerHTML = obj.idMeal
    //document.getElementById(tagRow).innerHTML = ""
    if(obj.strTags)
        document.getElementById('strTags').innerHTML = obj.strTags
    else{
        document.getElementById('tagRow').remove()
    }
    
    document.getElementById('strCategory').innerHTML = obj.strCategory
    document.getElementById('strArea').innerHTML = obj.strArea
    
    document.getElementById('strYoutube').href = obj.strYoutube
    document.getElementById('strYoutube').target = '_blank'

    document.getElementById('strSource').href = obj.strSource
    document.getElementById('strSource').target = '_blank'
    
    let ingredients = ''
    for(let i=0; i<20 ; i++){
        if(obj['strIngredient'+i])
            ingredients = ingredients + i + ': ' + (obj['strIngredient'+i] +' '+ obj['strMeasure'+i]) + ', '
    }
    document.getElementById('ingredients').innerHTML = ingredients.slice(0,ingredients.length-2)
    document.getElementById('strInstructions').innerHTML = obj.strInstructions
}

loadData()