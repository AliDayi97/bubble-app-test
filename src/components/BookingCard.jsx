import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { getBookingStatus } from "./../utils";

const BookingCard = ({ booking }) => {
  return (
    <Card
      as={Link}
      color={booking.bookingStatus === 1 ? "green" : "orange"}
      fluid
      to={`/booking/${booking.id}`}
    >
      <Image src={booking.imageUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{booking.otherUserFullName}</Card.Header>
        <Card.Meta>
          <span className="date">
            {new Date(booking.scheduledStart).toDateString()}
          </span>
        </Card.Meta>
        <Card.Description>
          {getBookingStatus(booking.bookingStatus)}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="arrow alternate circle right outline" />
          Details
        </a>
      </Card.Content>
    </Card>
  );
};

export default BookingCard;
