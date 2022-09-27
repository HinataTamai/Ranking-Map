import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { FC, memo, useContext, useEffect, useState } from "react";
import { Box, Button, Collapse, Divider, IconButton, List, ListItem, Stack, Typography} from '@mui/material';
import { DataTableContext } from '../../providers/DataTableProvider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDataTable } from '../../hooks/useDataTable';
import { RouteButton } from '../atoms/RouteButton';
import { useAuth } from '../../hooks/api/useAuth';
import { favoriteType } from '../pages/Favorite';
import { DeleteButton } from '../atoms/DeleteButton';
import theme from '../../Theme';
import { useFavorite } from '../../hooks/api/useFavorite';



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

type DisplayItem = {
    label:string,
    value: 'rating' | 'userRatingsTotal' | 'distance',
};

type Props = {
    favorite: favoriteType;
    setDeleteCount: React.Dispatch<React.SetStateAction<number>>;
};

export const FavoriteTableRow:FC<Props> = ( props ) => {

    const { favorite, setDeleteCount } = props;

    const [open,setOpen] = useState(false);
    const { displayItems } = useContext(DataTableContext);

    const { confirmIsLogin } = useAuth();
    const { deleteFavorite } = useFavorite()
    const { createCollapseDisplayItems } = useDataTable();
    let collapseDisplayItems = createCollapseDisplayItems();





    useEffect(() => {
        collapseDisplayItems = createCollapseDisplayItems();
    }, [displayItems]);

    const handleClickDelete = () => {
        deleteFavorite(favorite.placeId);
        setDeleteCount(prev => prev + 1);
    }
    
    const onClick = () => {
    }

    console.log('renderRow')

    return(
        <>
        <StyledTableRow onClick={() => setOpen(!open)}>
            <StyledTableCell component="th" scope="row" sx={{display:'flex', alignItems:'center', pl:0, fontWeight: 'bold'}}>
                <IconButton
                    aria-label="expand row"
                    size="small"
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                {favorite.name}
            </StyledTableCell>
            <StyledTableCell align='center'>{ favorite.rate }</StyledTableCell>
            <StyledTableCell align='center'>{ favorite.userRatingsTotal }</StyledTableCell>
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
                                src={favorite.photoUrl} 
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit:'cover',
                                }}
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





