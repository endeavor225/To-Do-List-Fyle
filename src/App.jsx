import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AppLayout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Error from "./pages/Error/Error";
import { useState } from "react";
import { AuthContext } from "./contexts/AuthContext.js";
import { getCookie } from "./services/cookie.service.js";
import PrivateRoute from "./guard/PrivateRoute.jsx";

function App() {
  const [auth, setAuth] = useState(getCookie("auth"));
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
