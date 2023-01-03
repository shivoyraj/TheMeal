import { getAllCookies } from "./cookies.js";

function loadCookies() {
    
    let map = getAllCookies();
    
    map.forEach((v,k)=>{
        
        let obj = JSON.parse(v)
        
        let item = document.createElement("li")
        let itemThumbnail = document.createElement("img")
        let itemName = document.createElement("p")
        let itemCategory = document.createElement("p")
        
        itemThumbnail.src = obj.strMealThumb
        itemName.innerHTML = k
        itemName.id = "itemName"
        itemCategory.innerHTML = obj.strCategory
        itemCategory.id = "itemCategory"

        item.append(itemThumbnail)
        item.append(itemName)
        item.append(itemCategory)

        document.getElementById("list").append(item)
    })
}

loadCookies();