import { useState } from "react"; // Not used in the provided code but maybe needed elsewhere
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Account from "./pages/Account.jsx";
import Welcome from "./pages/Welcome.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import QRAccount from "./pages/QRAccount.jsx";
import SetCards from "./pages/SetCards.jsx";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/account" element={<Account/>} />
          <Route path="/setcard" element={<SetCards/>} />
          <Route path="/qr/:id" element={<QRAccount />} />
          <Route path="*" element={<Welcome/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;