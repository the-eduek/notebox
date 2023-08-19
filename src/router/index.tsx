
import React from "react";
import { Route, Routes } from "react-router-dom";
import NewNote from "../pages/NewNote";
import Home from "../pages/Home";
import NotePage from "../pages/NotePage";

const AllRoutes: React.FC = () => {
  const allPages: Array<{
    element: React.JSX.Element;
    path: string;
    title: string;
  }> = [
    {
      element: <Home />,
      path: "/",
      title: "home"
    },
    { 
      element: <NewNote />,
      path: "/new",
      title: "home"
    },
    {
      element: <NotePage />,
      path: "/notes/:noteId",
      title: "note"
    }
  ];

  return (
    <Routes>
      { allPages.map(page => (
          <Route
            key={page.title}
            path={page.path}
            element={page.element}
          />
        )) 
      }
    </Routes>
  );
};

export default AllRoutes;