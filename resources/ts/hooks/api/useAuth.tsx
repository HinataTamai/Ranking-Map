import { registerInputType } from '../../components/pages/Register';
import { loginInputType } from '../../components/pages/Login';
import { useAlert } from "../useAlert";
import { useNavigate } from "react-router";
import axios from "axios";
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';


export const useAuth = () => {

    const { changeAlertStatus } = useAlert();
    const navigate = useNavigate();
    const { setUserInfo } = useContext(AuthContext);
    

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
                    setUserInfo(prev => ({...prev,isLogin: true}));
                    confirmIsLogin();
                    navigate('/')
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
                    setUserInfo(prev => ({...prev,isLogin: true}));
                    confirmIsLogin();
                    navigate('/');
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
                setUserInfo({isLogin: false, id: 0});
                navigate('/');
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
                setUserInfo(prev => ({...prev,isLogin: true}));
                confirmIsLogin();
                navigate('/');
                changeAlertStatus(
                    true,
                    res.data.message,
                    'success',
                    'bottom',
                    'center'
                );
            }
        });
    }


    //セッション状況を確認し、React側にログイン状況を伝える
    //時間経過によるセッション切れをReactが感知するための関数。
    const confirmIsLogin = () => {
        console.log('confirmIsLogin');
        axios.get('/api/confirm').then(res => {
            console.log(res)
            if(res.data.status === 200) {
                setUserInfo({
                    isLogin: true,
                    id: res.data.user_id
                });
            }
        }).catch(e => {
            console.log(e);
            changeAlertStatus(
                true,
                'ユーザ情報の取得に失敗しました。',
                'error',
                'bottom',
                'center'
            );
        }); 
    }

    return { registerSubmit, loginSubmit, logoutSubmit, socialLogin, confirmIsLogin }

}