import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { FC, memo, useContext, useEffect, useState } from "react";
import { Box, Button, Collapse, Divider, IconButton, List, ListItem, Pagination, Stack, TableFooter, Typography} from '@mui/material';
import { TextSelect } from '../atoms/TextSelect';
import { SearchCriteriaContext } from '../../providers/SearchCriteriaProvider';
import  resultType  from '../../types/resultType';
import { useMap } from '../../hooks/api/useMap';
import { useSort } from '../../hooks/useSort';
import LoadingCircle from '../atoms/LoadingCircle';
import { SelectBox } from '../atoms/SelectBox';
import { DataTableContext } from '../../providers/DataTableProvider';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import resultsType from '../../types/resultsType';
import { useDataTable } from '../../hooks/useDataTable';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import { PrimaryButton } from '../atoms/PrimaryButton';



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
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const StyledTypography = styled(Typography)({
    fontWeight:'bold'
});

const StyledListItem = styled(ListItem)({
    display:'flex',
    justifyContent:'space-between'
    
})

type DisplayItem = {
    label:string,
    value: 'rating' | 'userRatingsTotal' | 'distance',
};

type Props = {
    result:resultType;
    firstDisplayItem:DisplayItem;
    secondDisplayItem:DisplayItem;
};

export const CollapseTableRow:FC<Props> = memo( ( props ) => {

    const { result, firstDisplayItem, secondDisplayItem} = props;

    const [open,setOpen] = useState(false);
    const { place, results } = useContext(SearchCriteriaContext);
    const { displayItems } = useContext(DataTableContext);
    const { createCollapseDisplayItems } = useDataTable();

    
    let collapseDisplayItems = createCollapseDisplayItems();



    useEffect(() => {
        collapseDisplayItems = createCollapseDisplayItems();
    }, [displayItems]);

    const handleClickButton = (pass:string) => {
        window.open(pass);
    }


    return(
        <>
        <StyledTableRow key={result.id} onClick={() => setOpen(!open)}>
            <StyledTableCell component="th" scope="row" sx={{display:'flex', alignItems:'center', pl:0}}>
                <IconButton
                    aria-label="expand row"
                    size="small"
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                {results.indexOf(result) + 1}
            </StyledTableCell>
            {
            <StyledTableCell align='left' sx={{wordBreak:'break-all', fontWeight:'bold'}}>
                {result.name}
            </StyledTableCell>
            }
            {(displayItems.length > 1

            ?
                <>
                <StyledTableCell align="center">
                    {result[firstDisplayItem.value]}
                </StyledTableCell>
                <StyledTableCell align="center">
                    {result[secondDisplayItem.value]}
                </StyledTableCell>
                </>
            :
                <StyledTableCell align="center">
                    {result[firstDisplayItem.value]}
                </StyledTableCell>
            )}
        </StyledTableRow>
        <TableRow>
            <TableCell colSpan={4} sx={{p:0}}>
                <Collapse in={open} timeout='auto' unmountOnExit sx={{py:2,backgroundColor:'#FAF0E6'}}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent:'space-around',
                        alignItems: 'center'
                        }}>
                        <Box sx={{width:'50%',height:130}}>
                            <Box component='img' src={result.photoUrl} sx={{width:'100%',height:'100%',objectFit:'cover'}}/>
                        </Box>
                        <Stack spacing={2} divider={<Divider/>}>
                            <List sx={{height:'50%',py:0}}>
                                {
                                    displayItems.length > 1
                                    ?
                                    <StyledListItem>
                                        <StyledTypography variant='body1'>
                                            {collapseDisplayItems[0].label} : 
                                        </StyledTypography>
                                        {
                                            collapseDisplayItems[0].label == '距離'
                                            ?
                                            <Typography variant='body1'>
                                                {result[collapseDisplayItems[0].value]}km
                                            </Typography>
                                            :
                                            <Typography variant='body1'>
                                                {result[collapseDisplayItems[0].value]}
                                            </Typography>
                                        }
                                    </StyledListItem>
                                    :
                                    <>
                                    <StyledListItem>
                                        <StyledTypography variant='body1'>
                                            {collapseDisplayItems[0].label} : 
                                        </StyledTypography>
                                        {
                                            collapseDisplayItems[0].label == '距離'
                                            ?
                                            <Typography variant='body1'>
                                                {result[collapseDisplayItems[0].value]}km
                                            </Typography>
                                            :
                                            <Typography variant='body1'>
                                                {result[collapseDisplayItems[0].value]}
                                            </Typography>
                                        }
                                    </StyledListItem>
                                    <StyledListItem>
                                        <StyledTypography variant='body1'>
                                            {collapseDisplayItems[1].label} : 
                                        </StyledTypography>
                                        {
                                            collapseDisplayItems[1].label == '距離'
                                            ?
                                            <Typography variant='body1'>
                                                {result[collapseDisplayItems[1].value]}km
                                            </Typography>
                                            :
                                            <Typography variant='body1'>
                                                {result[collapseDisplayItems[1].value]}
                                            </Typography>
                                        }
                                    </StyledListItem>
                                    </>
                                }
                            </List>
                            <Button
                                sx={{
                                    backgroundColor:'green',
                                    color:'white',
                                    ":hover":{
                                        backgroundColor:'green'
                                    }
                                }}
                                onClick={() => {
                                    handleClickButton('https://www.google.com/maps/dir/?api=1&origin=' + result.originLocation.lat + ',' + result.originLocation.lng  + '&destination=' + result.name + '&destination_place_id=' + result.destinationPlaceId + '&travelmode=walking')
                                }}>
                                <AssistantDirectionIcon sx={{mr:2}} />
                                経路
                            </Button>
                        </Stack>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
        <TableRow></TableRow>
        </>
    )
})