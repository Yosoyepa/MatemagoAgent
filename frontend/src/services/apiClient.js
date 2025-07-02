// Handles all communication with the backend API.
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1/tutor';

export const fetchExplanation = async (concept, age) => {
    const response = await fetch(`${API_BASE_URL}/explain`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ concept, age }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'An unknown error occurred.');
    }

    return response.json();
};