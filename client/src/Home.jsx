// I DID
// Setup socket.io
// Added Header and Sidebar UI
// Added light and dark mode toggle

// I WILL DO
// Add users to DB
// Add/delete friends
// Search users and friends
// Add chat between users
// Add notifications
// Fix the UI

import React, { use, useEffect, useState } from 'react';
import NavBar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import UserCard from './components/user-card';
import { Toaster, toast } from 'sonner';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import socket from './socket';
import { Badge } from "@/components/ui/badge";

function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  const [canSendToast, setCanSendToast] = useState(false);

  const sendEveryoneToast = () => {
    socket.emit('send-toast', { sender: user.firstName });
  }

  useEffect(() => {
    socket.on('get-toast', (user) => {
      toast.success(user + ": Sent you 10000000000$")
    });

  }, [canSendToast])

  
  return (
    <div className='w-full dark:bg-stone-800'>
      <SignedIn>
        {user ? (
          <div className='p-4'>
            <h1 className='text-3xl font-semibold'>Hello, {user.firstName}</h1>
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