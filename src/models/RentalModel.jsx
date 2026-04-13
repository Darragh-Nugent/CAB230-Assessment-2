import { useState, useEffect } from 'react';


const path = " http://4.237.58.241:3000/";

export default function searchRentals(q) {
    return {
        data: [
            {
                id: 1,
                title: "Auburn Townhouse For Lease",
                rent: 1200,
                propertyType: "townhouse",
                latitude: -33.84077015,
                longitude: 151.00802461,
                postcode: 2144,
                state: "NSW",
                suburb: "Auburn",
                bathrooms: 2,
                bedrooms: 4,
                parkingSpaces: 2,
                averageRating: 3.68,
                numRatings: 38
            },
            {
                id: 2,
                title: "STUDIO ART-DECO APARTMENT",
                rent: 420,
                propertyType: "studio",
                latitude: -33.88346692,
                longitude: 151.2163704,
                postcode: 2010,
                state: "NSW",
                suburb: "Darlinghurst",
                bathrooms: 1,
                bedrooms: 3,
                parkingSpaces: 2,
                averageRating: 3.81,
                numRatings: 21
            },
            {
                id: 3,
                title: "A PLACE TO TRULY CALL HOME – SPACE, COMFORT & LIFESTYLE",
                rent: 580,
                propertyType: "house",
                latitude: -22.00005312,
                longitude: 148.06354374,
                postcode: 4744,
                state: "Qld",
                suburb: "Moranbah",
                bathrooms: 1,
                bedrooms: 3,
                parkingSpaces: 3,
                averageRating: 3,
                numRatings: 15
            }
        ],
        pagination: {
            perPage: 10,
            currentPage: 1,
            from: 0,
            to: 10,
            total: 6767,
            lastPage: 677,
            prevPage: null,
            nextPage: 2
        }
    };
}