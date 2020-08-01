import { TOKEN_KEY } from './constants';
export function  httpGet(url,params){
    const token = localStorage.getItem(TOKEN_KEY);
    if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
        //fetch请求
        const result = fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return result;

}
export function httpPost(url,params) {
    const token = localStorage.getItem(TOKEN_KEY);
    const result=fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Accept':'*/*',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(params),
    })
return result;
}
export function httpPost2(url,params) {

    const result=fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Accept':'*/*',

        },
        body:JSON.stringify(params),
    })
    return result;
}
export function httpPut(url,params) {
    const token = localStorage.getItem('bearer');
    const result=fetch(url,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            'Accept':'*/*',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(params),
    })
    return result;
}
export function encodeSearchParams(url,params) {
    if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return url
}
