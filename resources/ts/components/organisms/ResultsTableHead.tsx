import { FC, memo, useContext } from "react";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { displayItems } from './ResultsTable';


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

type Props = {
    displayItems: displayItems;
}



export const ResultsTableHead: FC<Props> = memo( ({ displayItems}) => {



    return(
        <TableHead>
            <TableRow>
                <StyledTableCell sx={{minWidth:30,pr:1}}>順位</StyledTableCell>
                <StyledTableCell align="center" sx={{minWidth:155,px:1}}>店名</StyledTableCell>
                { displayItems.map(item => (
                    <StyledTableCell
                        key={item.label}
                        align="center" 
                        sx={{
                            display :{md: 'none'},
                            minWidth:{xs: 35, sm:60},
                            maxWidth: {xs: 35,sm:200},
                            wordBreak:'break-all',
                        }}
                    >
                        {item.label}
                    </StyledTableCell>
                ))}
                {/* ー－－－－－－－－－－－－↓PC用レイアウト↓ー－－－－－－－－ */}
                <StyledTableCell align="center" sx={{display: {xs: 'none', md:'table-cell'}}}>
                    評価平均
                </StyledTableCell>
                <StyledTableCell align="center" sx={{display: {xs: 'none', md:'table-cell'}}}>
                    評価総数
                </StyledTableCell>
                <StyledTableCell align="center" sx={{display: {xs: 'none', md:'table-cell'}}}>
                    距離（km）
                </StyledTableCell>
                {/* ー－－－－－－－－－－－－↑PC用レイアウト↑ー－－－－－－－－ */}
            </TableRow>
        </TableHead>
    )
})





