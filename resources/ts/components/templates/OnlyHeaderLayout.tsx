import React, { FC, memo } from "react";
import { styled } from "@mui/system";
import { Header } from "../organisms/Header";

const pages = ['Products', 'Pricing', 'Blog'];


type Props = {
    children:React.ReactNode;
};

const StyledFooter = styled('footer')(({ theme }) => ({
    padding:10,
    textAlign:'center',
    backgroundColor:theme.palette.primary.main
}));

export const OnlyHeaderLayout:FC<Props> = memo( (props) => {

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
        <Header />
        {children}
        </>
    )
});