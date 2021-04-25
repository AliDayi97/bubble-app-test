import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

const SitterCard = ({ sitter }) => {
  const {
    fullName,
    profileImageUrl,
    ratingPercentage,
    hourlyRate,
    distanceInKm,
    mobileNumber,
    id,
  } = { ...sitter };

  return (
    <Card as={Link} key={id} to={`/sitter/${id}`} centered>
      <Image src={profileImageUrl} wrapped ui={false} />
      <Card.Content>
        <div>
          <Card.Header>{fullName}</Card.Header>
          <Icon name="user" />
        </div>

        {ratingPercentage && (
          <Card.Meta>
            <span>{ratingPercentage}%</span>
            <Icon name="thumbs up outlined" />
          </Card.Meta>
        )}

        <Card.Description>
          {hourlyRate && <p>Hourly rate: {hourlyRate}£</p>}
          {distanceInKm && <p>Distance {distanceInKm}km</p>}
        </Card.Description>
      </Card.Content>
      {mobileNumber && (
        <Card.Content extra>
          <a>
            <Icon name="phone" />
            {mobileNumber}
          </a>
        </Card.Content>
      )}
    </Card>
  );
};

export default SitterCard;
