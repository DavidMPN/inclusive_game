import questions from "./questions";

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

const rooms = [
    // {
    //     name: ...,
    //     players: [
    //         {
    //             name:
    //             responses: ..
    //         }
    //     ],
    //     isStarted: false,
    //     time: ...,
    //     questions: [],
    //     curTime: ...
    // }
    {
        name: "sala",
        players: [],
        isStarted: false,
        time: 60,
        questions: shuffle(questions.slice()),
        curQuestion: 0
    }
]

export default rooms;