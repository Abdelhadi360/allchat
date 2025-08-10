import { io } from 'socket.io-client';

const socket = io("https://six-otters-shine.loca.lt", {
  secure: true,
  transports: ["websocket"], // Force WebSocket connection
});

socket.on("connect", () => {
  console.log("Connected to server, my ID is: ", socket.id);
});

export default socket;
