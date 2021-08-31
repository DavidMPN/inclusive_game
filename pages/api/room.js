import rooms from "../../data/rooms";

export default function handler(req, res) {
    const roomname = req.params.room;
    const room = rooms.find(r => r.name == roomname);
    
    if(room && !room.isStarted) {

    }
}
  