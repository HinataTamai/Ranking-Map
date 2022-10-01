import { FC, memo, useContext, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { HamburgerDrawerContext } from '../../providers/HamburgerDrawerProvider';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../hooks/api/useAuth';


export const HamburgerDrawer:FC = memo( () => {

    const [ isOpen, setIsOpen] = useState(false);
    const  navigate  = useNavigate();
    const { userInfo } = useContext(AuthContext);
    const { logoutSubmit, confirmIsLogin } = useAuth(); 

    const handleClickRegister = () => navigate('/register');
    const handleClickLogin = () => navigate('/login');
    const handleClickLogout = () => logoutSubmit();
    const handleClickFavorite = () => navigate('/favorite');
    const handleClickSetting = () => navigate('/setting');
    const handleClickSearch = () => navigate('/');

    const drawerItems = userInfo.isLogin ?
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
        ];

    //ドロワーを開閉する関数
    const toggleDrawer =
        (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

            setIsOpen(open);
        };

    return (
        <>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={toggleDrawer(true)}
            color="inherit"
            sx={{display: {md: 'none'}}}
        >
            <MenuIcon />
        </IconButton>
        <Drawer
            anchor={'right'}
            open={isOpen}
            onClose={toggleDrawer(false)}
        >
            <Box
            sx={{width: 250}}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            >
                <List>
                    {drawerItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={item.onClick}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
        </>
    );
});
