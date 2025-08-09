import { toast } from 'sonner';
import socket from './socket';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { addUser } from './firebase/firestore';
import { useUser } from '@clerk/clerk-react';


function Chat() {
  const navigate = useNavigate();
  const { user } = useUser();


  useEffect(() => {
      const handleToast = (user) => {
        toast('A Sonner toast', {
          description: 'With a description and an icon',
          duration: 5000,
          action: {
            label: "Reply",
            onClick: () => navigate('/chat'),
          }
        });
      };
  
      socket.on("get-toast", handleToast);
  
      return () => {
        socket.off("get-toast", handleToast);
      };
    }, []);

    


  return (
    <div>
      <h1 className='text-4xl'>Chat</h1>
      <p>You are not in the database yet, please click the button bellow to add you to our database</p>

      <Button variant="ghost" size="sm" onClick={async () => await addUser(user.firstName, user.username)}>
        <Plus /> Add to db
      </Button>
    </div>
  )
}

export default Chat