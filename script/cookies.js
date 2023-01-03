export function setCookie(name, value, expires) {
    let expDate = "";
    if (expires) {
        expDate = "; expires=" + expires;
    } else {
        expDate = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    }
    document.cookie = name + "=" + (value || "") + "; path=/" + expDate;
}

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

export function getAllCookies() {
    const cookieMap = new Map();
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        cookieMap.set(name, decodeURIComponent(value));
    }
    return cookieMap;
}

export function deleteCookie(name){
    setCookie(name,'', 'Thu, 01 Jan 1970 00:00:00 GMT')
}