function request(url, method, formData) {
    var req = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST'
            // 'Access-Control-Allow-Origin': 'https://localhost/',
        }
    }
    if (!!formData) {
        req.body = JSON.stringify({
            query: `{
                    ${formData}                      
                }`
        })
    }

    return fetch(url, req)
}
export { request };
