
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NewNote from "../pages/NewNote";
import ErrorPage from "../pages/ErrorPage";
import NotePage from "../pages/NotePage";

interface RouterType {
  element: React.ReactNode;
  path: string;
  title: string;
}

const AllRoutes: React.FC = () => {
  const allPages: Array<RouterType> = [
    {
      element: <HomePage />,
      path: "/",
      title: "home"
    },
    {
      element: <Navigate to="/" />,
      path: "/notes",
      title: "home"
    },
    { 
      element: <NewNote />,
      path: "/new",
      title: "new"
    },
    {
      element: <NotePage />,
      path: "/notes/:noteId",
      title: "note"
    },
    {
      element: <ErrorPage />,
      path: "/notes/error",
      title: "noteError"
    },
    {
      element: <ErrorPage />,
      path: "/*",
      title: "notFound"
    }
  ];

  return (
    <Routes>
      { allPages.map(page => (
          <Route
            path={page.path}
            key={page.title}
            element={page.element}
          />
        )) 
      }
    </Routes>
  );
};

export default AllRoutes;