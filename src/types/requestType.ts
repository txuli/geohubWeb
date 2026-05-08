export interface request {
    qid: string;
    country?: string;
    CapitalLabel?: string;
    iso2: string;
    lat?: number;
    lon?: number;
    continentLabel?: string;
    population?: number;
    lifeExpectancy?: number;
    continent: string
}

export interface CityResponse {
    city: string
    cityLabel: string
    population: number
    location: {
        type: string
        coordinates: [number, number] // [longitude, latitude]
    }
    country?: string | { country: string; iso2?: string }
    updateTime?: string
}
