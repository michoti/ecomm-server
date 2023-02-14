import axios from "axios"

export const request = async (method, url, data = {}) => {
    return  await axios({
        method: method,
        url: url,
        data: data,
        headers: {
            'X-XSRF-TOKEN': document.head.querySelector('meta[name=csrf-token]').content ,
        } 
    })
    .then()
    .catch(err => console.error(err));

}

export const get = (url) => {
    return request('get', url)
}

export const post = (url, data) => {
    return request('post', url, data)
}