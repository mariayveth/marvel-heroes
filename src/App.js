import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import "./App.css";
import Login from "./components/Login/Login";
import Heroes from "./components/Heroes/Heroes";
import Hero from "./components/Hero/Hero";
import Index from "./components/Index";
import useToken from './components/useToken';

export default function App() {
  const { token, setToken } = useToken();
  let navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      if (!token) {
        navigate("/login", { replace: true });
      }
    }
    checkToken();

  }, [navigate, token])


  return (
    <Container className="">
      <Routes>
        <Route path="/" element={<Index token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/heroes" element={<Heroes token={token} />} />
        <Route path="/hero/:id" element={<Hero token={token} />} />
      </Routes>
    </Container>
  );
}