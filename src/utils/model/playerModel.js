import { action } from "easy-peasy";

const playerModel = {
  visible: false,
  setVisible: action((state, payload) => {
    state.visible = payload;
  }),
  playerState: "",
  setPlayerState: action((state, payload) => {
    state.playerState = payload;
  }),
  playerOffline: false,
  setPlayerOffline: action((state, payload) => {
    state.playerOffline = payload;
  }),
  playerReady: false,
  setPlayerReady: action((state, payload) => {
    state.playerReady = payload;
  }),
  trackName: "",
  setTrackName: action((state, payload) => {
    state.trackName = payload;
  }),
  trackArtist: "",
  setTrackArtist: action((state, payload) => {
    state.trackArtist = payload;
  }),
  albumArtwork: "",
  setAlbumArtwork: action((state, payload) => {
    state.albumArtwork = payload;
  }),
  playbackPosition: "0",
  setPlaybackPosition: action((state, payload) => {
    state.playbackPosition = payload;
  }),
  playbackPercent: "",
  setPlaybackPercent: action((state, payload) => {
    state.playbackPercent = payload;
  }),
};

export default playerModel;
