import React from "react";
import { Redirect } from "react-router";
import { Container, Segment } from "semantic-ui-react";

//TODO: Proper home implementation
const Home = ({ user }) => {
  return user ? (
    <Container>
      <Segment>
        <img src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
      </Segment>
    </Container>
  ) : (
    <Redirect to="/login" />
  );
};

export default Home;
