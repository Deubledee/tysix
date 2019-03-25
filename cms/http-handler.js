function reuest(urlo, call, method, formData) {
    let url = urlo, json = [], str = '';
    let xhr = new XMLHttpRequest();
    let meth = method || 'GET';
    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', onError);
    xhr.open(meth, url);
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost/');
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
    xhr.setRequestHeader("Accept", "application/json");
    if (formData) {
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(formData);
        console.log('formData');
    }
    else {
        xhr.send();
    }
    function onLoad(e) {
        call(e.target.responseText);
    }
    function onError(e) {
        console.log(e);
    }
    return xhr;
}
export { reuest };