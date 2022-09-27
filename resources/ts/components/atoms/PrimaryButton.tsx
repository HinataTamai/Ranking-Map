import { Button } from "@mui/material";
import { FC, memo } from "react";

type Props = {
    children: React.ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    variant?: "text" | "contained" | "outlined";
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" ;
    onClick: () => void;
}

export const PrimaryButton:FC<Props> = memo( (props) => {

    const { children, disabled, fullWidth, variant = 'contained', color = "primary", onClick } = props;

    return(
        <Button 
            variant={variant} 
            disabled={disabled}
            onClick={onClick}
            fullWidth={fullWidth}
            color={color}
            sx={{maxWidth: 600, my: 'auto', }}
        >
            {children}
        </Button>
    )
})