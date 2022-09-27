import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { FC, memo, useContext, useEffect, useState } from "react";
import { Box, Collapse, Divider, IconButton, List, ListItem, Stack, Typography} from '@mui/material';
import  resultType  from '../../types/resultType';
import { DataTableContext } from '../../providers/DataTableProvider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDataTable } from '../../hooks/useDataTable';
import { RouteButton } from '../atoms/RouteButton';
import { ResultsTableRowList } from './ResultsTableRowList';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useAuth } from '../../hooks/api/useAuth';
import { useFavorite } from '../../hooks/api/useFavorite';
import { displayItem } from './ResultsTable';
import { favoritesType } from '../pages/Favorite';



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
    firstDisplayItem:displayItem;
    secondDisplayItem:displayItem;
};

export const ResultsTableRow:FC<Props> = memo( ( props ) => {

    const { result, firstDisplayItem, secondDisplayItem, favorites } = props;

    const [open, setOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const { displayItems } = useContext(DataTableContext);

    const { storeFavorite, deleteFavorite } = useFavorite();
    const { confirmIsLogin } = useAuth();
    const isLogin = confirmIsLogin();

    const handleClickOpen = () => {
        setOpen( prev => !prev);
    }
    const handleClickFavorite = () => {
        setIsFavorite( prev => !prev);
    }

    useEffect(() => {
        if(isFavorite){
            const rate = String(result.rating);
            const userRatingsTotal = String(result.userRatingsTotal);
            storeFavorite(
                result.name,
                result.destinationPlaceId,
                rate,
                userRatingsTotal,
                result.photoUrl,
                result.photoAttribution
            );
        } else {
            deleteFavorite(result.destinationPlaceId);
        }
    },[isFavorite]);

    useEffect(() => {
        favorites?.forEach(favorite => {
            console.log( 'favorite:' + favorite.placeId);
            console.log( 'results' + result.destinationPlaceId);
            if(favorite.placeId === result.destinationPlaceId) {
                setIsFavorite(true);
            }
        }) ;
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
            
            {<StyledTableCell align='left' sx={{wordBreak:'break-all', fontWeight:'bold'}}>
                {result.name}
            </StyledTableCell>}
            {(displayItems.length > 1
            ?
            <>
            <StyledTableCell align="center" sx={{display: {md: 'none'}}}>
                {result[firstDisplayItem.value]}
            </StyledTableCell>
            <StyledTableCell  align="center" sx={{display: {md: 'none'}}}>
                {result[secondDisplayItem.value]}
            </StyledTableCell>
            </>
            :
                <StyledTableCell sx={{display: {md: 'none'}}} align="center">
                    {result[firstDisplayItem.value]}
                </StyledTableCell>
            )}
            <StyledTableCell align="center" sx={{display: {xs: 'none', md: 'table-cell'}}} >
                {result.rating}
            </StyledTableCell>
            <StyledTableCell  align="center" sx={{display: {xs: 'none', md: 'table-cell'}}} >
                {result.userRatingsTotal}
            </StyledTableCell>
            <StyledTableCell align="center" sx={{display: {xs: 'none', md: 'table-cell'}}} >
                {result.distance}
            </StyledTableCell>
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
                        justifyContent:{xs:'space-around', md:'flex-start'},
                        alignItems: {xs:'center'},
                        pl: {md:'10%'}
                    }}>
                        <Box 
                            sx={{
                                width: {xs:'50%', sm:'40%', md:'32%', lg:'30%'},
                                alignSelf: 'stretch'
                            }}
                            >
                        <Box
                            component='img' 
                            src={result.photoUrl} 
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit:'cover',
                            }}
                        />
                        </Box>
                        <Stack
                            spacing={2} 
                            sx={{
                                width: '35%',
                                height: '100%',
                            }}
                        >
                            <ResultsTableRowList result={result}/>
                            <Divider sx={{display:{md:'none'}}} />
                            {
                            document.documentElement.clientWidth < 834 
                            ?
                            <RouteButton 
                                name={result.name} 
                                placeId={result.destinationPlaceId} 
                                originLat={result.originLocation.lat} 
                                originLng={result.originLocation.lng} 
                            >
                                経路
                            </RouteButton>
                            :
                            <RouteButton 
                                name={result.name} 
                                placeId={result.destinationPlaceId} 
                                originLat={result.originLocation.lat} 
                                originLng={result.originLocation.lng} 
                            >
                                経路案内を開始する
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
})





