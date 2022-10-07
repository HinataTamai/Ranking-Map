import { FC, memo, useContext, useEffect, useState } from "react";
import { Box, Collapse, Divider, IconButton, Stack} from '@mui/material';
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

export const ResultsTableRow:FC<Props> = memo( ( props ) => {

    const { result, displayItems, favorites } = props;

    // const { displayItems } = useContext(DataTableContext);
    const { storeFavorite, deleteFavorite } = useFavorite();
    const { userInfo } = useContext(AuthContext);
    const isLogin = userInfo.isLogin;
    
    const [isFavorite, setIsFavorite] = useState(false);
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen( prev => !prev);
    }

    const handleClickFavorite = () => {
        if(!isFavorite){
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
        setIsFavorite( prev => !prev);
    }



    //既にお気に入りに登録済の施設が検索結果に含まれる場合、isFavoriteをtrueにする
    useEffect(() => {
        favorites?.forEach(favorite => {
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
            
            <StyledTableCell align='left' sx={{wordBreak:'break-all', fontWeight:'bold'}}>
                {result.name}
            </StyledTableCell>
            {displayItems.map(item => (
                <StyledTableCell sx={{display: {md: 'none'}}} align="center" key={item.label}>
                    {result[item.value]}
                </StyledTableCell>
            ))}
            {/* ー－－－－－－－－－－－－↓PC用レイアウト↓ー－－－－－－－－ */}
            <StyledTableCell align="center" sx={{display: {xs: 'none', md: 'table-cell'}}} >
                {result.rating}
            </StyledTableCell>
            <StyledTableCell  align="center" sx={{display: {xs: 'none', md: 'table-cell'}}} >
                {result.userRatingsTotal}
            </StyledTableCell>
            <StyledTableCell align="center" sx={{display: {xs: 'none', md: 'table-cell'}}} >
                {result.distance}
            </StyledTableCell>
            {/* ー－－－－－－－－－－－－↑PC用レイアウト↑ー－－－－－－－－ */}
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
                                sx={{ width: '100%', height: '100%', objectFit: 'cover'}}
                            />
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





