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
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res => {
                if(res.data.status === 200){
                    //成功時の処理
                    localStorage.setItem('user_id', res.data.id);
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    navigate('/')
                    location.reload();
                    changeAlertStatus(
                        true,
                        res.data.message,
                        'success',
                        'bottom',
                        'center'
                    );
                } else {
                    //エラー時の処理
                    setRegister( (prevState) => ({
                        ...prevState, 
                        error_list: res.data.validation_errors
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
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('user_id', res.data.id);
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
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
                    console.log('miss');
                    changeAlertStatus(
                        true,
                        res.data.message,
                        'error',
                        'bottom',
                        'center'
                    );
                } else {
                    setLogin({...loginInput, error_list: res.data.validation_errors});
                }
            });
        });
    }

    const logoutSubmit = () => {

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('user_id');
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                navigate('/');
                location.reload();
                changeAlertStatus(
                    true,
                    res.data.message,
                    'info',
                    'bottom',
                    'center'
                );
            } else {
                navigate('/');
                changeAlertStatus(
                    true,
                    'ログアウトに失敗しました。',
                    'error',
                    'bottom',
                    'center'
                );
            } 
        });
    }


    const socialLogin = (provider: string, token: string) => {
        axios.get(`/api/login/${provider}/callback${token}`).then((res) => {
            if(res.data.status === 200){
                localStorage.setItem('user_id', res.data.id);
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.username);
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
        
        isLogin = localStorage.getItem('auth_token') ? true : false;
        
        return isLogin;
    }

    return { registerSubmit, loginSubmit, logoutSubmit, socialLogin, confirmIsLogin }

}