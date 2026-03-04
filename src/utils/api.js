const BASE_URL = import.meta.env.VITE_API_URL || `http://localhost:5001/api`;
const api = {
    get: (url, options = {}) => request(url, { ...options, method: 'GET' }),
    post: (url, body, options = {}) => request(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
    put: (url, body, options = {}) => request(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
    delete: (url, options = {}) => request(url, { ...options, method: 'DELETE' }),
};

async function request(url, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            ...options,
            headers,
        });

        const contentType = response.headers.get('content-type');
        let data;

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = { message: await response.text() };
        }

        if (!response.ok) {
            throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
        }

        return data;
    } catch (err) {
        if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
            throw new Error('Connection refused. Please ensure the backend server is running.');
        }
        throw err;
    }
}

export default api;
