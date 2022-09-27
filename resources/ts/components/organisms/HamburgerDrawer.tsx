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


export const HamburgerDrawer:FC = memo( () => {

    const [ isOpen, setIsOpen] = useState(false);
    const { drawerItems } = useContext(HamburgerDrawerContext);

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
