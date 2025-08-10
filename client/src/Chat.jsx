import { toast } from 'sonner';
import socket from './socket';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { getAllUsers } from './firebase/firestore';
import { useUser } from '@clerk/clerk-react';
import UserCard from './components/user-card';

function Chat() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Read search term from URL (?q=value)
  const searchQuery = searchParams.get("q") || "";

  // Filter users by name or username
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleToast = (user) => {
      toast('New message from ' + user, {
        description: 'I told you can you get',
        duration: 5000,
        action: {
          label: "Reply",
          onClick: () => navigate('/chat'),
        }
      });
    };

    async function fetchUsers() {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    }
    fetchUsers();

    socket.on("get-toast", (data) => {
      handleToast(data);
    });

    return () => {
      socket.off("get-toast", handleToast);
    };
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-4xl font-semibold'>Chat</h1>
      <p>You don't have any friends right now.</p>

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => {
          const value = e.target.value;
          if (value) {
            setSearchParams({ q: value }); // update URL
          } else {
            setSearchParams({}); // remove query from URL if empty
          }
        }}
        className="mb-4"
      />

      {/* Filtered Users */}
      <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {filteredUsers.map((user, index) => (
          <UserCard
            key={index}
            name={user.name}
            username={user.username}
            onMessage={() => navigate(`/chat/${user.username}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default Chat;
