export default async function request(options) {
    return fetch(options.url, options.options)
        .then(response => response.text())
        .then(data => JSON.parse(data));
};

