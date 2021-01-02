import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStoreActions, useStoreState } from "easy-peasy";
import { motion } from "framer-motion";
import axios from "axios";

const PlayerContainer = styled(motion.div)`
  z-index: 10;
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
`;
const MetaData = styled.div``;

const TrackName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const TrackArtist = styled.div`
  font-size: 14px;
`;

const AlbumArtworkContainer = styled.div`
  height: 60px;
  width: 60px;
  margin-right: 10px;
`;

const AlbumArtwork = styled.img`
  height: 100%;
  width: 100%;
`;

const PlaybarContainer = styled.div`
  height: 3px;
  width: 400px;
  background-color: #eee;
`;

const Playbar = styled(motion.div)`
  height: 100%;
  background-color: blue;
  transition: 1000ms;
  width: 0%;
`;

const Controls = styled.div``;

function Player() {
  const authToken = useStoreState((state) => state.app.authToken);
  const trackUri = useStoreState((state) => state.app.trackUri);
  const setDeviceId = useStoreActions((action) => action.app.setDeviceId);
  const playerVisible = useStoreState((state) => state.player.visible);
  const trackName = useStoreState((state) => state.player.trackName);
  const trackArtist = useStoreState((state) => state.player.trackArtist);
  const albumArtwork = useStoreState((state) => state.player.albumArtwork);
  const playerState = useStoreState((state) => state.player.playerState);
  const playbackPercent = useStoreState(
    (state) => state.player.playbackPercent
  );
  const playbackPosition = useStoreState(
    (state) => state.player.playbackPosition
  );
  const deviceId = useStoreState((state) => state.app.deviceId);

  const setPlayerState = useStoreActions(
    (action) => action.player.setPlayerState
  );

  const setPlaybackPercent = useStoreActions(
    (action) => action.player.setPlaybackPercent
  );

  const [play, setPlay] = useState(false);

  const setPlaybackPosition = useStoreActions(
    (action) => action.player.setPlaybackPosition
  );

  useEffect(() => {
    if (trackUri !== "") {
      setPlay(true);
    }
  }, [trackUri]);

  let player;

  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = authToken;
    player = new window.Spotify.Player({
      name: "Opevo",
      getOAuthToken: (cb) => {
        cb(token);
      },
    });

    player.addListener("initialization_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("authentication_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("account_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("playback_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("player_state_changed", (state) => {
      setPlayerState(state);
    });

    player.addListener("ready", ({ device_id }) => {
      setDeviceId(device_id);
    });

    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    setInterval(() => {
      updatePlayer();
    }, 1000);

    player.connect();
  };

  function updatePlayer() {
    player.getCurrentState().then((state) => {
      if (state && state.position !== null) {
        setPlaybackPosition(state.position);
        setPlaybackPercent(
          ((state.position / state.duration) * 100).toFixed(2)
        );
      }
    });
  }

  function togglePlay() {
    if (playerState.paused) {
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
          grant_type: "authorization_code",
        },
      });
    } else {
      axios({
        method: "put",
        url: "https://api.spotify.com/v1/me/player/pause",
        headers: {
          Authorization: "Bearer " + authToken,
        },
        params: {
          device_id: deviceId,
        },
        data: {
          grant_type: "authorization_code",
        },
      });
    }
  }

  const ContainerAnim = {
    hidden: {
      y: 60,
      transition: { type: "Tween" },
    },

    visible: {
      y: 0,
      transition: { type: "Tween" },
    },
  };

  return (
    <PlayerContainer
      variants={ContainerAnim}
      initial="show"
      animate={playerVisible ? "show" : "hidden"}
    >
      <AlbumArtworkContainer>
        <AlbumArtwork src={albumArtwork} alt={trackName} />
      </AlbumArtworkContainer>
      <MetaData>
        <TrackName>{trackName}</TrackName>
        <TrackArtist>{trackArtist}</TrackArtist>
      </MetaData>
      <PlaybarContainer>
        <Playbar style={{ width: playbackPercent + "%" }} />
      </PlaybarContainer>
      <Controls>
        <button onClick={() => togglePlay()}>Play/Pause</button>
      </Controls>
    </PlayerContainer>
  );
}

export default Player;
