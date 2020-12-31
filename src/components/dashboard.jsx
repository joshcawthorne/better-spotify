import React, { useEffect } from "react";
import { SpotifyApiContext, UserPlaylists } from "react-spotify-api";
import { useStoreState } from "easy-peasy";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const authToken = useStoreState((state) => state.app.authToken);
  const loggedIn = useStoreState((state) => state.app.loggedIn);

  let history = useHistory();

  useEffect(() => {
    if (!loggedIn) {
      history.replace("/login");
    }
  }, []);

  return (
    <>
      {loggedIn && authToken !== "" && (
        <UserPlaylists>
          {(playlists, loading, error) => (
            <div>
              {console.log(playlists)}
              {playlists && playlists.data !== null ? (
                <div>
                  {playlists &&
                    playlists.data.items.map((p) => (
                      <div onClick={() => history.push("/playlist/" + p.id)}>
                        {console.log(p)}
                        {p.name}
                      </div>
                    ))}
                </div>
              ) : null}
            </div>
          )}
        </UserPlaylists>
      )}
    </>
  );
}

export default Dashboard;
