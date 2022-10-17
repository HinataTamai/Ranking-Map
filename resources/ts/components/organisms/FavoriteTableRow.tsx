import React, { FC, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, Collapse, IconButton, Stack, Typography} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { RouteButton } from '../atoms/RouteButton';
import { favoriteType } from '../../types/FavoriteTypes';
import { DeleteButton } from '../atoms/DeleteButton';
import theme from '../../Theme';
import { useFavorite } from '../../hooks/api/useFavorite';
import { useMap } from "../../hooks/api/useMap";
import { useAlert } from "../../hooks/useAlert";



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
    favorite: favoriteType;
    setDeleteCount: React.Dispatch<React.SetStateAction<number>>;
};

export const FavoriteTableRow:FC<Props> = ( props ) => {

    const { favorite, setDeleteCount } = props;

    const { deleteFavorite } = useFavorite();
    const { changeAlertStatus } = useAlert();
    const { getPlacePhoto } = useMap();

    const [open, setOpen] = useState(false);
    const [reference ,setReference] = useState('');



    const handleClickDelete = () => {
        deleteFavorite(favorite.placeId);
        setDeleteCount(prev => prev + 1);
    }

    useEffect(() => {
        getPlacePhoto(favorite.photoReference).then(value => {
            setReference(value);
        }).catch(e => {
            changeAlertStatus(
                true,
                e.message,
                'error',
                'bottom',
                'center'
            )
        })
    }, []);


    return(
        <>
        <StyledTableRow onClick={() => setOpen(!open)}>
            <StyledTableCell component="th" scope="row" sx={{display:'flex', alignItems:'center', pl:0, fontWeight: 'bold'}}>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    sx={{mr: {md: 10}}}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                {favorite.name}
            </StyledTableCell>
            <StyledTableCell align='center'>
                <Typography variant='body1' >
                { favorite.rate + '（' + favorite.userRatingsTotal + '）'}
                </Typography>
            </StyledTableCell>
        </StyledTableRow>
        <TableRow>
            <TableCell colSpan={5} sx={{p:0}}>
                <Collapse 
                    unmountOnExit 
                    in={open} 
                    timeout='auto' 
                    sx={{
                        py: 2,
                        backgroundColor: '#FAF0E6'
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent:'space-around',
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
                                src={`data:image/jpeg;base64,${reference}`} 
                                sx={{ width: '100%', height: '100%', objectFit: 'cover'}}
                            />
                        </Box>
                        <Stack 
                            spacing={ document.documentElement.clientWidth < 834 ? 2 :3} 
                            sx={{
                                width: {md:'100%'},
                                maxWidth: {sm:'50%', md:'30%'},
                                minWidth: {sm: '40%',md: '30%'}
                            }}
                        >
                            <DeleteButton onClick={handleClickDelete} fullWidth>お気に入り解除</DeleteButton>
                            {
                            document.documentElement.clientWidth < theme.breakpoints.values.md 
                            ?
                            <RouteButton 
                            name={favorite.name} 
                            placeId={favorite.placeId} 
                            >
                                経路
                            </RouteButton>
                            :
                            <RouteButton 
                            name={favorite.name} 
                            placeId={favorite.placeId} 
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
}





