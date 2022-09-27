import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC, memo, useContext } from "react";
import { DataTableContext } from '../../providers/DataTableProvider';
import { displayItem } from './ResultsTable';


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
    firstDisplayItem: displayItem;
    secondDisplayItem: displayItem;
}



export const ResultsTableHead: FC<Props> = memo( ({ firstDisplayItem, secondDisplayItem}) => {


    const { displayItems } = useContext(DataTableContext);


    return(
        <TableHead>
            <TableRow>
                <StyledTableCell sx={{minWidth:30,pr:1}}>順位</StyledTableCell>
                <StyledTableCell align="center" sx={{minWidth:160,px:1}}>店名</StyledTableCell>

                {(displayItems.length > 1
                ? 
                <>
                <StyledTableCell
                    align="center" 
                    sx={{
                        display :{md: 'none'},
                        minWidth:35,
                        wordBreak:'break-all',
                    }}
                >
                    {firstDisplayItem.label}
                </StyledTableCell>
                <StyledTableCell
                    align="center" 
                    sx={{
                        display :{md: 'none'},
                        minWidth:35,
                        wordBreak:'break-all',
                    }}
                >
                    {secondDisplayItem.label}
                </StyledTableCell>
                </>
                :
                <StyledTableCell
                    align="center" 
                    sx={{
                        display: {md: 'none'},
                        minWidth:39,
                        pl:1,
                        wordBreak:'break-all'
                    }}
                >
                {firstDisplayItem.label}
                </StyledTableCell>
                )}

                <StyledTableCell
                    align="center"
                    sx={{display: {xs: 'none', md:'table-cell'}}}
                >
                評価平均
                </StyledTableCell>
                <StyledTableCell
                    align="center"
                    sx={{display: {xs: 'none', md:'table-cell'}}}
                >
                評価総数
                </StyledTableCell>
                <StyledTableCell
                    align="center"
                    sx={{display: {xs: 'none', md:'table-cell'}}}
                >
                距離（km）
                </StyledTableCell>
            </TableRow>
        </TableHead>
    )
})





