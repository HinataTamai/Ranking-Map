import React, { useState, FC, memo } from "react"
import { HeaderAndFooterLayout } from "../templates/HeaderAndFooterLayout";
import { useAuth } from "../../hooks/api/useAuth";
import { Stack } from "@mui/system";
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AlertMessage } from "../atoms/AlertMessage";


export type registerInputType = {
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

    const onSubmit = (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        registerSubmit(e, registerInput, setRegister);
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
                <Button variant="contained" type="submit">登録</Button>
                </Stack>
            </form>
            </Stack>
            <AlertMessage/>
        </HeaderAndFooterLayout>
    );
});

export default Register;