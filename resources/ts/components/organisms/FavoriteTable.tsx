import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { FC, memo, useContext, useEffect, useState } from "react";
import { Box, Pagination, TableFooter} from '@mui/material';
import { TextSelect } from '../atoms/TextSelect';
import  resultType  from '../../types/resultType';
import LoadingCircle from '../atoms/LoadingCircle';
import { SelectBox } from '../atoms/SelectBox';
import { DataTableContext } from '../../providers/DataTableProvider';
import { ResultsTableRow } from './ResultsTableRow';
import resultsType from '../../types/resultsType';
import { ResultsTableHead } from './ResultsTableHead';
import { SearchCriteriaContext } from '../../providers/SearchCriteriaProvider';
import { FavoriteTableHead } from './FavoriteTableHead';
import { FavoriteTableRow } from './FavoriteTableRow';
import { useFavorite } from '../../hooks/api/useFavorite';
import { favoritesType, favoriteType } from '../pages/Favorite';
import { AlertMessage } from '../atoms/AlertMessage';

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
    const { isLoading, displayItems } = useContext(DataTableContext);
    
    let emptyRows = 0;
    emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - favorites!.length) : 0;
    
    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        newPage: number,
        ) => {
            console.log(page)
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
    },[deleteCount])


    if(!favorites) {
        return(
            <>
            <LoadingCircle/>
            <AlertMessage/>
            </>
        );
    } else if (favorites[0] === undefined) {
        return(
            <p>お気に入り施設は登録されていません。</p>
        );
    }else {
        return(
            <Box sx={{
                width:{ xs:'98%', sm:'85%',md:'80%'},
                maxWidth: 1125,
                mx: 'auto',
                mt:3
                }}>
                <TableContainer component={Paper} sx={{ mt:2, overflowX:'hidden'}}>
                    <Table sx={{ width:'100%'}} aria-label="customized table">
                        <FavoriteTableHead />
                        <TableBody>
                            {
                                isLoading 
                                ?  <TableRow>
                                        <TableCell colSpan={5}>
                                            <LoadingCircle />
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





