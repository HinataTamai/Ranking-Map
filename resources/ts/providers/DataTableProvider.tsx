import { createContext, FC, memo, useState } from "react";



export const DataTableContext = createContext({} as {
    isLoading: boolean;
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>;
    display: string[];
    setDisplay:React.Dispatch<React.SetStateAction<Array<string>>>;
    alertStatus: {
        open: boolean,
        severity: 'success' | 'error' | 'warning' | 'info',
        message: string,
        vertical: 'top' | 'bottom',
        horizontal: 'left' | 'right' | 'center'
    };
    setAlertStatus:React.Dispatch<React.SetStateAction<{
        open: boolean,
        severity: 'success' | 'error' | 'warning' | 'info',
        message: string,
        vertical: 'top' | 'bottom',
        horizontal: 'left' | 'right' | 'center'
    }>>;
});

type Props = {
    children: React.ReactNode;
}

export const DataTableProvider:FC<Props> = memo( (props) => {

    const { children } = props;
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [display, setDisplay] = useState<string[]>(['評価平均','評価総数']);
    const [alertStatus, setAlertStatus] = useState<{
        open: boolean,
        severity: 'success' | 'error' | 'warning' | 'info',
        message: string,
        vertical: 'top' | 'bottom',
        horizontal: 'left' | 'right' | 'center'
    }>({
        open: false,
        severity: 'error',
        message: 'エラーです。',
        vertical: 'top',
        horizontal: 'center'
    });


    return(
        <DataTableContext.Provider value={{
            isLoading,
            setIsLoading,
            display,
            setDisplay,
            alertStatus,
            setAlertStatus
        }} >
            { children}
        </DataTableContext.Provider>
        
    )
})