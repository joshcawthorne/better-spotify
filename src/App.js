import styled from "styled-components";
import { useStoreState, useStoreActions } from "easy-peasy";
import { SpotifyApiContext } from "react-spotify-api";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Playlist from "./components/playlistView";
import Player from "./components/player";
import Sidebar from "./components/sidebar";

const AppContainer = styled.div`
  display: flex;
`;

const SidebarContainer = styled.div`
  width: 220px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const SidebarSpacer = styled.div`
  min-width: 220px;
  height: 100vh;
`;

function App() {
  const loggedIn = useStoreState((state) => state.app.loggedIn);
  const authToken = useStoreState((state) => state.app.authToken);

  const setLoggedIn = useStoreActions((actions) => actions.app.setLoggedIn);
  const setAuthToken = useStoreActions((actions) => actions.app.setAuthToken);

  const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});

  if (hash.access_token) {
    setAuthToken(hash.access_token);
    setLoggedIn(true);
  }
  window.location.hash = "";

  return (
    <SpotifyApiContext.Provider value={authToken}>
      <Router>
        <AppContainer>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          <SidebarSpacer />

          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/playlist/:id">
              <Playlist />
            </Route>
            <Route path="*">
              <div>404 not found lol</div>
            </Route>
          </Switch>

          <Player />
        </AppContainer>
      </Router>
    </SpotifyApiContext.Provider>
  );
}

export default App;
