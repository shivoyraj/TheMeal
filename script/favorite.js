import { getAllCookies , deleteCookie } from "./cookies.js";

function loadCookies() {
    
    let map = getAllCookies();
    
    map.forEach(async (v,k)=>{
        
        let item = document.createElement("li")
        let itemThumbnail = document.createElement("img")
        let deleteIcon = document.createElement("i")
        let itemName = document.createElement("p")
        let itemCategory = document.createElement("p")
        
        let res  = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${k}`)).json()
        let obj = res.meals[0]

        itemThumbnail.src = obj.strMealThumb
        itemThumbnail.id = "itemThumbnail"
        deleteIcon.src = "../media/trash.png"
        deleteIcon.id = "deleteIcon"
        deleteIcon.className = "fa fa-trash"
        deleteIcon.addEventListener('click', function () {  
            deleteCookie(id)
            item.remove()
        });
        itemName.innerHTML = v
        itemName.id = "itemName"
        itemCategory.innerHTML = obj.strCategory
        itemCategory.id = "itemCategory"

        item.append(itemThumbnail)
        item.append(deleteIcon)
        item.append(itemName)
        item.append(itemCategory)

        document.getElementById("list").append(item)
    })
}

loadCookies();