import styled from "styled-components";

const Container = styled.div``;

const Background = styled.img`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  object-fit: cover;
  transform: scale(2);
`;

const Main = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  color: #fff;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  backdrop-filter: cover;
`;

export default function Base({ children }) {
  return (
    <Container>
      <Background src="/background.png" />

      <Main>{children}</Main>
    </Container>
  );
}
