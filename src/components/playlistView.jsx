import React from "react";
import styled from "styled-components";
import { SpotifyApiContext, Playlist } from "react-spotify-api";
import { useParams } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import axios from "axios";

import Track from "./track";

const PlaylistViewContainer = styled.div`
  padding-bottom: 80px;
  background-color: #000;
  color: #fff;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
`;

const TrackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 40px);
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
          <PlaylistViewContainer>
            <Title>{playlist.data.name}</Title>
            <TrackContainer>
              {playlist.data.tracks.items.map((t) => (
                <Track data={t} playTrack={playTrack} />
              ))}
            </TrackContainer>
          </PlaylistViewContainer>
        ) : null
      }
    </Playlist>
  );
}

export default PlaylistView;
