import styled from "styled-components";
import Base from "./Base";
import { useEffect, useState } from "react";
import Button from "./Button";
import levels from "../data/levels";
import netLine from "../controllers/netLine";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  justify-content: center;
`;

const SmallLogo = styled.img`
  height: 100px;
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 100px;
  text-align: center;
  font-size: 18px;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.4);

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const Message = styled.div`
  font-size: 30px;
  text-align: center;
`;

const GameEnded = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  justify-content: center;
`;

const GameStarted = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  justify-content: center;
`;

const Question = styled.div`
  font-size: 50px;
`;
const Hint = styled.div`
  font-size: 20px;
  opacity: 0.5;
`;

function getRandomLevel() {
  let max = levels.length;

  return Math.round(Math.random() * max);
}

let maxSeconds = 120;

export default function Play() {
  const [tmpName, setTmpName] = useState("");
  const [name, setName] = useState("");
  const [ans, setAns] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameStatus, setGameStatus] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(getRandomLevel());

  const navigate = useNavigate();

  window.name = name;

  window.score = score;
  window.setScore = setScore;
  window.gameEnded = gameEnded;
  window.setGameEnded = setGameEnded;
  window.setGameStatus = setGameStatus;
  window.gameStatus = gameStatus;
  window.timer = timer;
  window.setTimer = setTimer;

  let level = levels[questionIndex];

  useEffect(() => {
    setInterval(() => {
      if (window.gameStatus && !window.gameEnded) {
        let newTimer = window.timer + 1;
        window.setTimer(newTimer);
        if (newTimer > maxSeconds) {
          setGameEnded(true);
          postTheScore();
        }
      }
    }, 1000);
  }, []);

  let content = null;

  if (!name) {
    content = (
      <>
        <Input
          placeholder="Type Name Here"
          value={tmpName}
          onChange={(e) => {
            setTmpName(e.target.value);
          }}
        />

        <Button onClick={start}>Start</Button>
        <Button onClick={goToHome}>Home</Button>
      </>
    );
  } else {
    if (gameEnded) {
      content = (
        <GameEnded>
          <Message> You Scored {score}</Message>
          <Button
            onClick={() => {
              navigate("/leader-board");
            }}
          >
            Show Leaderboard
          </Button>
          <Button onClick={reload}>Restart</Button>
          <Button onClick={goToHome}>Home</Button>
        </GameEnded>
      );
    } else {
      content = (
        <GameStarted>
          <Message> Time Left {maxSeconds - timer}</Message>
          <Message> Score {score}</Message>

          <Question> {level.question} </Question>
          <Hint> {level.hint} </Hint>

          <Input
            placeholder="Type Ans Here"
            value={ans}
            onChange={(e) => {
              setAns(e.target.value);
            }}
          />

          <Button onClick={submitAns}>Submit</Button>
        </GameStarted>
      );
    }
  }

  return (
    <Base>
      <Container>
        <SmallLogo src="/logo.svg" />
        {content}
      </Container>
      <ToastContainer />
    </Base>
  );

  function reload() {
    window.location.reload();
  }

  function goToHome() {
    window.location = "/";
  }

  function submitAns() {
    let lvl = levels[questionIndex];
    let actualAns = lvl.ans;
    actualAns = actualAns.toLowerCase();

    if (actualAns === ans.toLowerCase()) {
      setScore(score + 1);
      toast("You are correct");
    } else {
      toast("You wrong homie");
    }

    setQuestionIndex(getRandomLevel());
    setAns("");
  }

  function start() {
    setName(tmpName);
    setGameStatus(true);
  }

  function postTheScore() {
    netLine.post(`score/?nickName=${window.name}&score=${window.score}`);
  }
}
