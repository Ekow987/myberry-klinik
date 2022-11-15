import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Login from '../Login/Login';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Issues = Loadable(lazy(() => import('views/pages/Issues/Issues')));
const Report = Loadable(lazy(() => import('views/pages/Issues/report')));
// const ReportPage = Loadable(lazy(() => import('views/pages/Issues/reportPage')));


// // const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = [
    {
        path: '/app',
        element: <MainLayout />,
        children: [
            {
                path: '/dashboard/default',
                element: <Issues />
            },
            {
                path: '/report',
                element: <Report />
            },
            // {
            //     path: '/reportpage',
            //     element: <ReportPage/>
            // },
            
            
        ]
    },
    {
        path: '/',
        exact: true,
        element: <Login />
    }
];

export default MainRoutes;