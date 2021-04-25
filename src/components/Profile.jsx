import { Container, Header, Icon, Image } from "semantic-ui-react";
import DisplayCard from "./DisplayCard";

const Profile = ({ user }) => {
  return (
    <Container>
      <Header>
        <Image src={user.profileImageUrl} />
      </Header>
      <DisplayCard description={user.biography} centered />

      <DisplayCard label="Name" description={user.fullName} centered />
      <DisplayCard
        label="Address"
        description={
          <>
            <p>
              {user.address.houseNo}, {user.address.street}
            </p>
            <p>
              {user.address.town}, {user.address.postcode}
            </p>
          </>
        }
        centered
      />
      <DisplayCard
        label="Referral Code"
        description={user.referralCode}
        centered
      />
      <DisplayCard
        label="Premium Member"
        description={
          user.premiumUser ? (
            <Icon name="check circle outline" />
          ) : (
            <Icon name="x icon" />
          )
        }
        centered
      />
    </Container>
  );
};

export default Profile;
