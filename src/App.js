import logo from './logo.svg';
import Homes from './Pages/Homes/Homes';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
function App() {
  return (
    <BrowserRouter>

    <Routes>
    <Route path="/" element={<Homes/>}/>
    <Route path="/login" element={<Login />} /> 
    <Route path="/signupuser" element={<Signup />} />
    
    </Routes>
    </BrowserRouter>
  );
}

export default App;
