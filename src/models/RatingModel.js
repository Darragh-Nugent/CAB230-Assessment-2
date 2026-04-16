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

export function postRating(propertyId, rating) {
    return fetch(path + 'rentals/' + propertyId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ "rating": rating })
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

export function getRatings(paginationModel) {
    return fetch(`${path}?page=${paginationModel.page + 1}`, {
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
                throw new Error(`Rating error: ${res.message}`);
            }

            return res.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}
