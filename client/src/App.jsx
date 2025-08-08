import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './Chat';
import Signup from './Signup';
import Home from './Home';
import Navbar from '@/components/navbar';

export default function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col w-full'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
