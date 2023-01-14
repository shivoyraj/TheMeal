import { getAllCookies , deleteCookie } from "./cookies.js";

// function will be use for displaying all the favorite meals
function loadFavorites() {
    
    let map = getAllCookies();  // getting all saved meal in browser cookie
    
    map.forEach(async (v,k)=>{
        
        let item = document.createElement("li")             //creating list of each meal
        let itemThumbnail = document.createElement("img")   //for displaying each meal images
        let deleteIcon = document.createElement("i")        //icon for removing a meal from fav list
        let itemName = document.createElement("p")          //shows item Name
        let itemCategory = document.createElement("p")      //shows item Category
        
        // getting meal by input mealID
        let res  = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${k}`)).json()
        let obj = res.meals[0]

        //Manipulation of DOM with meal response
        itemThumbnail.src = obj.strMealThumb
        itemThumbnail.id = "itemThumbnail"
        deleteIcon.src = "../media/trash.png"
        deleteIcon.id = "deleteIcon"
        deleteIcon.className = "fa fa-trash"
        deleteIcon.addEventListener('click', function () {     // adding event for deleteIcon to remove from fav list 
            deleteCookie(id)
            item.remove()
        });
        itemName.innerHTML = v
        itemName.id = "itemName"
        itemCategory.innerHTML = obj.strCategory
        itemCategory.id = "itemCategory"

        //appedning all manipulation in list
        item.append(itemThumbnail)
        item.append(deleteIcon)
        item.append(itemName)
        item.append(itemCategory)

        document.getElementById("list").append(item)    // appending item in list and display
    })
}

loadFavorites();