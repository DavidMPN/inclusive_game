import { Server } from "socket.io";
import rooms from "../../../data/rooms";
import { uuid } from "uuidv4";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");

    const io = new Server(res.socket.server);

    res.socket.server.io = io;
  }

  res.socket.server.io.on("connection", (socket) => {
    console.log('aceitando conexão de ', socket.id);

    socket.on("create", ({ roomname, playername }) => {

      const roomFounded = rooms.find((r) => r.name == roomname);
      
      if (roomFounded) {
        socket.emit("created", { wasCreated: false });
      } else {
        const id = uuid();
        const player = {
          id: id,
          name: playername,
          rightAnswers: 0,
          isReady: false,
        };

        const createdRoom = {
          name: roomname,
          players: [player],
          owner: id,
          isStarted: false,
          time: 30,
          curTime: 30,
          questions: [],
          curQuestion: 0,
        };

        console.log(createdRoom);

        rooms.push(createdRoom);
        
        socket.emit("created", { wasCreated: true });
      }
    });
  });

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
