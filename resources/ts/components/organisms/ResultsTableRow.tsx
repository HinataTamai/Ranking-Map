import { FC, memo, useContext, useEffect, useState } from "react";
import { Box, Collapse, Divider, IconButton, Stack, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { resultType } from '../../types/SearchResults';
import { ResultsTableRowList } from './ResultsTableRowList';
import { RouteButton } from '../atoms/RouteButton';
import { useFavorite } from '../../hooks/api/useFavorite';
import { displayItems } from './ResultsTable';
import { favoritesType } from '../../types/FavoriteTypes';
import { AuthContext } from '../../providers/AuthProvider';
import { useMap } from "../../hooks/api/useMap";
import { useAlert } from "../../hooks/useAlert";
import axios from "axios";




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight:'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        borderBottom:'none'
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

type Props = {
    result:resultType;
    favorites:favoritesType | undefined;
    displayItems: displayItems;
};

export const ResultsTableRow:FC<Props> =  ( props ) => {

    const { result, displayItems, favorites } = props;

    const { getPlacePhoto } = useMap();
    const { storeFavorite, deleteFavorite } = useFavorite();
    const { changeAlertStatus } = useAlert();
    const { userInfo } = useContext(AuthContext);
    const isLogin = userInfo.isLogin;
    
    const [isFavorite, setIsFavorite] = useState(false);
    const [open, setOpen] = useState(false);
    const [photoData, setPhotoData] = useState({
        base64String:'',
        href: '',
        from: ''
    });


    const handleClickOpen = () => {
        setOpen( prev => !prev);
    }

    const handleClickFavorite = () => {
        if(!isFavorite){
            storeFavorite(
                result.name,
                result.destinationPlaceId,
                String(result.rating),
                String(result.userRatingsTotal),
                photoData.base64String,
                result.photoAttribution
            );
        } else {
            deleteFavorite(result.destinationPlaceId);
        }
        setIsFavorite( prev => !prev);
    }



    useEffect(() => {
        //?????????????????????????????????????????????????????????????????????????????????isFavorite???true?????????
        favorites?.forEach(favorite => {
            if(favorite.placeId === result.destinationPlaceId) {
                setIsFavorite(true);
            }
        });

        //???????????????????????????????????????????????????????????????????????????
        axios.post('/api/place_photos/get',{
            placeId: result.destinationPlaceId
        }).then(res => {
            if(res.data.status === 200) {   
                //???????????????????????????
                setPhotoData(prev => ({
                    ...prev,
                    base64String: res.data.photo_data,
                    href: res.data.photo_attribution.split(/["<>]/)[2],
                    from: res.data.photo_attribution.split(/["<>]/)[4]
                }));
            } else {    
                //??????????????????????????????
                //?????????????????????????????????????????????
                getPlacePhoto(result.photoReference).then(value => {
                    setPhotoData(prev => ({
                        ...prev,
                        base64String: value,
                        href: result.photoAttribution.split(/["<>]/)[2],
                        from: result.photoAttribution.split(/["<>]/)[4]
                    }));
                    axios.post('/api/place_photos/store', {
                        placeId: result.destinationPlaceId,
                        photoData: value,
                        photoAttribution: result.photoAttribution
                    });
                }).catch((e) => {
                    throw(e);
                });
            }
        }).catch(e => {
            changeAlertStatus(true, e.message, 'error', 'bottom', 'center');
        });
    },[]);


    return(
        <>
        <StyledTableRow onClick={handleClickOpen}>
            <StyledTableCell component="th" scope="row" sx={{display:'flex', alignItems:'center', pl:0}}>
                <IconButton
                    aria-label="expand row"
                    size="small"
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                {result.rank}
            </StyledTableCell>
            
            <StyledTableCell align='left' sx={{wordBreak:'break-all', fontWeight:'bold'}}>
                {result.name}
            </StyledTableCell>
            {displayItems.map(item => (
                <StyledTableCell sx={{display: {md: 'none'}}} align="center" key={item.label}>
                    {result[item.value]}
                </StyledTableCell>
            ))}
            {/* ??????????????????????????????????????????PC???????????????????????????????????????????????? */}
            <StyledTableCell align="center" sx={{display: {xs: 'none', md: 'table-cell'}}} >
                {result.rating}
            </StyledTableCell>
            <StyledTableCell  align="center" sx={{display: {xs: 'none', md: 'table-cell'}}} >
                {result.userRatingsTotal}
            </StyledTableCell>
            <StyledTableCell align="center" sx={{display: {xs: 'none', md: 'table-cell'}}} >
                {result.distance}
            </StyledTableCell>
            {/* ??????????????????????????????????????????PC???????????????????????????????????????????????? */}
        </StyledTableRow>
        <TableRow>
            <TableCell colSpan={5} sx={{p:0}}>
                <Collapse 
                    unmountOnExit 
                    in={open} 
                    timeout='auto' 
                    sx={{
                        pt: isLogin ? 0 : 2,
                        pb: 2,
                        backgroundColor: '#FAF0E6'
                    }}
                >
                    <IconButton 
                        sx={{display: isLogin ? 'block' : 'none', ml:'auto', mr: '1%'}}
                        onClick={handleClickFavorite}
                    > 
                        {isFavorite ? <StarIcon color='primary' /> :<StarBorderIcon/>}
                    </IconButton>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        pl: {md:'10%'}
                    }}>
                        <Box 
                            sx={{
                                width: {xs:'50%', sm:'40%', md:'32%', lg:'30%'},
                            }}
                        >
                            <Box
                                component='img' 
                                src={`data:image/jpeg;base64,${photoData.base64String}`} 
                                sx={{ width: '100%', height: '100%', objectFit: 'cover'}}
                            />
                            <Typography sx={{display: 'inline', fontSize: '0.7rem'}}>
                                ??????????????????
                            </Typography>
                            <Typography sx={{fontSize: '0.7rem', wordBreak: 'break-all'}} 
                            component='a' href={photoData.href} >
                                {photoData.from}
                            </Typography>
                        </Box>
                        <Stack spacing={2}  sx={{ width: '35%', height: '100%',}} >
                            <ResultsTableRowList result={result}/>
                            <Divider sx={{display:{md:'none'}}} />
                            { document.documentElement.clientWidth < 834 
                            ?
                                <RouteButton 
                                    name={result.name} 
                                    placeId={result.destinationPlaceId} 
                                    originLat={result.originLocation.lat} 
                                    originLng={result.originLocation.lng} 
                                >
                                    ??????
                                </RouteButton>
                            :
                                <RouteButton 
                                    name={result.name} 
                                    placeId={result.destinationPlaceId} 
                                    originLat={result.originLocation.lat} 
                                    originLng={result.originLocation.lng} 
                                >
                                    ???????????????????????????
                                </RouteButton>
                            }
                        </Stack>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
        <TableRow></TableRow>
        </>
    )
}





