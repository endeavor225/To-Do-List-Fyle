import Cookies from 'js-cookie';

export const setCookie = (key, value) => {
    if (key && value) Cookies.set(key, JSON.stringify(value), { expires: 1 });
};

export const getCookie = (key) => {
    const item = Cookies.get(key)
    if (item) return JSON.parse(item)
};

export const removeCookie = (key) => {
    if (key) Cookies.remove(key) 
};

// Fonction utilitaire pour supprimer un cookie
/* export const removeCookie = (key) => {
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}; */
