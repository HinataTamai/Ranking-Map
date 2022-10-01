import { FC, memo, useContext, useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from './../../../images/logo.png';
import { HamburgerDrawer } from "./HamburgerDrawer";
import { useAuth } from "../../hooks/api/useAuth";
import { useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";



export const Header:FC = memo( () => {

    const { userInfo } = useContext(AuthContext);
    const { logoutSubmit } = useAuth();
    const navigate = useNavigate();


    const handleClickRegister = () => navigate('/register');
    const handleClickLogin = () => navigate('/login');
    const handleClickLogout = () => logoutSubmit();
    const handleClickFavorite = () => navigate('/favorite');
    const handleClickSetting = () => navigate('/setting');
    const handleClickSearch = () => navigate('/');



    const pages = userInfo.isLogin ?
        [
            {
                text: '検索ページ',
                onClick: handleClickSearch
            },
            {
                text: 'ログアウト',
                onClick: handleClickLogout
            },
            {
                text: 'お気に入り',
                onClick: handleClickFavorite
            },
            {
                text: '検索条件の設定',
                onClick: handleClickSetting
            },
        ]
    :
        [
            {
                text: '検索ページ',
                onClick: handleClickSearch
            },
            {
                text: '新規登録',
                onClick: handleClickRegister
            },
            {
                text: 'ログイン',
                onClick: handleClickLogin
            },
        ]
    ;


    return(
        <AppBar position="sticky" sx={{display: 'block'}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters sx={{display: 'flex',justifyContent: 'space-between'}}>
            <Box component='img' src={Logo} sx={{ display: {xs: 'none',md:'block' }, mr: 1 , height:'70px'}} />
            <Box component='img' src={Logo} sx={{ display: {md: 'none' }, mr: 1 , height:'70px'}} />
            <HamburgerDrawer />
            <Box sx={{ flexGrow: 1, ml: '8%', display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                <Button
                    key={page.text}
                    onClick={page.onClick}
                    sx={{ my: 2, mr: 2, color: 'white', display: 'block', '&:hover': {textDecoration: 'underline'}}}
                >
                    {page.text}
                </Button>
                ))}
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    )
})