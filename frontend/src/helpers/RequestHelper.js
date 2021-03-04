const backendUrl = 'http://localhost:3000/api/';

export const fetchData = (method, url, body = "") => {
    url = backendUrl + url;

    return new Promise((resolve, reject) => {
        let requestHandler = new XMLHttpRequest();
        requestHandler.open(method, url, true);
        requestHandler.setRequestHeader("Content-Type", "application/json");

        requestHandler.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(requestHandler.response));
            } else {
                reject({
                    status: this.status,
                    statusText: requestHandler.responseText
                });
            }
        };

        requestHandler.onerror = function () {
            console.log('err');
            reject({
                status: this.status,
                statusText: requestHandler.responseText
            })
        };

        requestHandler.send(JSON.stringify(body));
    })
};