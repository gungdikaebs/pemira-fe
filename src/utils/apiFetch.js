



export const apiFetch = async (url, option) => {
    const option = {
        method : 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    const response = await fetch(url, option);
    if (!response.ok) {
        throw new Error(response.statusText);
    } 
    return fetch(url, option);