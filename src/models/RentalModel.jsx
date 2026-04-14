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

export async function searchRentals(paginationModel, sortModel, tableFilterModel, advancedFilterModel) {
    const params = new URLSearchParams();

    params.append("page", paginationModel.page + 1);

    if (sortModel.length > 0) {
        params.append("sortBy", sortModel[0].field);
        params.append("sortOrder", sortModel[0].sort);
    }

    tableFilterModel.items.forEach(filterItem => {
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

            default:
                break;
        }

        if (field && filterItem.value) {
            params.append(field, filterItem.value);
        }
    });

    Object.entries(advancedFilterModel).forEach(([field, values]) => {
        let fieldMin;
        let fieldMax;

        switch (field) {
            case "rent":
                fieldMin = "minimumRent";
                fieldMax = "maximumRent";
                break;

            case "bathrooms":
                fieldMin = "minimumBathrooms";
                fieldMax = "maximumBathrooms";
                break;

            case "bedrooms":
                fieldMin = "minimumBedrooms";
                fieldMax = "maximumBedrooms";
                break;

            case "parkingSpaces":
                fieldMin = "minimumParking";
                fieldMax = "maximumParking";
                break;

            case "averageRating":
                fieldMin = "minimumRating";
                fieldMax = "maximumRating";
                break;

            default:
                break;
        }

        if (values.min !== '') params.append(fieldMin, values.min);
        if (values.max !== '') params.append(fieldMax, values.max);
    });

    const response = await fetch(`${path}search?${params.toString()}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}