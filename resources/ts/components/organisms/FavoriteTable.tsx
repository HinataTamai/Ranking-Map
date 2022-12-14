import React, { FC, useContext, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import { Box, Pagination, TableFooter, Typography} from '@mui/material';

import LoadingCircle from '../atoms/LoadingCircle';
import { TextSelect } from '../atoms/TextSelect';
import { AuthContext } from '../../providers/AuthProvider';
import { DataTableContext } from '../../providers/DataTableProvider';
import { FavoriteTableHead } from './FavoriteTableHead';
import { FavoriteTableRow } from './FavoriteTableRow';
import { useFavorite } from '../../hooks/api/useFavorite';
import { favoritesType, favoriteType } from '../../types/FavoriteTypes';
import { AlertMessage } from '../atoms/AlertMessage';
import { Stack } from "@mui/system";





export type displayItem = {
    label:string,
    value: 'rating' | 'userRatingsTotal' | 'distance',
};

export const FavoriteTable:FC = () => {


    const rowsPerPageSelects = [
        {
            value: 5,
            label:'5'
        },
        {
            value: 10,
            label:'10'
        },
        {
            value: 15,
            label:'15'
        },
        {
            value: 20,
            label:'20'
        },
        {
            value: -1,
            label:'すべて表示'
        },
    ]

    const [page, setPage] = useState(0);
    const [deleteCount, setDeleteCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [favorites,setFavorites] = useState<favoritesType>();
    const { indexFavorite } = useFavorite();
    const { userInfo } = useContext(AuthContext);
    const { isLoading } = useContext(DataTableContext);
    
    let emptyRows = 0;
    emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - favorites!.length) : 0;
    
    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        newPage: number,
        ) => {
            setPage(newPage - 1);
    };
    
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    useEffect(() => {
        
        indexFavorite().then(res => {
            setFavorites(res);
        });
    },[deleteCount,userInfo.id])


    if(!favorites) {
        return(
            <>
            <Stack justifyContent='center' sx={{height: '80vh'}}>
                <LoadingCircle interval={200}/>
            </Stack>
            <AlertMessage/>
            </>
        );
    } else if (favorites[0] === undefined) {
        return(
            <>
            <Stack justifyContent='center' alignItems='center' sx={{height: '70vh'}}>
                <Typography 
                    variant='body1' 
                    sx={{fontSize: {xs: '1.2rem', sm: '1.4rem', md: '1.6rem'}, fontWeigh: 'bold'}}>
                    お気に入り施設が登録されていません。
                </Typography>
            </Stack>
            <AlertMessage/>
            </>
        );
    }else {
        return(
            <Box sx={{
                width:{ xs:'98%', sm:'85%',md:'80%'},
                maxWidth: 800,
                mx: 'auto',
                my: '8vh'
                }}>
                <TableContainer component={Paper} sx={{ mt:2, overflowX:'hidden'}}>
                    <Table sx={{ width:'100%'}} color='secondary' >
                        <FavoriteTableHead />
                        <TableBody>
                            {
                                isLoading 
                                ?  <TableRow>
                                        <TableCell colSpan={5}>
                                            <LoadingCircle interval={200} />
                                        </TableCell>
                                    </TableRow>
                                :    (rowsPerPage > 0
                                        ? favorites.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : favorites
                                        ).map((favorite:favoriteType) => (
                                            <FavoriteTableRow 
                                                key={favorite.placeId}
                                                favorite={favorite}
                                                setDeleteCount={setDeleteCount}
                                            />
                                        ))
                            }
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={5} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={5} sx={{pt:1, pr:2.5, pb:1, pl:0}}>
                                    <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                                    <TextSelect
                                        id='rowsPerPageSelect' 
                                        label='表示する行数' 
                                        variant='standard' 
                                        selectValue={rowsPerPage.toString()} 
                                        selectValues={rowsPerPageSelects}  
                                        width={80}
                                        onChange={handleChangeRowsPerPage} 
                                    />
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={5} sx={{px:1.1, borderBottom:'none'}}>
                                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                        <Pagination     
                                            count={Math.ceil(favorites.length / rowsPerPage)}
                                            page={page +1}
                                            onChange={handleChangePage}
                                            sx={{mx:'auto'}}
                                            size='medium'
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Box>
        );
    }
}





