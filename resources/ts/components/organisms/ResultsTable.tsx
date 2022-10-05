import React, { FC, memo, useContext, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Pagination, TableFooter} from '@mui/material';

import { TextSelect } from '../atoms/TextSelect';
import  resultType  from '../../types/resultType';
import LoadingCircle from '../atoms/LoadingCircle';
import { DisplaySelect } from '../atoms/DisplaySelect';
import { DataTableContext } from '../../providers/DataTableProvider';
import { ResultsTableRow } from './ResultsTableRow';
import { ResultsTableHead } from './ResultsTableHead';
import { SearchCriteriaContext } from '../../providers/SearchCriteriaProvider';
import { useFavorite } from '../../hooks/api/useFavorite';
import { favoritesType } from '../pages/Favorite';
import { AuthContext } from '../../providers/AuthProvider';



export type displayItems = {
    label:string,
    value: 'rating' | 'userRatingsTotal' | 'distance',
}[];


export const ResultsTable: FC = memo( () => {

    const { results } = useContext(SearchCriteriaContext);
    const { indexFavorite } = useFavorite();
    const { userInfo } = useContext(AuthContext);


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
    const [favorites, setFavorites] = useState<favoritesType>();
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { 
        isLoading,
        display,
    } = useContext(DataTableContext);



    const [displayItems, setDisplayItems] = useState<displayItems>([
        {
            label: '評価平均',
            value: 'rating'
        },
        {
            label: '評価総数',
            value: 'userRatingsTotal'
        },
    ]);





    useEffect(() => {
        setDisplayItems([]);
        display.forEach(item => {
            switch(item) {
                case '評価平均':
                    setDisplayItems( prev => ([
                            ...prev,
                            {
                                label: '評価平均',
                                value: 'rating'
                            }
                    ]));
                    break;
                case '評価総数':
                    setDisplayItems( prev => ([
                        ...prev,
                        {
                            label: '評価総数',
                            value: 'userRatingsTotal'
                        }
                    ]));
                    break;
                case '距離':
                    setDisplayItems( prev => ([
                        ...prev,
                        {
                            label: '距離(km)',
                            value: 'distance'
                        }
                    ]));
                    break;
            }
        });
    },[display]);
    
    
    
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - results.length) : 0;
    
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
        if(userInfo.isLogin) {
            indexFavorite().then(res => {
                setFavorites(res);
            })
        }
    },[]);

    return(
        <Box sx={{
            width:{ xs:'98%', sm:'90%',md:'80%'},
            maxWidth: 1125,
            mx: 'auto',
            mt:3
            }}>
            <Box sx={{
                display: {
                    xs: 'flex',
                    md: 'none'
                }, 
                justifyContent:'flex-end'
                }}>
                <DisplaySelect />
            </Box>
            <TableContainer component={Paper} sx={{ mt:2, overflowX:'hidden'}}>
                <Table sx={{ width:'100%'}} aria-label="customized table">
                    <ResultsTableHead displayItems={displayItems} />
                    <TableBody>
                        {
                            isLoading 
                            ?  <TableRow>
                                    <TableCell colSpan={5}>
                                        <LoadingCircle interval={200} />
                                    </TableCell>
                                </TableRow>
                            :    (rowsPerPage > 0
                                    ? results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : results
                                    ).map((result:resultType) => (
                                        <ResultsTableRow
                                            key={result.id}
                                            result={result}
                                            favorites={favorites}
                                            displayItems={displayItems}
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
                                        count={Math.ceil(results.length / rowsPerPage)}
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
    )
})





