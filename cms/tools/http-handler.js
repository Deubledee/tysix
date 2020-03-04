function request(url, method, formData) {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST'
            // 'Access-Control-Allow-Origin': 'https://localhost/',
        },
        body: JSON.stringify({
            query: `{
                    ${formData}                      
                }`
        })
    })
}
export { request };
