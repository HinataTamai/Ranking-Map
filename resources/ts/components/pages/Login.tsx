import React, { useState, FC, memo } from "react"
import { HeaderAndFooterLayout } from "../templates/HeaderAndFooterLayout";
import { useAuth } from "../../hooks/api/useAuth";
import { Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AlertMessage } from "../atoms/AlertMessage";
import axios from "axios";

export type loginInputType = {
    email: string;
    password: string;
    showPassword: boolean;
    error_list: {email:string, password:string};
}



const Login:FC  =  memo(() => {

    const { loginSubmit } = useAuth();

    const [loginInput, setLogin] = useState<loginInputType>({
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

    const onSubmit = (e: React.FormEvent<HTMLFormElement>,) => {
        loginSubmit(e, loginInput, setLogin);
    }

    const onClickButton = (e: React.MouseEvent<HTMLElement>) => {
        const provider = e.currentTarget.id;
        axios.get(`/api/login/${provider}`).then((res) => {
            window.location.href = res.data.redirect_url;
        });
    }

    return(
        <HeaderAndFooterLayout>
            <Stack
                justifyContent='center'
                sx={{width:'85%', height:'70%', mx: 'auto'}}
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
                        <FormControl variant="outlined">
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
                        </FormControl>
                        <Button variant="contained" type="submit">login</Button>
                    </Stack>
                </form>
                <Stack spacing={3} sx={{mt:3}}>
                    <Divider />
                    <Box onClick={onClickButton} id='google' >
                        <img src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png" />
                    </Box>
                </Stack>
            </Stack>
            <AlertMessage/>
        </HeaderAndFooterLayout>
    );
});

export default Login;