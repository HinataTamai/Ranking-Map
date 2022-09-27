import { useContext } from "react";
import { DataTableContext } from "../providers/DataTableProvider";

export const useAlert = () => {

    const {
        setAlertStatus
    } = useContext(DataTableContext);

    

    const changeAlertStatus = (
        open: boolean = true,
        message: string,
        severity: 'error' | 'success' | 'info' | 'warning',
        vertical: 'top' | 'bottom',
        horizontal: 'left' | 'right' | 'center'
        ) => {
        setAlertStatus((prevState) => ({
            ...prevState,
            open: open,
            message: message,
            severity: severity,
            vertical: vertical,
            horizontal: horizontal
        }));
    }

    

    return { changeAlertStatus }

}