import Cookies from 'js-cookie'
const CookiesName = 'myDemoBlog'

export const setCookie = (value: string) => {
    Cookies.set(CookiesName, value)
}

export const getCookie = () => {
    return Cookies.get(CookiesName)
}

export const delCookie = () => {
    Cookies.remove(CookiesName)
}