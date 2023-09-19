import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./page/Signup";
import Signin from "./page/Signin";
import Todo from "./page/Todo";

function App(props) {
  const hasToken = () => {
    return !!localStorage.getItem("token");
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/signin"
            element={hasToken() ? <Navigate to="/todo" /> : <Signin />}
          />
          <Route
            path="/signup"
            element={hasToken() ? <Navigate to="/todo" /> : <Signup />}
          />
          <Route
            path="/todo"
            element={hasToken() ? <Todo /> : <Navigate to="/signin" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
