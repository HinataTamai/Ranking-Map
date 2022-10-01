import { BrowserRouter } from 'react-router-dom';
import  Router  from './Router/Router';
import { ThemeProvider } from '@mui/material';
import  theme  from './Theme';
import { SearchCriteriaProvider } from './providers/SearchCriteriaProvider';
import { DataTableProvider } from './providers/DataTableProvider';
import { AuthProvider } from './providers/AuthProvider';
import { HamburgerDrawerProvider } from './providers/HamburgerDrawerProvider';
import axios from 'axios';

//認証のためのaxiosの初期設定
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;


const App = () => {
    return(
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <AuthProvider>
            <SearchCriteriaProvider>
            <DataTableProvider>
            <HamburgerDrawerProvider>
                <Router />
            </HamburgerDrawerProvider>
            </DataTableProvider>
            </SearchCriteriaProvider>
            </AuthProvider>
        </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
