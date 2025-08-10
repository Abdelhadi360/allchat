import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function addUser(name, username) {
  try {
    if (!username) return null;

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log("User already exists:", username);
      return null;
    }

    const docRef = await addDoc(usersRef, {
      name,
      username
    });

    console.log("User added:", docRef.id);
    return docRef.id;

  } catch (err) {
    console.error("Error adding user:", err);
    throw err;
  }
}



export async function getAllUsernames() {
  const querySnapshot = await getDocs(collection(db, "users"));
  
  const usernames = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.username) {
      usernames.push(data.username);
    }
  });

  return usernames;
}

export async function getAllUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  
  const users = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.username && data.name) {
      users.push({
        name: data.name,
        username: data.username
      });
    }
  });

  return users; // [{ name: "John Doe", username: "john_doe" }, ...]
}