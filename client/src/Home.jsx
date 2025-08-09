// I DID
// Setup socket.io
// Added Header and Sidebar UI
// Added light and dark mode toggle
// Add users to DB

// I WILL DO
// Add/delete friends
// Search users and friends
// Add chat between users
// Add notifications
// Fix the UI

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import UserCard from './components/user-card';
import { toast } from 'sonner';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import socket from './socket';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  const sendEveryoneToast = () => {
    socket.emit('send-toast', { sender: user?.firstName });
  };

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='w-full dark:bg-stone-800'>
      <SignedIn>
        {user ? (
          <div className='p-4'>
            <h1 className='text-4xl font-semibold w-fit font-roboto'>
              Hello, <span className='mesh-gradient bg-clip-text text-transparent'>
                {user.firstName}
              </span>
            </h1>
            <Button onClick={sendEveryoneToast}>
              Show toast
            </Button>
            <UserCard />
          </div>
        ) : (
          <h1>Signed in... loading user info</h1>
        )}
      </SignedIn>
      <SignedOut>
        <h1>Please Log in</h1>
      </SignedOut>
    </div>
  );
}

export default Home