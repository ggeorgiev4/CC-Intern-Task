export class BackendService {
    constructor() {}

    async call(url: string, method: 'PUT' | 'POST' | 'GET', body?: Object) {
        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };

        return fetch(
            `https://my-json-server.typicode.com/ggeorgiev4/CC-Intern-Task${url}`,
            requestOptions
        ).then((response) => response.json());
    }
}
