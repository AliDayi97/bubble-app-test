import { Card } from "semantic-ui-react";

const DisplayCard = ({ label, description, ...rest }) => {
  return (
    <Card {...rest}>
      <Card.Content>
        <Card.Header>{label}</Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default DisplayCard;
