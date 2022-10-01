import { registerInputType } from '../../components/pages/Register';
import { loginInputType } from '../../components/pages/Login';
import { useAlert } from "../useAlert";
import { useNavigate } from "react-router";
import axios from "axios";


export const useAuth = () => {

    const { changeAlertStatus } = useAlert();
    const navigate = useNavigate();

    const registerSubmit = (
        e: React.FormEvent<HTMLFormElement>,
        registerInput: registerInputType,
        setRegister: React.Dispatch<React.SetStateAction<registerInputType>>
        ) => {
        e.preventDefault();

        const data = {
            remember: registerInput.remember,
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res => {
                if(res.data.status === 200){
                    //成功時の処理
                    localStorage.setItem('user_id', res.data.id);
                    navigate('/')
                    location.reload();
                    changeAlertStatus(
                        true,
                        res.data.message,
                        'success',
                        'bottom',
                        'center'
                    );
                }
            }).catch(e => {
                const errors = e.response.data.errors;
                if( errors.name || errors.email  || errors.password) {
                    setRegister( (prevState) => ({
                        ...prevState, 
                        error_list: e.response.data.errors,
                    }));
                }
            });
        });
    }


    const loginSubmit = (
        e: React.FormEvent<HTMLFormElement>,
        loginInput: loginInputType,
        setLogin: React.Dispatch<React.SetStateAction<loginInputType>>
        ) => {
        e.preventDefault();

        const data = {
            remember: loginInput.remember,
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                console.log(res);
                if(res.data.status === 200){
                    localStorage.setItem('user_id', res.data.id);
                    navigate('/');
                    location.reload();
                    changeAlertStatus(
                        true,
                        res.data.message,
                        'success',
                        'bottom',
                        'center'
                    );
                } else if (res.data.status === 401){
                    //認証に失敗した際の処理
                    changeAlertStatus(
                        true,
                        res.data.message,
                        'error',
                        'bottom',
                        'center'
                    );
                }
            }).catch(e => {
                const errors = e.response.data.errors;
                if(errors.email  || errors.password){
                    setLogin(prev => ({
                        ...prev,
                        error_list: errors,
                    }))
                }
                changeAlertStatus(
                    true,
                    'ログインに失敗しました。',
                    'error',
                    'bottom',
                    'center'
                )
            })
        });
    }

    const logoutSubmit = () => {

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('user_id');
                navigate('/');
                location.reload();
                changeAlertStatus(
                    true,
                    res.data.message,
                    'info',
                    'bottom',
                    'center'
                );
            }
        }).catch(e => {
            navigate('/');
            changeAlertStatus(
                true,
                'ログアウトに失敗しました。',
                'error',
                'bottom',
                'center'
            );
        });
    }


    const socialLogin = (provider: string, token: string) => {
        axios.get(`/api/login/${provider}/callback${token}`).then((res) => {
            if(res.data.status === 200){
                localStorage.setItem('user_id', res.data.id);
                navigate('/');
                location.reload();
                changeAlertStatus(
                    true,
                    res.data.message,
                    'success',
                    'bottom',
                    'center'
                );
            }else {
                console.log('hasMatter');
            }
        });
    }

    const confirmIsLogin = () => {
        let isLogin: boolean;
        
        isLogin = localStorage.getItem('user_id') ? true : false;
        
        return isLogin;
    }

    return { registerSubmit, loginSubmit, logoutSubmit, socialLogin, confirmIsLogin }

}