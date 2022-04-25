import { Layout } from "@/ui/Layout";
import CategoriesView from "@/routes/pages/CategoriesView";
import ListsView from "@/routes/pages/ListsView";
import MainPage from "@/routes/pages/MainPage";
import BookmarkViews from "@/routes/pages/BookmarksView";
import SettingView from "@/routes/pages/SettingView";
import { RouteObject, useNavigate } from "react-router-dom";
import { createElement, useEffect } from "react";

const NotFundPage = () => {
  let navigate = useNavigate();

  useEffect(() => {
  // navigate("/", { replace: true })
  }, []);
  
  return <div>
    Not found
  </div>
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