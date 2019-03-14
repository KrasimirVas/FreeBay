const baseUrl = 'http://localhost:4200/';

export default {
    get: (endpoint, callback) =>
        fetch(baseUrl + endpoint, {
            headers: {
                'Authorizaton': localStorage.getItem('token') 
            },
        })
        .then(data => data.json())
        .then(callback)
        .catch(console.log),
    post: (endpoint, body, callback) =>
        fetch(baseUrl + endpoint, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorizaton': localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        })
        .then(data => data.json())
        .then(callback)
        .catch(console.log)
};