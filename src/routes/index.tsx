import { Layout } from "@/ui/Layout";
import CategoriesView from "@/ui/pages/CategoriesView";
import ListsView from "@/ui/pages/ListsView";
import MainPage from "@/ui/pages/MainPage";
import BookmarkViews from "@/ui/pages/BookmarksView";
import SettingView from "@/ui/pages/SettingView";
import { RouteObject } from "react-router-dom";

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
      }
    ]
  }
];

export default Routes;