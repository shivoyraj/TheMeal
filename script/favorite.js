import { getAllCookies , deleteCookie } from "./cookies.js";

var getData = async function (id) {
    let response;
    let url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id
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

function deleteItem(id){
    deleteCookie(id)
    location.reload(true)
}


function loadCookies() {
    
    let map = getAllCookies();
    
    map.forEach(async (v,k)=>{
        
        let item = document.createElement("li")
        let itemThumbnail = document.createElement("img")
        let deleteIcon = document.createElement("img")
        let itemName = document.createElement("p")
        let itemCategory = document.createElement("p")
        
        let obj  = await getData(k)

        itemThumbnail.src = obj.strMealThumb
        itemThumbnail.id = "itemThumbnail"
        deleteIcon.src = "../media/trash.png"
        deleteIcon.id = "deleteIcon"
        deleteIcon.addEventListener('click', function () {  // Add click event listener
            deleteItem(k)
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