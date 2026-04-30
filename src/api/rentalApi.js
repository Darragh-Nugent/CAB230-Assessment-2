const path = "http://4.237.58.241:3000/rentals/";

export function getStates() {
    return fetch(path + "states")
        .then(res => {
            if (!res.ok) {
                throw new Error(`Could not retrieve states: ${res.status}`);
            }
            return res.json();
        })

}

export function getPropertyTypes() {
    return fetch(path + "property-types")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Could not retrieve property types: ${res.status}`);
            }
            return res.json();
        })
}

export function getProperty(id) {
    return fetch(path + id)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Could not retrieve property: ${res.status}`);
            }
            return res.json();
        })
}


export async function searchRentals(page, sortModel, filterModel) {
    const params = new URLSearchParams();
    params.append("page", page)


    if (sortModel && sortModel.length > 0) {
        params.append("sortBy", sortModel[0].colId);
        params.append("sortOrder", sortModel[0].sort);
    }

    if (filterModel) {
        Object.entries(filterModel).forEach(([field, value]) => {
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

                case "propertyTypes":
                    if (value && Array.isArray(value) && value.length > 0) {
                        value.forEach((propertyType) => {
                            params.append(field, propertyType);
                        });
                    }
                    break;

                default:
                    if (field && value) {
                        params.append(field, value);
                    }
                    break;
            }

            if (field && value) {
                if (value.min) params.append(fieldMin, value.min);
                if (value.max) params.append(fieldMax, value.max);
            }
        });
    }

    const response = await fetch(`${path}search?${params.toString()}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}