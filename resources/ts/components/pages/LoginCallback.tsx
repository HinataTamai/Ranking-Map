import { FC, memo, useEffect } from "react"
import { HeaderAndFooterLayout } from "../templates/HeaderAndFooterLayout";
import { AlertMessage } from "../atoms/AlertMessage";
import LoadingCircle from "../atoms/LoadingCircle";
import { useLocation } from "react-router";
import { useAuth } from "../../hooks/api/useAuth";

const LoginCallback:FC  =  memo(() => {

    const { socialLogin } = useAuth();
    const token = useLocation().search
    const path = useLocation().pathname.split('/');
    const provider = path[2];

    useEffect(() => {
        socialLogin(provider, token);
    },[]);


    return(
        <HeaderAndFooterLayout>
            <LoadingCircle interval={200}/>
            <AlertMessage/>
        </HeaderAndFooterLayout>
    );
});

export default LoginCallback;