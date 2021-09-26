import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { socketContext } from "../context/socket";

import QuestionPage from "../layouts/QuestionPage";
import WaitPage from "../layouts/WaitPage";
import WinnerPage from "../layouts/WinnerPage";

export default function Room({ room }) {
  const { socket } = useContext(socketContext);
  const [ data, setData ] = useState(null);
  const [ question, setQuestion ] = useState(null);
  const [ players, setPlayers ] = useState(null);
  const [ owner, setOwner ] = useState(false);


  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/${room}`).then(res => {
      console.log(res.data);
      setData(res.data)
      setQuestion(res.data.curQuestion)
    });
  }, [room]);

  useEffect(() => {
    if(socket) {
      socket.emit("am i owner", room);
      socket.on("you are owner", () => {
        setOwner(true);
      })
    }
  }, [socket]);

  useEffect(() => {
    if(socket && data) {
      socket.on("started", () => {
        console.log("entrou");
        setData({ ...data, isStarted: true });
      });

      socket.on("newplayer", (player) => {
        const curplayers = data.players.slice();

        curplayers.push(player);

        setData({ ...data, players: curplayers });
      });

      socket.on("question", (question) => {
        setQuestion(question)
      });

      socket.on("finish", (players) => {
        setPlayers(players)
      });
    }
  }, [data, socket]);

  if(players) return <WinnerPage players={players} />

  if(!data) return <h1>Carregando...</h1>

  if (data.status) {
    if (data.isStarted) {
      return (
        <QuestionPage
          question={question}
          room={room}
        />
      );
    }

    return <WaitPage data={data} room={room} owner={owner} />;
  }

  return (
    <h1 style={{ textAlign: "center" }}>Você não pode entrar nessa sala</h1>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      room: params.room,
    }, // will be passed to the page component as props
  };
}
