import React from 'react';
import { Navigate, NonIndexRouteObject, useRoutes } from 'react-router-dom';
// import Login from '@src/page/Login';
// import { LayoutIndex /*懒加载*/ } from '@src/layout/index'
// import ErrorBoundary from '@src/page/ErrorBoundary';
import lazyLoad from './utils/lazyLoad';
// import UserAdmin from '@src/page/AuthorityCenter/UserAdmin';
// import MenuManagement from '@src/page/AuthorityCenter/MenuManagement';
// import RoleManagement from '@src/page/AuthorityCenter/RoleManagement';
// import MentionsInputDemo from '@src/page/CoderJunUI/MentionsInput';
// import Tabbar from '@src/page/tabbar';

export interface RouteObject extends  NonIndexRouteObject{
	label?:string,
	children?:RouteObject[]
}

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/tabbar" />
	},
    {
      path: '/tabbar',
      element: lazyLoad(React.lazy(() => import("./../page/tabbar")))
    //   children: [
    //     {
    //       path: '/personal',
    //       label: '我的',
    //       element: <Navigate to="/login" />
    //     },
    //   ],
    },
	{
		path: "/404",
		element: lazyLoad(React.lazy(() => import("./../404")))
	},
	{
		path: "/home",
		element: lazyLoad(React.lazy(() => import("./../page/home"))),
		label:'登录页面'
	},
	{
		path: "*",
		element: <Navigate to="/404" />
	}
];

const Router = () => {
	const routes = useRoutes( rootRouter );
	return routes;
};

export default Router;
