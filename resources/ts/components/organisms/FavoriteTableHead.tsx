import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { FC, memo, useContext, useEffect, useState } from "react";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight:'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));



export const FavoriteTableHead: FC = memo( () => {

    const headerItems = [
        '評価平均',
        '評価総数',
    ]


    return(
        <TableHead>
            <TableRow>
                <StyledTableCell align="center" sx={{minWidth:160,px:1}}>店名</StyledTableCell>
                { headerItems.map( item => (
                    <StyledTableCell
                        key={item}
                        align="center" 
                        sx={{
                            display :{md: 'none'},
                            minWidth:65,
                            wordBreak:'break-all',
                        }}
                    >
                        {item}
                    </StyledTableCell>
                ))}

                { headerItems.map( item => (
                    <StyledTableCell
                        key={item}
                        align="center"
                        sx={{display: {xs: 'none', md:'table-cell'}}}
                    >
                        {item}
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    )
})





