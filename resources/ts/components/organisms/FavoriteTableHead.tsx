import { FC, memo } from "react";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



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

    return(
        <TableHead>
            <TableRow>
                <StyledTableCell align="center" sx={{minWidth:160,px:1}}>店名</StyledTableCell>
                <StyledTableCell align="center" sx={{ minWidth:120 }}>
                    評価平均（母数）
                </StyledTableCell>
            </TableRow>
        </TableHead>
    )
})





