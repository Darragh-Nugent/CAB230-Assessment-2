import { useState, useEffect } from 'react';
import { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Bathroom } from '@mui/icons-material';


const path = "http://4.237.58.241:3000/rentals/";

export function getStates() {
    return fetch(path + "states")
        .then((res) => res.json())
}

export function getPropertyTypes() {
    return fetch(path + "property-types")
        .then((res) => res.json())
}

export async function searchRentals(paginationModel, sortingModel, filterModel) {
    const params = new URLSearchParams();
    params.append("page", paginationModel.page + 1);

    if (sortingModel.length > 0) {
        params.append("sortBy", sortingModel[0].field);
        params.append("sortOrder", sortingModel[0].sort);
    }

    filterModel.items.forEach(filterItem => {
        let field;
        switch (filterItem.field) {
            case "suburb":
                field = "suburb";
                break;

            case "state":
                field = "state";
                break;

            case "postcode":
                field = "postcode";
                break;

            case "rent":
                field = filterItem.operator === ">" ? "minimumRent" : "maximumRent";
                break;

            case "bathrooms":
                field = filterItem.operator === ">" ? "minimumBathrooms" : "maximumBathrooms";
                break;

            case "bedrooms":
                field = filterItem.operator === ">" ? "minimumBedrooms" : "maximumBedrooms";
                break;

            case "parkingSpaces":
                field = filterItem.operator === ">" ? "minimumParking" : "maximumParking";
                break;

            case "averageRating":
                field = filterItem.operator === ">" ? "minimumRating" : "maximumRating";
                break;

            default:
                break;

        }
        
        if (field && filterItem.value) {
            params.append(field, filterItem.value);
        }

    });

    const response = await fetch(`${path}search?${params.toString()}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}