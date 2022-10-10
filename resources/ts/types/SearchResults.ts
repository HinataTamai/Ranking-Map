export type resultType = {
    id: number ;
    name: string;
    rating: number;
    distance: number;
    userRatingsTotal: number;
    sumRank: number;
    rank: number;
    originLocation: {
        lat: number | undefined,
        lng: number | undefined
    };
    destinationPlaceId: string;
    photoUrl: string;
    photoAttribution: string;
}

export type resultsType = resultType[]

