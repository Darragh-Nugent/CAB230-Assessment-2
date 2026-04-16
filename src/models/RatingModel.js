const path = "http://4.237.58.241:3000/ratings/";

export function getRating(propertyId) {
    return fetch(path + 'rentals/' + propertyId, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    })
        .then((res) => {
            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('Unauthorized: Please log in to view ratings');
                }
                else if (res.status === 404) {
                    throw new Error('No ratings found for this property');
                }
                throw new Error(`Rating error: ${res.message}`);
            }

            return res.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

export function getRatings(propertyId) {
    return fetch(path, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    })
        .then((res) => {
            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error('Unauthorized: Please log in to view ratings');
                }
                else if (res.status === 404) {
                    throw new Error('No ratings found for this property');
                }
                throw new Error(`Rating error: ${res.message}`);
            }

            return res.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}
