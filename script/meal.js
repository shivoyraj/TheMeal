var loadData = async function () {
    
    // getting item Name from request params
    let params = new URLSearchParams(location.search);
    let itemName = params.get("name");

    // getting item called by item name
    let res = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemName}`)).json()
    let obj = res.meals[0]
    
    // Displaying item details using DOM Manipulation
     
    document.getElementById('mealHeading').innerHTML = obj.strMeal
    document.getElementById('strMealThumb').src = obj.strMealThumb
    document.getElementById('idMeal').innerHTML = obj.idMeal

    if(obj.strTags)
        document.getElementById('strTags').innerHTML = obj.strTags
    else
        document.getElementById('tagRow').remove()
    
    document.getElementById('strCategory').innerHTML = obj.strCategory
    document.getElementById('strArea').innerHTML = obj.strArea
    
    document.getElementById('strYoutube').href = obj.strYoutube
    document.getElementById('strYoutube').target = '_blank'

    document.getElementById('strSource').href = obj.strSource
    document.getElementById('strSource').target = '_blank'
    
    let ingredients = ''
    for(let i=0; i<20 ; i++)
        if(obj['strIngredient'+i])
            ingredients = ingredients + i + ': ' + (obj['strIngredient'+i] +' '+ obj['strMeasure'+i]) + ', '

    document.getElementById('ingredients').innerHTML = ingredients.slice(0,ingredients.length-2)
    document.getElementById('strInstructions').innerHTML = obj.strInstructions
}

// function will load meal details data and display dynamically
loadData()