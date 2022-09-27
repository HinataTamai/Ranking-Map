import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC, memo } from "react"
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { HeaderAndFooterLayout } from "../templates/HeaderAndFooterLayout";

const Page404:FC  =  memo(() => {

    const navigate = useNavigate();

    const handleClickButton = () => {
        navigate('/');
    }

    return(
        <HeaderAndFooterLayout>
            <Box sx={{textAlign: 'center',py:'15vh'}}>
                <Typography variant="h1" sx={{mb:'5vh'}}>
                    404
                </Typography>
                <Typography variant="body1" sx={{mb:'10vh'}}>
                    お探しのページが見つかりません。
                    <br/>
                    一時的にアクセスできない状況にあるか、
                    <br/>
                    移動もしくは削除された可能性があります。
                </Typography>
                <PrimaryButton
                    onClick={handleClickButton}
                >
                <Typography sx={{fontWeight: 'bold',px:3}}>
                    検索ページに戻る
                </Typography>
                </PrimaryButton>
            </Box>
        </HeaderAndFooterLayout>
    )
})

export default Page404;