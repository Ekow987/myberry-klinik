import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

// routing
// import Routes from 'routes';
import React, { useMemo, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes';
import { baseUrl, getUser } from './services/Auth';
import { getStatistics } from './services/Helpers';
import { AppContext } from './components/Context/AppContext';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';


// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const [user, setUser] = useState(getUser());
    const routing = useRoutes(MainRoutes);

    const provider = useMemo(
        () => ({
            user,
            setUser,
            baseUrl,
            getStatistics
        }),
        [user, setUser]
    );
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <AppContext.Provider value={provider}>{routing}</AppContext.Provider>
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;