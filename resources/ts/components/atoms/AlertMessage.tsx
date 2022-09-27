import { FC, forwardRef, memo, useContext, useEffect }from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { DataTableContext } from '../../providers/DataTableProvider';
import { useAlert } from '../../hooks/useAlert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
    ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const AlertMessage:FC = memo( () => {
    
    
    const {alertStatus,setAlertStatus} = useContext(DataTableContext);
    const {
        open,
        message,
        severity,
        vertical,
        horizontal
    } = alertStatus;
    
    const { changeAlertStatus } = useAlert();

    useEffect(() => {
        return(
            changeAlertStatus(
                false,
                '',
                'error',
                'bottom',
                'center'
            )
        );
    },[]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }

        setAlertStatus((alertStatus) => ({
            ...alertStatus,
            open:false
        }));
    };

    return (
        <Snackbar 
            open={open} 
            autoHideDuration={6000} 
            onClose={handleClose}
            anchorOrigin={{vertical,horizontal}}
            >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
            </Alert>
        </Snackbar>
    );
})
