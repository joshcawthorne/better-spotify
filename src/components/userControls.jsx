import React from "react";
import styled from "styled-components";

import { User } from "react-spotify-api";

const UserImageContainer = styled.div``;

const UserImage = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;
const UserImageBlank = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #fff;
`;

function UserControls() {
  return (
    <User>
      {(user, loading, error) =>
        user ? (
          <UserImageContainer>
            {console.log("User, ", user)}
            {user.data && user.data.images.length > 0 ? (
              <UserImage
                src={user.data.images[0].url}
                alt={"Profile Picture"}
              />
            ) : (
              <UserImageBlank></UserImageBlank>
            )}
          </UserImageContainer>
        ) : null
      }
    </User>
  );
}

export default UserControls;
