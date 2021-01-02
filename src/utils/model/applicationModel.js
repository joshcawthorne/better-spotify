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
  trackUri: "",
  setTrackUri: action((state, payload) => {
    state.trackUri = payload;
  }),
  deviceId: "",
  setDeviceId: action((state, payload) => {
    state.deviceId = payload;
  }),
};

export default applicationModel;
