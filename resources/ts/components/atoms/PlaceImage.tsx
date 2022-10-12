import React, { FC, memo, useEffect, useState } from "react";
import { Box } from '@mui/material';
import { useMap } from "../../hooks/api/useMap";
import { resultType } from "../../types/SearchResults";
import { favoriteType } from "../../types/FavoriteTypes";

type Props = {
    establishment: resultType | favoriteType;
}



export const PlaceImage:FC<Props> = memo (({ establishment }) => {

    const { getPlacePhoto } = useMap();
    const [data, setData] = useState('');

    useEffect(() => {
        getPlacePhoto(establishment.photoReference).then(value => {
            setData(value);
            console.log('status: ok');
        }).catch(() => {
            console.log('status: error')
        });
        console.log('render')
    },[]);

    return(
        <Box
            component='img' 
            src={`data:image/jpeg;base64,${data}`} 
            sx={{ width: '100%', height: '100%', objectFit: 'cover'}}
        />
    )
})