import React, { createContext, FC, memo, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from '../hooks/api/useAuth';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import { AuthContext } from "./AuthProvider";

type Props = {
    children: React.ReactNode;
}
type DrawerItems = {
    text: string;
    icon: JSX.Element;
    onClick: () => void;
}[];


export const HamburgerDrawerContext = createContext({} as {
    drawerItems: DrawerItems;
    setDrawerItems: React.Dispatch<React.SetStateAction<DrawerItems>>;
});


export const HamburgerDrawerProvider:FC<Props> = memo( (props) => {

    const  navigate  = useNavigate();
    const { logoutSubmit, confirmIsLogin } = useAuth(); 
    const { userInfo } = useContext(AuthContext);
    const handleClickRegister = () => navigate('/register');
    const handleClickLogin = () => navigate('/login');
    const handleClickLogout = () => logoutSubmit();
    const handleClickFavorite = () => navigate('/favorite');
    const handleClickSetting = () => navigate('/setting');
    const handleClickSearch = () => navigate('/');

    const { children } = props;
    
    const [drawerItems, setDrawerItems] = useState<DrawerItems>(
        userInfo.isLogin ?
        [
            {
            text: '検索ページ',
            icon: <SearchIcon />,
            onClick: handleClickSearch
            },
            {
            text: 'ログアウト',
            icon: <LogoutIcon/>,
            onClick: handleClickLogout
            },
            {
            text: 'お気に入り',
            icon: <StarIcon color='primary'/>,
            onClick: handleClickFavorite
            },
            {
            text: '検索条件の設定',
            icon: <SettingsIcon/>,
            onClick: handleClickSetting
            },
        ]
        :
        [
            {
                text: '検索ページ',
                icon: <SearchIcon />,
                onClick: handleClickSearch
            },
            {
                text: '新規登録',
                icon: <HowToRegIcon/>,
                onClick: handleClickRegister
            },
            {
                text: 'ログイン',
                icon: <LoginIcon/>,
                onClick: handleClickLogin
            },
        ]
    );



    return(
        <HamburgerDrawerContext.Provider value={{
            drawerItems,
            setDrawerItems,
        }} >
            { children}
        </HamburgerDrawerContext.Provider>
        
    )
})