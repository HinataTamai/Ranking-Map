import React, { FC, memo } from "react";
import { styled } from "@mui/system";
import { Header } from "../organisms/Header";


type Props = {
    children:React.ReactNode;
};

const StyledFooter = styled('footer')(({ theme }) => ({
    position: 'sticky',
    top:'100vh',
    padding:10,
    textAlign:'center',
    backgroundColor:theme.palette.primary.main
}));

export const HeaderAndFooterLayout:FC<Props> = memo( (props) => {

    const { children } = props;

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    
    return(
        <>
        <Header/>
        {children}
        <StyledFooter>
        <small>© hinatatamai 2022</small>
        </StyledFooter>
        </>
    )
});