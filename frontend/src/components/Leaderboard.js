import { useEffect, useState } from "react";
import styled from "styled-components";
import netLine from "../controllers/netLine.js";
import Base from "./Base.js";
import Button from "./Button.js";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 38vw;
  display: flex;
  flex-direction: column;
  gap: 100px;
  align-items: center;
  /* justify-content: center; */
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 25px;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const NickName = styled.div`
  text-transform: capitalize;
`;

const Score = styled.div``;

const Logo = styled.img`
  margin-top: 200px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export default function LeaderBoard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    netLine.get("scores").then(setData);
  }, []);

  if (!data) return <Base>Loading...</Base>;

  let list = data.map(({ nickName, score }) => (
    <Row>
      <NickName>{nickName}</NickName>
      <Score>{score}</Score>
    </Row>
  ));

  return (
    <Base>
      <Container>
        <br />
        <br />
        <br /> <br /> <br />
        <Logo src="/logo.svg" />
        <List>{list}</List>
        <Button
          onClick={() => {
            navigate("/play");
          }}
        >
          Play Again
        </Button>
        <br />
        <br />
        <br />
      </Container>
    </Base>
  );
}
