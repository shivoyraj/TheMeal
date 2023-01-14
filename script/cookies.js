//function will be used for setting cookies
export function setCookie(name, value, expires) {
    let expDate = "";
    if (expires) {
        expDate = "; expires=" + expires;
    } else {
        expDate = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    }
    document.cookie = name + "=" + (value || "") + "; path=/" + expDate;
}

// function will use to call for get cookie by name
export function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

//function will be use for getting all the cookies
export function getAllCookies() {
    const cookieMap = new Map();
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        cookieMap.set(name, decodeURIComponent(value));
    }
    return cookieMap;
}

//function will be use to delete a cookie by name
export function deleteCookie(name){
    setCookie(name,'', 'Thu, 01 Jan 1970 00:00:00 GMT')
}