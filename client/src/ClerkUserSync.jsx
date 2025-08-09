import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { addUser } from "./firebase/firestore";

export default function ClerkUserSync() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn || !user) return;

    
    (async () => {
      await addUser(user.firstName, user.username);
    })();
  }, [isSignedIn, user]);

  return null;
}
