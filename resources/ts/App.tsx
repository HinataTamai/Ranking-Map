import { BrowserRouter } from 'react-router-dom';
import  Router  from './Router/Router';
import { ThemeProvider } from '@mui/material';
import  theme  from './Theme';
import { SearchCriteriaProvider } from './providers/SearchCriteriaProvider';
import { DataTableProvider } from './providers/DataTableProvider';
import { HamburgerDrawerProvider } from './providers/HamburgerDrawerProvider';
import axios from 'axios';

//認証のためのaxiosの初期設定
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    if(config.headers) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';
    }
    return config;
});

const App = () => {
    return(
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <SearchCriteriaProvider>
            <DataTableProvider>
            <HamburgerDrawerProvider>
                <Router />
            </HamburgerDrawerProvider>
            </DataTableProvider>
            </SearchCriteriaProvider>
        </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
