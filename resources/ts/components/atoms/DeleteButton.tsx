import React,{ FC, memo } from "react";
import { Button } from "@mui/material";
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';

type Props = {
    children: React.ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    onClick: () => void;
}

export const DeleteButton:FC<Props> = memo( (props) => {

    const { children, disabled, fullWidth, onClick } = props;

    return(
        <Button 
            sx={{pl:1, py: {md:1,lg:2}}}
            variant="contained" 
            disabled={disabled}
            onClick={onClick}
            fullWidth={fullWidth}
            color='error'
        >
            <FolderDeleteIcon sx={{mr: {xs:1, sm:2,  md:3, lg:4}}}/>
            {children}
        </Button>
    )
})