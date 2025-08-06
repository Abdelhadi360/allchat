import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './Chat';
import { io } from 'socket.io-client';
import Signup from './Signup';

const socket = io("http://localhost:3000");
socket.on("connect", () => {
  console.log("Connected to server, my ID is: ", socket.id);
});

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}
