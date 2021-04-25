import { useEffect } from "react";
import { Container, Grid } from "semantic-ui-react";
import { useUserContext } from "../contexts/UserContext";
import SitterCard from "./SitterCard";

const Sitters = () => {
  const { getSitters, sitters } = useUserContext();

  useEffect(() => {
    getSitters();
  }, []);

  return sitters ? (
    <Container>
      <Grid>
        <Grid.Row columns={3}>
          {sitters.map((sitter) => (
            <Grid.Column key={sitter.id}>
              <SitterCard sitter={sitter} />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </Container>
  ) : (
    <div>No sitters found</div>
  );
};

export default Sitters;
