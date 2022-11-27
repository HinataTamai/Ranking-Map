import React, { useState, FC, memo, useEffect } from "react"
import { HeaderAndFooterLayout } from "../templates/HeaderAndFooterLayout";
import { useAuth } from "../../hooks/api/useAuth";
import { Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import GoogleIcon from './../../../images/btn_google_signin_dark_normal_web@2x.png';
import LineIcon from './../../../images/LINE_Login_Button.svg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AlertMessage } from "../atoms/AlertMessage";
import axios from "axios";

export type loginInputType = {
    remember: boolean;
    email: string;
    password: string;
    showPassword: boolean;
    error_list: {
        email: string | undefined, 
        password: string | undefined
    };
}



const Login:FC  =  memo(() => {

    const { loginSubmit } = useAuth();


    const [loginInput, setLogin] = useState<loginInputType>({
        remember: false,
        email: '',
        password: '',
        showPassword: false,
        error_list: {
            email: '',
            password: ''
        },
    });

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLogin( prevState => ({
            ...prevState, 
            [e.target.name]: e.target.value
        }));
    }
    const handleClickShowPassword = () => {
        setLogin(prevState => ({
            ...prevState,
            showPassword: !prevState.showPassword,
        }));
    };
    const handleClickRemember = () => {
        setLogin(prevState => ({
            ...prevState,
            remember: !prevState.remember,
        }));
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>,) => {
        loginSubmit(e, loginInput, setLogin);
    }

    const onClickButton = (e: React.MouseEvent<HTMLElement>) => {
        const provider = e.currentTarget.id;
        axios.get(`/api/login/${provider}`).then((res) => {
            window.location.href = res.data.redirect_url;
        });
    }

    const forgotPassword = () => {
        axios.post('api/password/request',{email:'tamahina30@gmail.com'}).then(res => {
            console.log('status: OK');
            console.log(res);
        }).catch(e => {
            console.log('status: ERROR');
            console.log(e);
        })
    }



    return(
        <HeaderAndFooterLayout>
            <Stack
                justifyContent='center'
                sx={{
                    width: {xs: '85%', sm: '65%', md: '50%'},
                    maxWidth: 600,
                    height:'fit-content', 
                    mx: 'auto', 
                    my: '5vh'
                }}
            >
                <form onSubmit={onSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            error={Boolean(loginInput.error_list.email)}
                            label='メールアドレス'
                            type='email'
                            name="email"
                            value={loginInput.email}
                            onChange={handleInput}
                            helperText={loginInput.error_list.email}
                            />
                        <FormControl variant="outlined" error={Boolean(loginInput.error_list.password)}>
                            <InputLabel>パスワード</InputLabel>
                            <OutlinedInput
                                error={Boolean(loginInput.error_list.password)}
                                name="password"
                                type={loginInput.showPassword ? 'text' : 'password'}
                                value={loginInput.password}
                                onChange={handleInput}
                                label='パスワード'
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    >
                                    {loginInput.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                            <FormHelperText>{loginInput.error_list.password}</FormHelperText>
                        </FormControl>
                        <Button onClick={forgotPassword}>forgot password</Button>
                        <FormControlLabel 
                            control={<Checkbox name='remember' checked={loginInput.remember} onChange={handleClickRemember} />} 
                            label="ログイン状態を維持する" 
                        />
                        <Button variant="contained" type="submit">login</Button>
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

export default Login;