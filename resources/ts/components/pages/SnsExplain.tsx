import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, memo } from "react"
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../atoms/PrimaryButton";
import theme from "../../Theme";
import { HeaderAndFooterLayout } from "../templates/HeaderAndFooterLayout";

const SnsExplain:FC  =  memo(() => {

    const navigate = useNavigate();


    return(
        <HeaderAndFooterLayout>
            <Box sx={{width: '85%', maxWidth:600, mx: 'auto', py:'15vh'}}>
                <Typography align="center" variant="h4" fontWeight='bold'>SNS認証について</Typography>
                <Divider color={theme.palette.primary.main} sx={{mt :'1em',borderBottomWidth: 3}}/>
                <Typography variant="body1" sx={{mt:'5vh', fontSize: {xs: '1.1rem',sm: '1.2rem'}}}>
                    SNSアカウントと当サイトを連携することで、各SNSアカウントを用いてのログインが可能となります。<br/>なお、ログイン時の認証画面にて許可を頂いた場合に限り、各SNSアカウントとの連携を行います。
                </Typography>
            </Box>
        </HeaderAndFooterLayout>
    )
})

export default SnsExplain;