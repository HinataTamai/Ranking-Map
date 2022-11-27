import { FC, memo, ReactNode, useContext } from "react";
import { Button, Typography } from "@mui/material";
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';

import { SearchCriteriaContext } from "../../providers/SearchCriteriaProvider";


type Props = {
    children:ReactNode;
    name: string;
    placeId: string;
    originLat?: number | undefined;
    originLng?: number | undefined;
}

export const RouteButton:FC<Props> = memo((props) => {

    const { children, name, placeId, originLat, originLng } = props;
    const { location } = useContext(SearchCriteriaContext);


    const handleClickButton = (pass:string) => {
        window.open(pass);
    };

    return(
        <Button
        sx={{
            backgroundColor:'green',
            color:'white',
            ":hover":{
                backgroundColor:'green'
            },
            py: {md:1, lg:2},
        }}
        onClick={() => {
            if(location === '現在地') {
                handleClickButton('https://www.google.com/maps/dir/?api=1&destination=' + name + '&destination_place_id=' + placeId + '&travelmode=walking');
            } else {
                handleClickButton('https://www.google.com/maps/dir/?api=1&origin=' + originLat + ',' + originLng  + '&destination=' + name + '&destination_place_id=' + placeId + '&travelmode=walking');
            };
        }}>
        <AssistantDirectionIcon sx={{mr:2}} />
        <Typography variant="body1" sx={{fontWeight:'bold'}} >{children}</Typography>
    </Button>
    );
});