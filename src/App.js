import { useEffect } from "react";
import styled from "styled-components";
import { useStoreActions } from "easy-peasy";
import { SpotifyApiContext } from "react-spotify-api";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";

import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Playlist from "./components/playlistView";
import Player from "./components/player";
import Sidebar from "./components/sidebar";
import HandleLogin from "./components/handleLogin";
import Toolbar from "./components/toolbar";

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

const ContentContainer = styled.div``;

const ToolbarContainer = styled.div``;

function App() {
  const setAuthToken = useStoreActions((actions) => actions.app.setAuthToken);

  const token = Cookies.get("spotifyAuthToken");

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  return (
    <div className="app">
      <Router>
        <Helmet>
          <script src="https://sdk.scdn.co/spotify-player.js"></script>
        </Helmet>
        {token ? (
          <SpotifyApiContext.Provider value={token}>
            <AppContainer>
              <SidebarContainer>
                <Sidebar />
              </SidebarContainer>
              <SidebarSpacer />
              <ContentContainer>
                <ToolbarContainer>
                  <Toolbar />
                </ToolbarContainer>
                <Switch>
                  <Route exact path="/">
                    <Dashboard />
                  </Route>
                  <Route path="/login">
                    <HandleLogin />
                  </Route>
                  <Route path="/playlist/:id">
                    <Playlist />
                  </Route>
                  <Route path="*">
                    <div>404 not found lol</div>
                  </Route>
                </Switch>
              </ContentContainer>
              <Player />
            </AppContainer>
          </SpotifyApiContext.Provider>
        ) : (
          <Login />
        )}
      </Router>
    </div>
  );
}
export default App;

{
  /*











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
  //window.location.hash = "";

  console.log(hash);

  return (
    
  );
}

export default App;
*/
}
