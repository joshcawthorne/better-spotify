import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStoreActions, useStoreState } from "easy-peasy";
import { motion } from "framer-motion";
import axios from "axios";

import { ReactComponent as PlayIcon } from "../assets/icons/play.svg";
import { ReactComponent as SkipIcon } from "../assets/icons/skip.svg";

const PlayerContainerOuter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  left: 0;
`;

const PlayerContainer = styled(motion.div)`
  z-index: 10;
  width: calc(100% - 40px);
  border-radius: 24px;
  overflow: hidden;
  height: 80px;
  background: rgba(0, 0, 0, 0.6);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  color: #fff;
  display: flex;
  align-items: center;
  border-style: solid;
  border-width: 1px;
  border-color: #ffffff1c;
  position: relative;
`;
const MetaData = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-right: 50px;
`;

const TrackName = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: #e5e5e6;
  letter-spacing: 0.2px;
  max-width: 200px;
  overflow: hidden;
`;

const TrackArtist = styled.div`
  font-size: 12px;
  color: #666666;
  letter-spacing: 0.2px;
`;

const AlbumArtworkContainer = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 5px;
  overflow: hidden;
  margin-left: 14px;
  margin-right: 20px;
`;

const AlbumArtwork = styled.img`
  height: 100%;
  width: 100%;
`;

const PlaybackContainerOuter = styled.div`
  width: 400px;
  height: 5px;
  border-radius: 50px;
  overflow: hidden;
`;

const PlaybarContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #353130;
  border-radius: 0%;
`;

const Playbar = styled(motion.div)`
  height: 100%;
  background-color: #ffffff;
  transition: 1000ms;
  width: 0%;
  border-radius: 50px;
  overflow: hidden;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const SkipBackwardIconContainer = styled.div`
  transform: rotate(-180deg);
  margin-top: -10px;
  margin-right: 4px;
  cursor: pointer;
`;

const PlayIconContainer = styled.div`
  margin: 0px 15px;
  cursor: pointer;
`;

const SkipForwardIconContainer = styled.div`
  cursor: pointer;
`;

const CenterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

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
    <PlayerContainerOuter>
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
        <CenterContent>
          <Controls>
            <SkipBackwardIconContainer>
              <SkipIcon height={"18px"} />
            </SkipBackwardIconContainer>
            <PlayIconContainer>
              <PlayIcon onClick={() => togglePlay()} height={"23px"} />
            </PlayIconContainer>
            <SkipForwardIconContainer>
              <SkipIcon height={"18px"} />
            </SkipForwardIconContainer>
          </Controls>
          <PlaybackContainerOuter>
            <PlaybarContainer>
              <Playbar style={{ width: playbackPercent + "%" }} />
            </PlaybarContainer>
          </PlaybackContainerOuter>
        </CenterContent>
      </PlayerContainer>
    </PlayerContainerOuter>
  );
}

export default Player;
