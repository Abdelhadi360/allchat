import { ChevronLeft, Plane, PlaneIcon, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from "react";
import socket from "./socket";

export default function ChatRoom() {
  const { username } = useParams();
  const navigate = useNavigate();
  const myUsername = "john"; // get from auth or Clerk
  const roomId = `chat_${[myUsername, username].sort().join('_')}`; // sorted so both use same string
  const [messages, setMessages] = useState([]);


  const sendMessage = () => {
    socket.emit('send-message', {
      roomId,
      message: "Hello" // your state variable
    });
  };

  useEffect(() => {
    socket.on('receive-message', ({senderId, message}) => {
      setMessages(message);
    })
  })

  return (
    <div className="p-4 h-full flex flex-col justify-between">
        <Button 
            
            className='h-6 w-6'>
            <ChevronLeft />
        </Button>

        <div>
          {messages.map((message, index) => (
            <p key={index}>message: {message}</p>
          ))}
        </div>

        <div>
            <Input />
            <Button onClick={sendMessage}>
                Send <Send />
            </Button>
        </div>
    
    </div>
  );
}
