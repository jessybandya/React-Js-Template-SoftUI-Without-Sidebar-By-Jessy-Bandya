import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Nopage from './pages/Nopage';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./assets/theme";
import SignUp from './layouts/authentication/sign-up';
import Admin from './pages/Admin';
import { auth } from './auth/firebase';



export default function FixedBottomNavigation() {
  return (
      <ThemeProvider theme={theme}>
      <Routes>
      <Route path="*" element={<Navigate to="/no-page" />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/no-page" element={<Nopage />} />  
      <Route exact path="/authentication/sign-up" element={<SignUp />} /> 
      <Route exact path="/admin-page" element={<Admin />} /> 
    </Routes>
      </ThemeProvider>
  );
}

