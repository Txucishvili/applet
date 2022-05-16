import { Layout } from "@/ui/Layout";
import ListsView from "@/routes/pages/ListsView";
import MainPage from "@/routes/pages/MainPage";
import BookmarkViews from "@/routes/pages/BookmarksView";
import { RouteObject, useNavigate } from "react-router-dom";
import React, { createElement, useEffect } from "react";
import Interests from "./pages/Interests";

const NotFundPage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    // navigate("/", { replace: true })
  }, []);

  return <div>
    Not found
  </div>
}

const CategoriesViewLazy = React.lazy(() => import('./pages/CategoriesView'));
const SettingViewLazy = React.lazy(() => import('./pages/SettingView'));

const CategoriesView = ({}) => {
  return <React.Suspense fallback={'loading........'}>
    <CategoriesViewLazy />
  </React.Suspense>
}
const SettingView = ({}) => {
  return <React.Suspense fallback={'loading........'}>
    <SettingViewLazy />
  </React.Suspense>
}

const Routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: '/',
        element: <MainPage />,
      }, {
        path: '/category',
        element: <CategoriesView />,
      }, {
        path: '/interests',
        element: <Interests />,
      },
      {
        path: '/list',
        element: <ListsView />,
      },
      {
        path: '/bookmark',
        element: <BookmarkViews />,
      },
      {
        path: '/setting',
        element: <SettingView />,
      },
      {
        path: '*',
        element: <NotFundPage />
      }
    ]
  },
];

export default Routes;