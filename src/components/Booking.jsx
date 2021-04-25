import { useEffect } from "react";
import { Grid, Label, Segment } from "semantic-ui-react";
import { useBookingContext } from "../contexts/BookingContext";
import { useUiContext } from "../contexts/UiContext";
import { getBookingStatus } from "../utils";
import DisplayCard from "./DisplayCard";
import SitterCard from "./SitterCard";

const Booking = ({ match }) => {
  const { getBooking, booking } = useBookingContext();
  const { error } = useUiContext();
  const {
    scheduledDateTime,
    bookingStatus,
    created,
    updated,
    bookedSitter,
    sitterRequests,
  } = {
    ...booking,
  };

  useEffect(() => {
    if (match.params.id) {
      getBooking(match.params.id);
    }
  }, []);

  const renderNonBooked = () => {
    return (
      <>
        <Grid.Row centered>
          <Grid.Column width="4">
            <Segment>
              <Label>Requests</Label>
              {sitterRequests &&
                sitterRequests.map((req) => (
                  <SitterCard
                    sitter={{
                      id: req.sitter.id,
                      profileImageUrl: req.sitter.profileImageUrl,
                      fullName: req.sitter.fullName,
                      ratingPercentage: req.sitter.ratingPercentage,
                      ...req,
                    }}
                  />
                ))}
            </Segment>
          </Grid.Column>
          <Grid.Column width="4">
            <DisplayCard
              label="Status"
              description={getBookingStatus(bookingStatus)}
            />
            <DisplayCard
              label="Creation Date"
              description={new Date(created).toDateString()}
            />
            <DisplayCard
              label="Last Modified"
              description={new Date(updated).toDateString()}
            />
          </Grid.Column>
        </Grid.Row>
      </>
    );
  };

  const renderBooked = () => {
    return (
      <>
        <Grid.Row centered>
          <Grid.Column width="4">
            <DisplayCard
              label="Sitter"
              description={<SitterCard sitter={bookedSitter} />}
            />
          </Grid.Column>
          <Grid.Column width="4">
            <DisplayCard
              label="Status"
              description={getBookingStatus(bookingStatus)}
            />
            <DisplayCard
              label="Scheduled Date"
              description={new Date(scheduledDateTime).toDateString()}
            />

            <DisplayCard
              label="Scheduled Date"
              description={new Date(updated).toDateString()}
            />

            <DisplayCard
              label="Sheduled Time"
              description={`${new Date(
                scheduledDateTime
              ).getHours()}:${new Date(scheduledDateTime).getMinutes()}`}
            />
          </Grid.Column>
        </Grid.Row>
      </>
    );
  };

  return booking ? (
    <Grid>{bookedSitter ? renderBooked() : renderNonBooked()}</Grid>
  ) : (
    <div>
      Could not find details for the booking <span>{error}</span>
    </div>
  );
};

export default Booking;
