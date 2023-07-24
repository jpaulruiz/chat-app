import React, { useContext } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./components/Auth";

function App() {

  const context = useContext(AuthContext)

  const Default = ({children}) => {
    if (!context.login) {
      return <Navigate to="/login"/>
    }
    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Default><Home>{context}</Home></Default>}/>
        <Route path="/login" element={<Login>{context}</Login>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="*" element={<Default><Home>{context}</Home></Default>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
