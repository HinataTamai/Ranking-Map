import { Box, Stack } from "@mui/system";
import React, { FC, memo, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import resultsType from "../../types/resultsType";
import { AlertMessage } from "../atoms/AlertMessage";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { FavoriteTable } from "../organisms/FavoriteTable";
import { HeaderAndFooterLayout } from "../templates/HeaderAndFooterLayout";
import { TextInput } from '../atoms/TextInput';
import { TextSelect } from '../atoms/TextSelect';
import { PriorityRadios } from '../organisms/PriorityRadios';
import { SwitchWithLabel } from '../molecules/SwitchWithLabel';
import { Button, Divider, Typography } from "@mui/material";
import theme from "../../Theme";
import { useSearchCriteria } from '../../hooks/api/useSearchCriteria'
import { useAlert } from "../../hooks/useAlert";
import { RadiusValues } from "./Search";


const CriteriaSetting:FC  =  memo(() => {

    const navigate = useNavigate();
    const { indexSearchCriteria, storeSearchCriteria, deleteSearchCriteria } = useSearchCriteria();
    const { changeAlertStatus } = useAlert();

    const [ location ,setLocation ] = useState('現在地');
    const [ hasCriteria, setHasCriteria ] = useState(false); 
    const [ disabledStore, setDisabledStore ] = useState(true);
    const [ keyword ,setKeyword ] = useState('');
    const [ rateCriteria ,setRate ] = useState('unspecified');
    const [ ratingsTotalCriteria ,setRatingsTotal ] = useState('unspecified');
    const [ distanceCriteria ,setDistance ] = useState('unspecified');
    const [ radius, setRadius ] = useState(5000);
    const [ onlyIsOpen, setOnlyIsOpen ] = useState(false);

    const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    }
    const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }
    const handleChangeRate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRate(e.target.value);
    }
    const handleChangeRatingsTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRatingsTotal(e.target.value);
    }
    const handleChangeDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDistance(e.target.value);
    }
    const handleChangeRadius = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadius(Number(e?.target.value));
    }
    const handleChangeIsOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOnlyIsOpen(e.target.checked);
    }

    const handleClickStore = () => {
        storeSearchCriteria(
            location,
            keyword,
            String(radius),
            rateCriteria,
            ratingsTotalCriteria,
            distanceCriteria,
            onlyIsOpen
        );
    }
    const handleClickDelete = () => {
        deleteSearchCriteria();
    }

    useEffect(() => {
        if(location != '' && keyword != ''){
            setDisabledStore(false);
        }
    },[location, keyword]);

    useEffect(() => {
        console.log('isLogin');
        indexSearchCriteria().then(res => {
            if(res.status === 200){
                setHasCriteria(true);
                setLocation(res.location);
                setKeyword(res.keyword);
                setRadius(Number(res.radius));
                setRate(res.rateCriteria);
                setRatingsTotal(res.ratingsTotalCriteria);
                setDistance(res.distanceCriteria);
                setOnlyIsOpen(Boolean(res.onlyIsOpen));
                console.log('status:200');
                console.log(res);
            } else {
                setLocation('現在地');
                setKeyword('');
                setRadius(5000);
                setRate('unspecified');
                setRatingsTotal('unspecified');
                setDistance('unspecified');
                setOnlyIsOpen(false);
                console.log('status:204');
            }
        });
    },[]);

    return(
        <HeaderAndFooterLayout>
            <Stack
            spacing={4} 
            sx={{
                my: '5vh',
                mx: 'auto',
                padding: {
                    xs:'6%'
                },
                width:{
                    xs:'85%',
                    sm:'78%',
                    md:'70%',
                    lg:'63%'
                },
                maxWidth: 700
            }}
            >
                <Typography align="center" variant="h5" fontWeight='bold'>検索条件設定</Typography>
                <Divider color={theme.palette.primary.main} sx={{borderBottomWidth: 3}}/>
                <Stack alignItems='center' >
                <PrimaryButton
                    onClick={handleClickDelete} 
                    fullWidth={true}
                    color='info'
                    disabled={!hasCriteria}
                >
                    検索条件を初期化
                </PrimaryButton>
                </Stack>
                <TextInput
                    id='searchLocation' 
                    label="検索地点" 
                    type="search" 
                    variant="standard"
                    value={location}
                    onChange={handleChangeLocation}
                />
                <TextInput
                    id='keyword' 
                    label="キーワード" 
                    type="search" 
                    variant="standard"
                    value={keyword}
                    required
                    onChange={handleChangeKeyword}
                />
                <TextSelect
                    id='searchRadius' 
                    label="検索範囲"  
                    variant="standard" 
                    required
                    selectValues={RadiusValues} 
                    onChange={handleChangeRadius} 
                    selectValue={radius}
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
                label='現在営業中の施設のみ表示'
                checked={onlyIsOpen}
                handleChange={handleChangeIsOpen}
                />
                <Stack 
                    alignItems='center'
                >
                <PrimaryButton
                    onClick={handleClickStore} 
                    fullWidth={true}
                    variant='contained'
                    color='success'
                    disabled={disabledStore}
                >
                    変更を保存
                </PrimaryButton>
                {disabledStore && (
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
        <AlertMessage />
        </HeaderAndFooterLayout>
    );
})

export default CriteriaSetting;