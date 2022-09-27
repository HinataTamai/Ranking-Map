import { Box } from "@mui/system";
import { FC, memo, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { SearchCriteriaContext } from "../../providers/SearchCriteriaProvider";
import { AlertMessage } from "../atoms/AlertMessage";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { ResultsTable } from "../organisms/ResultsTable";
import { HeaderAndFooterLayout } from "../templates/HeaderAndFooterLayout";
import { ResultsTableHead } from '../organisms/ResultsTableHead';

import Page404 from "./Page404";

const SearchResults:FC  =  memo(() => {


    const { isHavingValue } = useContext(SearchCriteriaContext);

    const navigate = useNavigate();

    const onClickButton = () => {
        navigate('/');
    }


    if (isHavingValue) {

        return(
            <HeaderAndFooterLayout>
            <ResultsTable/>
            <Box sx={{width:'80%', mx:'auto', my:2}}>
                <PrimaryButton disabled={false} onClick={onClickButton} fullWidth={true}>
                    条件を変更して再検索
                </PrimaryButton>
            </Box>
            <AlertMessage/>
            </HeaderAndFooterLayout>
        )
    } else {
        return(
            <Page404/>
        )
    }
})

export default SearchResults;