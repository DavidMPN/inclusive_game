import rooms from "../../../data/rooms";
import withSession from "../../../lib/session";

export default withSession(async (req, res) => {
  const { roomname, response } = req.body;

  const roomIndex = rooms.findIndex((r) => r.name == roomname);

  const player = req.session.get("player");

  if (roomIndex != -1 && player) {
    if (rooms[roomIndex].curTime < 0) {
        const curQuestion = rooms[roomIndex].questions[rooms[roomIndex].curQuestion];

        console.log(curQuestion.Correct, response);
        console.log(curQuestion.Correct == response ? "right" : "wrong");

      return res.json({
        response: true,
        curTime: rooms[roomIndex].curTime,
        time: rooms[roomIndex].time,
        answer: curQuestion.Correct == response ? "right" : "wrong"
      });
    } else {
      return res.json({
        response: false,
        curTime: rooms[roomIndex].curTime,
        time: rooms[roomIndex].time,
        answer: "waiting"
      });
    }
  } //mandar que ele nao tem autorizacao pra receber o tempo

  return res.json({
    response: false,
    curTime: 0,
    time: 15,
    answer: "waiting"
  });
});
