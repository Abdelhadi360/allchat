import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useUser } from "@clerk/clerk-react";
import { use, useEffect, useState } from "react";
import socket from "../socket";
import { User } from "lucide-react";

export default function UserCard() {

    
    
    const { user, isSignedIn } = useUser();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (isSignedIn) {
            socket.emit('send-name', user.firstName);

            socket.on('get-name', (data) => {
              setName(data);
            })
        }
    }, [user]);

  return (
    <Card>
    <CardHeader>
        <CardTitle className="flex items-center">
          <User />
          Abdelhadi
        </CardTitle>
    </CardHeader>
    
    </Card>
  )
}
