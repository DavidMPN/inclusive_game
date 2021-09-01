import rooms from "../../../data/rooms";
import withSession from "../../../lib/session";

export default withSession(async (req, res) => {
    const { roomname } = req.body;

    const roomIndex = rooms.findIndex(r => r.name == roomname);

    const player = req.session.get("player");

    if(roomIndex != -1 && player) {
        if(player.id == rooms[roomIndex].owner){
            rooms[roomIndex].isStarted = true;
            
            return res.json({ status: true, players: rooms[roomIndex].players, isStarted: rooms[roomIndex].isStarted });
        }else{
            return res.json({ status: false, players: rooms[roomIndex].players, isStarted: false });
        }
    }

    return res.json({ status: false, players: [], isStarted: false });
});