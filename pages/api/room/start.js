import rooms from "../../../data/rooms";

export default async function (req, res) {
    const { roomname } = req.body;

    const roomIndex = rooms.findIndex(r => r.name == roomname);

    if(roomIndex != -1) {
        rooms[roomIndex].isStarted = true;
        
        return res.json({ status: true, players: rooms[roomIndex].players, isStarted: rooms[roomIndex].isStarted });
    }

    return res.json({ status: false, players: [], isStarted: false });
}