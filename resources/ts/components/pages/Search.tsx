import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, memo, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/api/useAuth";
import { useMap } from "../../hooks/api/useMap";
import { useSearchCriteria } from "../../hooks/api/useSearchCriteria";
import { SearchCriteriaContext } from "../../providers/SearchCriteriaProvider";
import { AlertMessage } from "../atoms/AlertMessage";
import { PrimaryButton } from "../atoms/PrimaryButton";

import { TextInput } from '../atoms/TextInput';
import { TextSelect } from "../atoms/TextSelect";
import { SwitchWithLabel } from "../molecules/SwitchWithLabel";
import { PriorityRadios } from "../organisms/PriorityRadios";
import { HeaderAndFooterLayout } from "../templates/HeaderAndFooterLayout";

export type Criteria = {
    status : number,
    location : string,
    keyword : string,
    radius : string,
    rateCriteria : string,
    ratingsTotalCriteria : string,
    distanceCriteria : string,
    onlyIsOpen : string,
}

export const RadiusValues = [
    {
        value: 500,
        label: '500m'
    },
    {
        value: 1000,
        label: '1km'
    },
    {
        value: 2000,
        label: '2km'
    },
    {
        value: 5000,
        label: '5km'
    },
    {
        value: 10000,
        label: '10km'
    },
    {
        value: 25000,
        label: '25km'
    },
    {
        value: 50000,
        label: '50km'
    },
]


const Search:FC  =  memo(() => {

    const navigate = useNavigate();
    const { indexSearchCriteria } = useSearchCriteria();
    const { confirmIsLogin } = useAuth();
    const isLogin = confirmIsLogin();

    const {
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
            setResults,
            extractOnlyIsOpen,
            setExtractOnlyIsOpen,
        } = useContext(SearchCriteriaContext);
    
    const { getEstablishmentsData } = useMap();


    


    const handleChangeRate = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRateCriteria(e.target.value);
    }
    const handleChangeRatingsTotal = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRatingsTotalCriteria(e.target.value);
    }
    const handleChangeDistance = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDistanceCriteria(e.target.value);
    }
    const handleChangePlace = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e?.target.value);
    }
    const handleChangeKeyword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e?.target.value);
    }
    const handleChangeRadius = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadiusCriteria(Number(e?.target.value));
    }
    const handleChangeIsOpen = (e:React.ChangeEvent<HTMLInputElement>) => {
        setExtractOnlyIsOpen(e?.target.checked);
    }
    const onClickSearch = () => {
        navigate('/results');
        getEstablishmentsData();
    }
    

    useEffect(() => {
        if (location != '' && keyword != '' && rateCriteria != '' && ratingsTotalCriteria != '' && distanceCriteria != '') {
            setIsHavingValue(true);
        } else {
            setIsHavingValue(false)
        }
        console.log(
            location,
            keyword,
            radiusCriteria,
            rateCriteria,
            ratingsTotalCriteria,
            distanceCriteria,
            isHavingValue,
            extractOnlyIsOpen,
        )
    },[location,keyword,radiusCriteria,rateCriteria,ratingsTotalCriteria,distanceCriteria])
    
    useEffect(() => {
        if(isLogin) {
            console.log('isLogin');
            indexSearchCriteria().then(res => {
                if(res.status === 200){
                    setLocation(res.location);
                    setKeyword(res.keyword);
                    setRadiusCriteria(Number(res.radius));
                    setRateCriteria(res.rateCriteria);
                    setRatingsTotalCriteria(res.ratingsTotalCriteria);
                    setDistanceCriteria(res.distanceCriteria);
                    setExtractOnlyIsOpen(Boolean(res.onlyIsOpen));
                    console.log('status:200');
                    console.log(res);
                } else {
                    setResults([]);
                    setLocation('現在地');
                    setKeyword('');
                    setRadiusCriteria(5000);
                    setRateCriteria('unspecified');
                    setRatingsTotalCriteria('unspecified');
                    setDistanceCriteria('unspecified');
                    setExtractOnlyIsOpen(false);
                    console.log('status:201');
                }
            });
        } else {
            console.log('isNotLogin');
            setResults([]);
            setLocation('現在地');
            setKeyword('');
            setRadiusCriteria(5000);
            setRateCriteria('unspecified');
            setRatingsTotalCriteria('unspecified');
            setDistanceCriteria('unspecified');
            setExtractOnlyIsOpen(false);
        }
    },[]);
    
    return(
        <HeaderAndFooterLayout>
        <Stack 
            spacing={4} 
            sx={{
                my: '10vw',
                mx: 'auto',
                width:{
                    xs:'85%',
                    sm:'78%',
                    md:'70%',
                    lg:'63%'
                }
            }}
        >
            <TextInput
                id='searchLocation' 
                label="検索地点" 
                type="search" 
                variant="standard"
                required
                value={location}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChangePlace(e)}
            />
            <TextInput
                id='keyword' 
                label="キーワード" 
                type="search" 
                variant="standard"
                value={keyword}
                required
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChangeKeyword(e)}
            />
            <TextSelect
                id='searchRadius' 
                label="検索範囲"  
                variant="standard" 
                required
                selectValues={RadiusValues} 
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                handleChangeRadius(e)
                }} 
                selectValue={radiusCriteria}
            />
            <PriorityRadios 
                handleRate={handleChangeRate}
                rateValue={rateCriteria}
                handleRatingsTotal={handleChangeRatingsTotal}
                ratingsTotalValue={ratingsTotalCriteria}
                handleDistance={handleChangeDistance}
                distanceValue={distanceCriteria}
            />
            <SwitchWithLabel
            label='営業時間中の施設のみ表示'
            checked={extractOnlyIsOpen}
            handleChange={handleChangeIsOpen}
            ></SwitchWithLabel>
            <Stack alignItems='center'>
            <PrimaryButton
                onClick={onClickSearch} 
                disabled={!isHavingValue}
                fullWidth={true}
            >
                検索する
            </PrimaryButton>
            {!isHavingValue && (
            <Typography
                variant="body1" 
                sx={{
                    fontSize:'12px',
                    pt:0.5,
                    color: 'red'
                }}
            >
                「*」の付く項目は選択必須項目です。
            </Typography>
            )}
            </Stack>
        </Stack>
        <AlertMessage/>
        </HeaderAndFooterLayout>
    )
})

export default Search;