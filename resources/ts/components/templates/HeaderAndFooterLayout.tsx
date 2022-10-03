import React, { FC, memo, useContext, useEffect } from "react";
import { styled } from "@mui/system";
import { Header } from "../organisms/Header";
import { AuthContext } from "../../providers/AuthProvider";
import { useAuth } from "../../hooks/api/useAuth";


type Props = {
    children:React.ReactNode;
};


const StyledFooter = styled('footer')(({ theme }) => ({
    display: 'block',
    position: 'sticky',
    padding:10,
    textAlign:'center',
    backgroundColor:theme.palette.primary.main
}));

export const HeaderAndFooterLayout:FC<Props> = memo( (props) => {

    const { children } = props;
    const { setUserInfo } = useContext(AuthContext);
    const { confirmIsLogin } = useAuth();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    useEffect(() => {
        console.log('headerレンダリング')
        confirmIsLogin();
    },[]);

    
    return(
        <>
        <Header/>
        {children}
        <StyledFooter id='footer'>
        <small>© hinatatamai 2022</small>
        </StyledFooter>
        </>
    )
});