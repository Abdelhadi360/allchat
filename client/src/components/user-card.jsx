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
import { EllipsisVertical, User } from "lucide-react";
import { toast } from "sonner";

export default function UserCard({name, username, onMessage}) {
  

  return (
    <Card >
      <CardHeader>
          <CardTitle className="flex items-center">
            <User />
            {name}
          </CardTitle>
          <CardDescription>
            @{username}
          </CardDescription>
          
          <CardFooter className='p-0 flex justify-between'>
            <Button  onClick={onMessage}
                    className='bg-emerald-500 dark:bg-emerald-700 hover:bg-emerald-600 text-white dark:text-gray-200 '>
              Message
            </Button>
            
          </CardFooter>
      </CardHeader>
    
    </Card>
  )
}
