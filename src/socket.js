import io from "socket.io-client";

let socketEndPoint = "http://localhost:8000";
let socket;

const connectSocket = async (userId) => {
  console.log(userId)
  socket = io(socketEndPoint, {
    query: `userId=${userId}`,
  });
};

export { socket, connectSocket };
