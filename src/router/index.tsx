
import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouterType } from "./router.types";
import NewNote from "../pages/NewNote";
import Home from "../pages/Home";

const Router: React.FC = () => {
  const allPages: Array<RouterType> = [
    {
      path: "/",
      element: <Home />,
      title: "home"
    },
    {
      path: "/new",
      element: <NewNote />,
      title: "home"
    },
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

export default Router;