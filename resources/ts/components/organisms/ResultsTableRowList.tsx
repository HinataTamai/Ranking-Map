import { FC, memo, useContext } from "react"
import { List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { useDataTable } from "../../hooks/useDataTable";
import { DataTableContext } from "../../providers/DataTableProvider";
import { resultType } from "../../types/SearchResults";

const StyledListItem = styled(ListItem)({
    display:'flex',
    justifyContent:'space-between',
    paddingLeft: 0,
});

const StyledTypography = styled(Typography)({
    fontWeight:'bold'
});

type Props = {
    result: resultType;
};


export const ResultsTableRowList:FC<Props> = memo((props) => {

    const { result } = props;
    const { display } = useContext(DataTableContext);


    const { createCollapseDisplayItems } = useDataTable();
    let collapseDisplayItems = createCollapseDisplayItems();

    return(
        <List sx={{ display: {md: 'none'}, height:'50%', py: 0 }}>
        { display.length > 1
        ?
            <StyledListItem>
                <StyledTypography variant='body1'>
                    {collapseDisplayItems[0].label} : 
                </StyledTypography>
                { collapseDisplayItems[0].label == '距離'
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
                { collapseDisplayItems[0].label == '距離'
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
                { collapseDisplayItems[1].label == '距離'
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
    );
});