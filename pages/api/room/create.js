import rooms from "../../../data/rooms";

export default function handler(req, res) {
    const nomeplayer = req.body.roomname
    const name = req.body.name
    const time = 105 // padrao
    const isStarted = false
    const curTime = time
    const questions = [] //sortear depois
    const players = []

    const id = uuid()
    const player = { id: id, name: playername, rightAnswers: 0, isReady: false};
    players.push(player)

    room={name: name, players: players, dono: nomeplayer, isStarted: isStarted, time: time, questions: questions, players: players}
    const roomFounded = rooms.find(r => r.name == name);
    if(roomFounded){
        rooms.rooms.add(room)
        res.json({ created: true, message: "Sala criada!" });
    } else {
        res.json({ created: false, message: "Já existe uma sala com esse nome!" });
    }
}
