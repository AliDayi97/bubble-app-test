import { useEffect, useState } from "react";
import { Container, Icon, Image } from "semantic-ui-react";
import { useUserContext } from "../contexts/UserContext";
import DisplayCard from "./DisplayCard";

const Sitter = ({ match }) => {
  const { sitters, getSitters } = useUserContext();
  const [sitterId, setSitterid] = useState();
  const [sitter, setSitter] = useState();

  useEffect(() => {
    if (match.params.id) {
      setSitterid(match.params.id);
    }
  }, []);

  useEffect(() => {
    if (sitters) {
      const currentSitter = sitters.find((s) => s.id === sitterId);
      setSitter(currentSitter);
    } else {
      getSitters();
    }
  }, [sitters, sitterId]);

  const renderSitterProfile = () => {
    return (
      <Container>
        <div>
          <Image src={sitter.profileImageUrl} centered />
          <DisplayCard description={sitter.biography} centered />
          <br />
        </div>

        <div>
          {sitter.ratingPercentage && (
            <DisplayCard
              label="Rating"
              description={`${sitter.ratingPercentage}%`}
              centered
            />
          )}
          <br />
        </div>

        <div>
          <DisplayCard label="Name" description={sitter.fullName} centered />
          <DisplayCard
            label="Birthday"
            description={new Date(sitter.dob).toDateString()}
            centered
          />
          <DisplayCard
            label="Distance"
            description={`${sitter.distanceInKm} km`}
            centered
          />
          <DisplayCard
            label="Hourly Rate"
            description={`${sitter.hourlyRate} £`}
            centered
          />

          <DisplayCard
            label="Verified"
            description={
              sitter.bubbleVerified ? (
                <Icon name="check circle outline" />
              ) : (
                <Icon name="x icon" />
              )
            }
            centered
          />

          <DisplayCard
            label="Available"
            description={
              sitter.available ? (
                <Icon name="check circle outline" />
              ) : (
                <Icon name="x icon" />
              )
            }
            centered
          />
        </div>
      </Container>
    );
  };

  return sitter ? renderSitterProfile() : <div>Sitter not found</div>;
};

export default Sitter;
