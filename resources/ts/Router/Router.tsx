import { FC, memo, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Page404 from "../components/pages/Page404";
import Search from "../components/pages/Search";
import Register from "../components/pages/Register";
import Login from "../components/pages/Login";
import LoginCallback from "../components/pages/LoginCallback";
import SearchResults from "../components/pages/SearchResults";
import Favorite from "../components/pages/Favorite";
import CriteriaSetting from "../components/pages/CriteriaSetting";
import SnsExplain from "../components/pages/SnsExplain";
import { useAuth } from "../hooks/api/useAuth";
import { AuthContext } from "../providers/AuthProvider";

const Router:FC = memo(() => {

    const { userInfo } = useContext(AuthContext);


    //トークンの有無でルーティングを変更
    if( !userInfo.isLogin ) { //未ログイン時
        return(
            <Routes>
                <Route  path='/' element={ <Search /> } />
                <Route  path='/results' element={<SearchResults />} />
                <Route  path='/register' element={<Register />} />
                <Route  path='/login' element={<Login />} />
                <Route  path='/login/explain' element={<SnsExplain />} />
                <Route  path='/login/:provider/callback' element={<LoginCallback />} />
                <Route  path='*' element={<Page404 />} />
            </Routes>
        );
    } else { //ログイン時
        return(
            <Routes>
                <Route  path='/' element={ <Search /> } />
                <Route  path='/results' element={<SearchResults />} />
                <Route  path='/favorite' element={<Favorite />} />
                <Route  path='/setting' element={<CriteriaSetting />} />
                <Route  path='*' element={<Page404 />} />
            </Routes>
        );
    }
});

export default Router;