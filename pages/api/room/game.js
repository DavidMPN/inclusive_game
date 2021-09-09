import rooms from "../../../data/rooms";
import withSession from "../../../lib/session";

export default withSession(async (req, res) => {
  const { roomname } = req.body;

  const room = rooms.find((r) => r.name == roomname);

  if (room) {
    const player = req.session.get("player");
    const auth = room.players.find((p) => p.id == player.id);

    if (player && auth) {
      return res.json({
        status: true,
        players: room.players,
        isStarted: room.isStarted,
        curQuestion: room.questions[room.curQuestion],
        owner: player.id == room.owner,
      });
    }
  }

  return res.json({ status: false, players: [], isStarted: false });
});
