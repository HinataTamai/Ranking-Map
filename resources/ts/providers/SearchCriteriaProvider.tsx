import { createContext, FC, memo, useState } from "react";
import { resultsType } from "../types/SearchResults";


export const SearchCriteriaContext = createContext({} as {
    results: resultsType;
    setResults: React.Dispatch<React.SetStateAction<resultsType>>;
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    keyword: string ;
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    radiusCriteria: number;
    setRadiusCriteria: React.Dispatch<React.SetStateAction<number>>;
    rateCriteria: string ;
    setRateCriteria: React.Dispatch<React.SetStateAction<string >>;
    ratingsTotalCriteria: string ;
    setRatingsTotalCriteria: React.Dispatch<React.SetStateAction<string >>;
    distanceCriteria: string ;
    setDistanceCriteria: React.Dispatch<React.SetStateAction<string >>;
    isHavingValue: boolean;
    setIsHavingValue: React.Dispatch<React.SetStateAction<boolean>>;
    extractOnlyIsOpen: boolean;
    setExtractOnlyIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
});

type Props = {
    children: React.ReactNode;
}

export const SearchCriteriaProvider:FC<Props> = memo( (props) => {

    const { children } = props;
    
    const [results, setResults] = useState<resultsType>([]);
    const [location, setLocation] = useState<string>('現在地');
    const [keyword, setKeyword] = useState<string>('');
    const [radiusCriteria, setRadiusCriteria ] = useState<number>(5000);
    const [rateCriteria, setRateCriteria] = useState<string>('unspecified');
    const [ratingsTotalCriteria, setRatingsTotalCriteria] = useState<string>('unspecified');
    const [distanceCriteria, setDistanceCriteria] = useState<string>('unspecified');
    const [isHavingValue, setIsHavingValue ] = useState<boolean>(false);
    const [extractOnlyIsOpen, setExtractOnlyIsOpen ] = useState<boolean>(false);


    return(
        <SearchCriteriaContext.Provider value={{
            results,
            setResults,
            location,
            setLocation,
            keyword,
            setKeyword,
            radiusCriteria,
            setRadiusCriteria,
            rateCriteria,
            setRateCriteria,
            ratingsTotalCriteria, 
            setRatingsTotalCriteria,
            distanceCriteria, 
            setDistanceCriteria,
            isHavingValue,
            setIsHavingValue,
            extractOnlyIsOpen,
            setExtractOnlyIsOpen
        }} >
            { children}
        </SearchCriteriaContext.Provider>
        
    )
})
