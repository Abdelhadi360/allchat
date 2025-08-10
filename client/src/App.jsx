import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './Chat';
import Signup from './Signup';
import Home from './Home';
import Navbar from '@/components/navbar';
import ProtectedRoute from './ProtectedRoute';
import { Toaster } from 'sonner';
import { useTheme } from './hooks/use-theme';
import ChatRoom from './ChatRoom';

export default function App() {
  const { theme } = useTheme();
  return (
    <BrowserRouter>
      <div className='flex flex-col h-screen w-full'>
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat/:username"
              element={
                <ProtectedRoute>
                  <ChatRoom /> {/* this will handle messages with that user */}
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Toaster theme={theme === "dark" ? "light" : "dark"} position='top-center' />
      </div>
    </BrowserRouter>
  )
}
