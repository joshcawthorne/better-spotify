import React, { useState } from "react";
import { User } from "react-spotify-api";
import { useStoreState } from "easy-peasy";
import styled from "styled-components";

import LoadingContainer from "./loadingContainer";
import NoPremiumAlert from "./noPremiumAlert";

const HandleLoginContainer = styled.div``;

function HandleLogin() {
  const authToken = useStoreState((state) => state.app.authToken);
  const [displayLoader, setDisplayLoader] = useState(true);
  return (
    <HandleLoginContainer>
      <User>
        {(user, loading, error) => (
          <>
            {displayLoader && (
              <LoadingContainer
                loading={loading}
                setDisplayLoader={setDisplayLoader}
              />
            )}
            {user && user.data ? (
              user.data.product === "premium" ? (
                <div>Premium</div>
              ) : (
                <NoPremiumAlert />
              )
            ) : null}
          </>
        )}
      </User>
    </HandleLoginContainer>
  );
}

export default HandleLogin;
