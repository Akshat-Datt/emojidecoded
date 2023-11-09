import styled from "styled-components";
import Base from "./Base";
import Button from "./Button";
import { useNavigate, useNavigation } from "react-router-dom";

const Container = styled.div`
  width: 38vw;
  display: flex;
  gap: 100px;
  flex-direction: column;
  justify-content: space-between;
  padding: 100px 20px;
`;

const Logo = styled.img``;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function Home() {
  const navigate = useNavigate();

  return (
    <Base>
      <Container>
        <Logo src="/logo.svg" />

        <Buttons>
          <Button
            onClick={() => {
              navigate("/play");
            }}
          >
            Play
          </Button>
          <Button
            onClick={() => {
              navigate("/leader-board");
            }}
          >
            Leaderboard
          </Button>
          {/* <Button>About Us</Button> */}
        </Buttons>
      </Container>
    </Base>
  );
}
