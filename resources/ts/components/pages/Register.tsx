import React, { useState, FC, memo, useEffect } from "react"
import { HeaderAndFooterLayout } from "../templates/HeaderAndFooterLayout";
import { useAuth } from "../../hooks/api/useAuth";
import { Box, Stack } from "@mui/system";
import { Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from './../../../images/btn_google_signin_dark_normal_web@2x.png';
import { AlertMessage } from "../atoms/AlertMessage";
import LineIcon from './../../../images/LINE_Login_Button.svg';
import axios from "axios";


export type registerInputType = {
    remember: boolean;
    name: string;
    email: string;
    password: string;
    showPassword: boolean;
    error_list: {
        name: string | undefined,
        email: string | undefined, 
        password: string | undefined
    };
}

const Register:FC  =  memo(() => {

    const { registerSubmit } = useAuth();

    const [registerInput, setRegister] = useState<registerInputType>({
        remember: false,
        name: '',
        email: '',
        password: '',
        showPassword: false,
        error_list: {
            name: '',
            email: '',
            password: '',
        },
    });

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRegister(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value 
        }));
    }
    const handleClickShowPassword = () => {
        setRegister( prevState => ({
            ...prevState,
            showPassword: !prevState.showPassword,
        }));
    };
    const handleClickRemember = () => {
        setRegister(prevState => ({
            ...prevState,
            remember: !prevState.remember,
        }));
    }

    const onClickButton = (e: React.MouseEvent<HTMLElement>) => {
        const provider = e.currentTarget.id;
        axios.get(`/api/login/${provider}`).then((res) => {
            window.location.href = res.data.redirect_url;
        });
    }

    const onSubmit = (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        registerSubmit(e, registerInput, setRegister);
    }


    return(
        <HeaderAndFooterLayout>
            <Stack
                justifyContent='center'
                sx={{
                    width: {xs: '85%', sm: '65%', md: '50%'},
                    maxWidth: 600,
                    height:'70%', 
                    mx: 'auto', 
                    my: '10vh'
                }}
            >
            <form onSubmit={onSubmit}>
                <Stack spacing={2}>
                <TextField
                    error={Boolean(registerInput.error_list.name)}
                    label='ユーザ名'
                    name="name"
                    value={registerInput.name}
                    onChange={handleInput}
                    helperText={registerInput.error_list.name}
                    />
                <TextField
                    error={Boolean(registerInput.error_list.email)}
                    label='メールアドレス'
                    type='email'
                    name="email"
                    value={registerInput.email}
                    onChange={handleInput}
                    helperText={registerInput.error_list.email}
                    />
                <FormControl variant="outlined" error={Boolean(registerInput.error_list.password)}>
                    <InputLabel>パスワード</InputLabel>
                    <OutlinedInput
                        name="password"
                        type={registerInput.showPassword ? 'text' : 'password'}
                        value={registerInput.password}
                        onChange={handleInput}
                        label='パスワード'
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            >
                            {registerInput.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                    <FormHelperText>{registerInput.error_list.password}</FormHelperText>
                </FormControl>
                <FormControlLabel 
                    control={<Checkbox name='remember' checked={registerInput.remember} onChange={handleClickRemember} />} 
                    label="ログイン状態を維持する" 
                />
                <Button variant="contained" type="submit">登録</Button>
                </Stack>
            </form>
            <Box sx={{mt:3}}>
                    <Box><Divider><Chip label='or'/></Divider></Box>
                    <Box sx={{height: 'fit-content'}}>
                        <Box 
                            id='google'
                            onClick={onClickButton}
                            component='img' 
                            src={ GoogleIcon }  
                            sx={{
                                display: 'block',
                                width: {xs: '75%', sm: '60%', md: '45%'},
                                mt: '2vh',
                                mb: '1.5vh',
                                mx: 'auto', 
                                cursor: 'pointer',
                            }}
                        />
                    </Box>
                    <Box>
                        <Box 
                            onClick={onClickButton}
                            id='line'
                            component='img' 
                            src={ LineIcon }  
                            sx={{
                                display: 'block',
                                width: {xs: '74%', sm: '59%', md: '44%'}, 
                                mx: 'auto', 
                                cursor: 'pointer',
                            }}
                        />
                    </Box>
                </Box>
            </Stack>
            <AlertMessage/>
        </HeaderAndFooterLayout>
    );
});

export default Register;