import React from "react";
import styled from "styled-components";
import { SpotifyApiContext, Playlist } from "react-spotify-api";
import { useParams } from "react-router-dom";
import { useStoreState } from "easy-peasy";

import Track from "./track";

const TrackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
`;

function PlaylistView() {
  const authToken = useStoreState((state) => state.app.authToken);
  const loggedIn = useStoreState((state) => state.app.loggedIn);

  let { id } = useParams();
  return (
    <>
      {loggedIn && authToken !== "" && (
        <Playlist id={id}>
          {(playlist, loading, error) =>
            playlist && playlist.data !== null ? (
              <div style={{ paddingBottom: "80px" }}>
                <h1>{playlist.data.name}</h1>
                <TrackContainer>
                  {playlist.data.tracks.items.map((t) => (
                    <Track data={t} />
                  ))}
                </TrackContainer>
              </div>
            ) : null
          }
        </Playlist>
      )}
    </>
  );
}

export default PlaylistView;
