import rooms from "../../../data/rooms";
import questions from "../../../data/questions";
import { uuid } from 'uuidv4';
import withSession from "../../../lib/session";

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

export default withSession(async (req, res) => {
    const { roomname, playername } = req.body;
    const time = 105; // padrao
    const isStarted = false;
    const curTime = time;
    const questionslist = shuffle(questions.slice()); //sortear depois
    const players = [];

    const id = uuid()
    const player = { id: id, name: playername, rightAnswers: 0, isReady: false};
    players.push(player)

    const roomFounded = rooms.find(r => r.name == roomname);

    if(roomFounded){
        return res.json({ created: false, message: "Já existe uma sala com esse nome!" });
    }

    const room = {
        name: roomname,
        players: players,
        owner: id,
        isStarted: isStarted,
        time: time,
        curTime: curTime,
        questions: questionslist,
        curQuestion: 0,
    }

    req.session.set("player", player);

    await req.session.save();

    rooms.push(room);
    
    return res.json({ created: true, message: "Sala criada!" });
});