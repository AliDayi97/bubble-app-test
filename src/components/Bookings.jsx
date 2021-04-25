import { useEffect } from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import { useBookingContext } from "../contexts/BookingContext";
import BookingCard from "./BookingCard";

const Bookings = ({ history }) => {
  const { bookings, getBookings } = useBookingContext();
  useEffect(() => {
    getBookings();
  }, []);

  const renderConfirmedBookings = () => {
    return (
      bookings &&
      bookings.confirmedBookings &&
      bookings.confirmedBookings.length > 0 && (
        <>
          <Grid.Row>
            <Grid.Column stretched textAlign="center">
              <Header as="h3" textAlign="center">
                Confirmed Bookings
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {bookings.confirmedBookings.map((booking) => {
              return (
                <Grid.Column key={booking.id}>
                  <BookingCard booking={booking} />
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </>
      )
    );
  };

  const renderRequestedBookings = () => {
    return (
      bookings &&
      bookings.requestedBookings &&
      bookings.requestedBookings.length > 0 && (
        <>
          <Grid.Row>
            <Grid.Column stretched textAlign="center">
              <Header as="h3" textAlign="center">
                Requested Bookings
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {bookings.requestedBookings.map((booking) => {
              return (
                <Grid.Column key={booking.id}>
                  <BookingCard booking={booking} />
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </>
      )
    );
  };

  return (
    <Container className="container">
      <Grid columns="equal" centered>
        {renderConfirmedBookings()}
        {renderRequestedBookings()}
      </Grid>
    </Container>
  );
};

export default Bookings;
