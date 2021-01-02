import React from "react";
import styled from "styled-components";
import { SpotifyApiContext, Playlist } from "react-spotify-api";
import { useParams } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import axios from "axios";

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
  const deviceId = useStoreState((state) => state.app.deviceId);

  function playTrack(uri) {
    axios({
      method: "put",
      url: "https://api.spotify.com/v1/me/player/play",
      headers: {
        Authorization: "Bearer " + authToken,
      },
      params: {
        device_id: deviceId,
      },
      data: {
        uris: [uri],
        grant_type: "authorization_code",
      },
    });
  }

  let { id } = useParams();
  return (
    <Playlist id={id}>
      {(playlist, loading, error) =>
        playlist && playlist.data !== null ? (
          <div style={{ paddingBottom: "80px" }}>
            <h1>{playlist.data.name}</h1>
            <TrackContainer>
              {playlist.data.tracks.items.map((t) => (
                <Track data={t} playTrack={playTrack} />
              ))}
            </TrackContainer>
          </div>
        ) : null
      }
    </Playlist>
  );
}

export default PlaylistView;
