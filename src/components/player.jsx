import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useStoreState } from "easy-peasy";

function Player() {
  const authToken = useStoreState((state) => state.app.authToken);
  const loggedIn = useStoreState((state) => state.app.loggedIn);
  const trackUri = useStoreState((state) => state.app.trackUri);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (trackUri !== "") {
      setPlay(true);
    }
  }, [trackUri]);

  return (
    <div>
      {loggedIn && authToken !== "" && (
        <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
          <SpotifyPlayer
            token={authToken}
            uris={trackUri}
            autoPlay={true}
            play={play}
            name={"Opevo Reborn"}
          />
        </div>
      )}
    </div>
  );
}

export default Player;
