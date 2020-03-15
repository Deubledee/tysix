
function request(url, method, formData) {
    var req = {
        method: method,
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost/',
            'Content-Type': 'application/json',
            "Accept": "application/json",
            'Access-Control-Allow-Methods': 'POST',
            'Tysix-API-Origin-Control': 'AIzaSyA5IhpwWxIyCICTAce83McBCgsEVlSkq18',
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
