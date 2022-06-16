import { SITE_CONFIG } from './site-config';

export class BackendService {
    async call(url: string, method: 'PUT' | 'POST' | 'GET', body?: Object) {
        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        };

        return fetch(`${SITE_CONFIG.ENVIRONMENT_URL}${url}`, requestOptions).then((response) =>
            response.json()
        );
    }
}
