import { Server } from "socket.io";
import rooms from "../../../data/rooms";
import { uuid } from "uuidv4";


export default function create(req, res) {
    const { playername, roomname } = req.body;

    const roomFounded = rooms.find((r) => r.name == roomname);
    
    if (roomFounded) {
      console.log("criando...");
      res?.socket?.server?.io?.emit("created", { wasCreated: false });
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
      
      res?.socket?.server?.io?.emit("created", { wasCreated: true });
    }

    res.end()
}