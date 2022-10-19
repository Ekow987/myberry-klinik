import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Login from '../Login/Login';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Issues = Loadable(lazy(() => import('views/pages/Issues/Issues')));
const Report = Loadable(lazy(() => import('views/pages/Issues/report')));


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
                path: '/',
                element: <Issues />
            },
            {
                path: '/dashboard/default',
                element: <Issues />
            },
            {
                path: '/report',
                element: <Report />
            },
            // // {
            // //     path: '/utils/util-color',
            // //     element: <UtilsColor />
            // // },
            // {
            //     path: '/utils/util-shadow',
            //     element: <UtilsShadow />
            // },
            // {
            //     path: '/icons/tabler-icons',
            //     element: <UtilsTablerIcons />
            // },
            // {
            //     path: '/icons/material-icons',
            //     element: <UtilsMaterialIcons />
            // },
            // {
            //     path: '/sample-page',
            //     element: <SamplePage />
            // }
        ]
    },
    {
        path: '/',
        exact: true,
        element: <Login />
    }
];

export default MainRoutes;

// const ThemeRoutes = [
// 	{
// 		path: "/",
// 		element: <FullLayout />,
// 		children: [
// 			{
// 				path: "/issues",
// 				exact: true,
// 				element: <Issues />
// 			},
// 			{
// 				path: "/devices",
// 				exact: true,
// 				element: <Devices />
// 			},
// 			{
// 				path: "/training",
// 				exact: true,
// 				element: <Trainings />
// 			},

// 			{ path: "/reports", exact: true, element: <Reports /> }
// 		]
// 	},
// 	{
// 		path: "/login",
// 		exact: true,
// 		element: <Login />
// 	}
// ]
