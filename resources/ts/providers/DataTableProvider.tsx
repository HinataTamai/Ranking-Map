import { createContext, FC, memo, useState } from "react";
import resultsType from "../types/resultsType";


export const DataTableContext = createContext({} as {
    isLoading: boolean;
    setIsLoading:React.Dispatch<React.SetStateAction<boolean>>;
    displayItems: string[];
    setDisplayItems:React.Dispatch<React.SetStateAction<Array<string>>>;
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
    const [displayItems, setDisplayItems] = useState<string[]>(['評価平均','評価総数']);
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
            displayItems,
            setDisplayItems,
            alertStatus,
            setAlertStatus
        }} >
            { children}
        </DataTableContext.Provider>
        
    )
})