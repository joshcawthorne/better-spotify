import { action } from "easy-peasy";

const applicationModel = {
  authToken: "",
  setAuthToken: action((state, payload) => {
    state.authToken = payload;
  }),
  loggedIn: false,
  setLoggedIn: action((state, payload) => {
    state.loggedIn = payload;
  }),
  trackUri: "spotify:playlist:2DoO0sn4SbUrz7Uay9ACTM",
  setTrackUri: action((state, payload) => {
    state.trackUri = payload;
  }),
};

export default applicationModel;
