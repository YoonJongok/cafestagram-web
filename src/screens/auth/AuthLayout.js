import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { isLoggedInVar } from "../../apollo";
import DarkModeButton from "./DarkModButton";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;
const Footer = styled.footer`
  margin-top: 20px;
`;

function AuthLayout({ children }) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      {!isLoggedIn ? (
        <Footer>
          <DarkModeButton />
        </Footer>
      ) : null}
    </Container>
  );
}

export default AuthLayout;
