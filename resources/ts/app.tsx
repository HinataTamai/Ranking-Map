import { BrowserRouter } from 'react-router-dom';
import './App.css';
import  Router  from './Router/Router';
import { ThemeProvider } from '@mui/material';
import  theme  from './Theme';
// import { SearchCriteriaProvider } from './providers/SearchCriteriaProvider';
// import { DataTableProvider } from './providers/DataTableProvider';

function App() {
    return (
        <ThemeProvider theme={theme}>
        <BrowserRouter>
        {/* <SearchCriteriaProvider>
            <DataTableProvider> */}
            <Router />
            {/* </DataTableProvider>
        </SearchCriteriaProvider> */}
        </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
